const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.url}` });
};

export default notFound;
