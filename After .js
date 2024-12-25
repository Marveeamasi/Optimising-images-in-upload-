const express = require("express");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const streamifier = require("streamifier");

const upload = multer();
const app = express();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.post("/upload", upload.single("image"), (req, res) => {
  const fileBuffer = req.file.buffer;

  // Upload to Cloudinary
  cloudinary.uploader
    .upload_stream(
      {
        folder: "ecommerce/products",
        quality: "auto",
        format: "webp",
      },
      (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Image upload failed", error });
        }

        res.status(200).json({ message: "Image uploaded successfully", url: result.secure_url });
      }
    )
    .end(fileBuffer);
});

app.listen(3000, () => console.log("Server running on port 3000"));
        
