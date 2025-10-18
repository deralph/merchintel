import http from "node:http";
import { URL } from "node:url";

const METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

const createResponseHelpers = (res) => {
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };

  res.json = (payload) => {
    if (res.headersSent) {
      return res.end();
    }
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(payload));
  };

  res.send = (payload) => {
    if (res.headersSent) {
      return res.end();
    }
    if (typeof payload === "object") {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(payload));
    } else {
      res.end(payload);
    }
  };

  return res;
};

const matchRoute = (routePath, requestPath) => {
  const routeSegments = routePath.split("/").filter(Boolean);
  const requestSegments = requestPath.split("/").filter(Boolean);

  if (routeSegments.length !== requestSegments.length) {
    return null;
  }

  const params = {};

  for (let i = 0; i < routeSegments.length; i += 1) {
    const routeSegment = routeSegments[i];
    const requestSegment = requestSegments[i];

    if (routeSegment.startsWith(":")) {
      params[routeSegment.slice(1)] = decodeURIComponent(requestSegment);
      continue;
    }

    if (routeSegment !== requestSegment) {
      return null;
    }
  }

  return params;
};

const createApp = () => {
  const middlewares = [];
  const routes = [];

  const use = (middleware) => {
    middlewares.push(middleware);
  };

  const registerRoute = (method, path, handler) => {
    routes.push({ method, path, handler });
  };

  const handlerForMethod = (method) => (path, handler) => registerRoute(method, path, handler);

  const app = {};
  app.use = use;
  METHODS.forEach((method) => {
    app[method.toLowerCase()] = handlerForMethod(method);
  });

  app.listen = (port, callback) => {
    const server = http.createServer((req, res) => {
      createResponseHelpers(res);

      const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
      req.path = parsedUrl.pathname;
      req.query = Object.fromEntries(parsedUrl.searchParams.entries());
      req.params = {};
      req.body = undefined;

      const executeMiddlewares = (index) => {
        if (index >= middlewares.length) {
          return handleRoute();
        }

        const next = (err) => {
          if (err) {
            res.status(500).json({ message: "Internal Server Error", error: err.message ?? String(err) });
            return;
          }
          executeMiddlewares(index + 1);
        };

        try {
          const maybePromise = middlewares[index](req, res, next);
          if (maybePromise && typeof maybePromise.then === "function") {
            maybePromise.then(() => {}).catch((err) => next(err));
          }
        } catch (err) {
          next(err);
        }
      };

      const handleRoute = () => {
        const method = req.method?.toUpperCase();

        const route = routes.find((registered) => {
          if (registered.method !== method && registered.method !== "ALL") {
            return false;
          }
          const params = matchRoute(registered.path, req.path);
          if (!params) {
            return false;
          }
          req.params = params;
          return true;
        });

        if (!route) {
          if (method === "OPTIONS") {
            res.status(204).end();
            return;
          }
          res.status(404).json({ message: "Not Found" });
          return;
        }

        try {
          route.handler(req, res);
        } catch (err) {
          res.status(500).json({ message: "Internal Server Error", error: err.message ?? String(err) });
        }
      };

      executeMiddlewares(0);
    });

    server.listen(port, callback);
    return server;
  };

  return app;
};

const json = () => (req, res, next) => {
  const method = req.method?.toUpperCase();
  if (method === "GET" || method === "HEAD") {
    req.body = {};
    next();
    return;
  }

  let rawData = "";
  req.on("data", (chunk) => {
    rawData += chunk;
  });
  req.on("end", () => {
    if (!rawData) {
      req.body = {};
      next();
      return;
    }

    try {
      req.body = JSON.parse(rawData);
      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid JSON payload" });
    }
  });
  req.on("error", (err) => {
    res.status(400).json({ message: "Error reading request", error: err.message ?? String(err) });
  });
};

const express = Object.assign(createApp, { json });

export { json };
export default express;
