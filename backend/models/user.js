const bcrypt = require("bcryptjs");

// Pre-fill a test user
const users = [
  {
    id: 1,
    username: "testuser",
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10)
  }
];

module.exports = users;
