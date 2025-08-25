const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const songRoutes = require("./routes/songRoutes");

dotenv.config();
connectDB(); // connect to MongoDB

const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // accept JSON from React frontend

// Routes
app.use("/api/songs", songRoutes);
app.get("/",(req,res)=>{
  res.send("working docker")
})


// Start server
app.listen(port, () => {
  console.log(` Server running on http://localhost:${port}`);
});
