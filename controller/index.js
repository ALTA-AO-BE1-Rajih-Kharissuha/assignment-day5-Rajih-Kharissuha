const datas = require("../models");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { username } = req.body;
  try {
    const User = await datas;
    const findUser = User.find(
      (user) =>
        user.name.toString().toLowerCase() === username.toString().toLowerCase()
    );

    const usernames = findUser.name;
    const roles = findUser.role;
    const accessToken = jwt.sign({ usernames, roles }, "rahasia", {
      expiresIn: "600s",
    });

    return res.status(200).json({ token: accessToken });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "username tidak ditemukan" });
  }
};

const getUser = async (req, res) => {
  try {
    const User = await datas;

    const find = User.find(
      (user) =>
        user.name.toString().toLowerCase() ===
        req.user.usernames.toString().toLowerCase()
    );
    return res.status(200).json(find);
  } catch (error) {
    return res
      .status(404)
      .json({ message: `User name ${req.user.usernames} Not Found` });
  }
};

const updateUser = async (req, res) => {
  const { name, age, location, language } = req.body;

  try {
    const Users = await datas;

    const findUserIndex = Users.findIndex((user) => {
      return (
        user.name.toString().toLowerCase() ===
        req.user.usernames.toString().toLowerCase()
      );
    });

    if (findUserIndex !== -1) {
      Users[findUserIndex].name = name || Users[findUserIndex].name;
      Users[findUserIndex].age = age || Users[findUserIndex].age;
      Users[findUserIndex].location = location || Users[findUserIndex].location;
      Users[findUserIndex].language = language || Users[findUserIndex].language;
    }

    res.status(200).json(Users);
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  const { nama } = req.body;

  try {
    const User = await datas;
    const findUser = User.filter(
      (user) =>
        user.name.toString().toLowerCase() !== nama.toString().toLowerCase()
    );

    res.status(200).json(findUser);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { login, getUser, updateUser, deleteUser };
