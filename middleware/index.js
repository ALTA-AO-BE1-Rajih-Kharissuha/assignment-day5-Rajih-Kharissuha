const datas = require("../models");

const validationGetUser = async (req, res, next) => {
  const id = req.params.id;
  const User = await datas;

  const find = User.find(
    (user) =>
      user.name.toString().toLowerCase() ===
      req.user.usernames.toString().toLowerCase()
  );
  if (!find) {
    return res
      .status(404)
      .json({ message: `User name ${req.user.usernames} Not Found` });
  }

  next();
};

const validationUpdate = async (req, res, next) => {
  const { name, age, location, language } = req.body;

  const User = await datas;
  const find = User.find(
    (user) =>
      user.name.toString().toLowerCase() ===
      req.user.usernames.toString().toLowerCase()
  );

  if (!find) {
    return res
      .status(404)
      .json({ message: `User name ${req.user.usernames} Not Found` });
  }

  if (!isNaN(Number(name))) {
    return res.status(400).json({ message: "name can only contain strings" });
  }

  if (isNaN(Number(age))) {
    return res.status(400).json({ message: "age can only contain number" });
  }

  if (!isNaN(Number(language))) {
    return res
      .status(400)
      .json({ message: "language can only contain strings" });
  }

  next();
};

const validationDelete = async (req, res, next) => {
  const { nama } = req.body;

  const User = await datas;
  const findUser = User.find(
    (user) =>
      user.name.toString().toLowerCase() === nama.toString().toLowerCase()
  );

  if (!findUser) {
    return res.status(404).json({ message: `User name ${nama} Not Found` });
  }

  next();
};

module.exports = {
  validationGetUser,
  validationUpdate,
  validationDelete,
};
