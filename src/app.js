const express = require("express");
const authRoutes = require("./routes/authRoutes");
const pdfRoutes = require("./routes/pdfRoutes");

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: ["text/html", "text/plain"], limit: "10mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// app.use("/api/auth", authRoutes);
app.use("/api/pdf", pdfRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal server error",
  });
});

module.exports = app;
