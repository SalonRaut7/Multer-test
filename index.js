const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const mongoose = require('mongoose');
const connectDb = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const PORT = process.env.PORT; // Define the port number where the server will listen

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to the database
connectDb();

// Configure Multer to use memory storage
const storage = multer.memoryStorage(); // Use memory storage to upload directly to Cloudinary

// Initialize Multer with the defined storage settings
const upload = multer({ storage: storage });

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// File Schema for MongoDB
const fileSchema = new mongoose.Schema({
    filename: String,
    public_id: String,
    imgUrl: String
});

const File = mongoose.model("Cloudinary", fileSchema);

// Route to render the homepage
app.get('/', (req, res) => {
    res.render('homepage');
});

// Route to handle file upload
app.post('/upload', upload.single('profileImage'), async (req, res) => {
    try {
        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).send("No file uploaded.");
        }

        // Upload the file buffer directly to Cloudinary using upload_stream
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: "UploadTesting",   // Specify the folder for Cloudinary
                resource_type: 'auto',     // Automatically detect file type (image, video, etc.)
                timeout: 60000,            // Timeout for Cloudinary upload
            },
            async (error, result) => {
                if (error) {
                    console.error("Error during Cloudinary upload:", error);
                    return res.status(500).send("Failed to upload the file.");
                }

                // Save file details to MongoDB after successful upload
                const savetoDb = await File.create({
                    filename: req.file.originalname,
                    public_id: result.public_id,
                    imgUrl: result.secure_url,
                });

                // Redirect to homepage with the file URL
                res.redirect("/"); // You can pass the URL to display on the homepage
                console.log("Cloudinary upload response:", result, savetoDb);
            }
        );

        // Create a readable stream from the file buffer and pipe it to Cloudinary
        uploadStream.end(req.file.buffer);

    } catch (error) {
        // Catch any other errors
        console.error("Error during file upload:", error);
        res.status(500).send("Something went wrong during the file upload.");
    }
});
// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

