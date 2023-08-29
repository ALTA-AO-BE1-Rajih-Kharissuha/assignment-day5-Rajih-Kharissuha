const express = require("express");
const { login, getUser, updateUser, deleteUser } = require("./controller");
const {
  validationGetUser,
  validationUpdate,
  validationDelete,
} = require("./middleware");
const { verifyToken, verifyRole } = require("./middleware/verifytoken");

const app = express();
const port = 3000;
app.use(express.json());

app.post("/login", login);
app.get("/user", verifyToken, validationGetUser, getUser);
app.put("/user", verifyToken, validationUpdate, updateUser);
app.delete("/user", verifyRole, validationDelete, deleteUser);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
