const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const PORT = 8000; // Define the port number where the server will listen

// Configure Multer storage settings
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        return cb(null, './uploads'); // Save uploaded files in the 'uploads' directory
    },
    filename: function(req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`); // Rename the file with a timestamp
    }
});

// Initialize Multer with the defined storage settings
const upload = multer({ storage: storage });

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: false }));

// Route to render the homepage
app.get('/', (req, res) => {
    res.render('homepage');
});

// Route to handle file upload
app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.file); // Log uploaded file details to the console
    return res.redirect('/'); // Redirect back to homepage after upload
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
