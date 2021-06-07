export const updateUserController = async (req, res, next) => {
  const user = req.user;
  const { userId } = req.params;
  const newData = req.body;

  try {
  } catch (error) {}

  res.send(`It works!!!... ${userId}`);
};
