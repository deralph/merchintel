const defaultOptions = {
  origin: "*",
  allowMethods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  allowHeaders: "Content-Type,Authorization",
  maxAge: 600,
};

const cors = (options = {}) => {
  const settings = { ...defaultOptions, ...options };

  return (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", settings.origin);
    res.setHeader("Access-Control-Allow-Methods", settings.allowMethods);
    res.setHeader("Access-Control-Allow-Headers", settings.allowHeaders);
    res.setHeader("Access-Control-Max-Age", String(settings.maxAge));

    if (settings.exposeHeaders) {
      res.setHeader("Access-Control-Expose-Headers", settings.exposeHeaders);
    }

    if (req.method === "OPTIONS") {
      res.status(204).send("");
      return;
    }

    next();
  };
};

export default cors;
