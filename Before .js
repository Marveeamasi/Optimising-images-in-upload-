const express = require("express");
const multer = require("multer");
const path = require("path");

const upload = multer({ dest: "uploads/" });
const app = express();

app.post("/upload", upload.single("image"), (req, res) => {
  const file = req.file;

  // Save the uploaded file to a local directory
  const savePath = path.join(__dirname, "uploads", file.originalname);
  fs.renameSync(file.path, savePath);

  res.status(200).json({ message: "Image uploaded successfully", path: savePath });
});

app.listen(3000, () => console.log("Server running on port 3000"));
         
