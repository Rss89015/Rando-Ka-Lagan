const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const port = 5700;

// Serve static files from "public" folder
app.use(express.static(path.join("C:/Users/HP/OneDrive/Desktop/final_project/public")));
app.use("/files", express.static(path.join(__dirname, "upload_folder")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload_folder");
  },
  filename: (req, file, cb) => {
    const newName = Date.now() + path.extname(file.originalname);
    cb(null, newName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

// Upload route
app.post("/sub", upload.single("user_file"), (req, res) => {
  const fileUrl = `http://localhost:${port}/files/${req.file.filename}`;
  res.send(fileUrl);
});




app.listen(port)