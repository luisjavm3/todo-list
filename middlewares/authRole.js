const authRole = (roles) => (req, res, next) => {
  const { role } = req.user;

  if (Array.isArray(roles)) {
    if (roles.includes(role)) return next();
  } else {
    if (String(roles) === role) return next();
  }

  res.status(403).json({ success: false, message: 'Access forbidden.' });
};

export default authRole;
