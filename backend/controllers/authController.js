const users = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  const userExists = users.find(u => u.email === email);
  if (userExists) return res.status(400).json({ message: "User exists" });

  const hashed = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, username, email, password: hashed };
  users.push(newUser);
  res.json({ message: "User registered" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ message: "User not found" });

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign({ id: user.id, email: user.email }, "secret123");
  res.json({ token });
};
