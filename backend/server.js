const express = require("express");
const cors = require("cors");         // import cors
const app = express();                // initialize app

app.use(cors());                      // use cors middleware
app.use(express.json());              // parse JSON

// Routes
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(logger);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.use(errorHandler);

app.get("/", (req, res) => res.send("✅ Mini Blog API is working!"));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
