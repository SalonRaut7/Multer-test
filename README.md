# File Upload with Cloudinary and MongoDB

This project demonstrates how to upload files to Cloudinary using Node.js, Multer, and store file metadata in MongoDB. The files are uploaded directly from memory (buffer) and saved to Cloudinary using Cloudinary's `upload_stream`. The project also includes the functionality to handle multiple file uploads at once.

## Features
- File upload with Multer and Cloudinary.
- Upload multiple files at once.
- Save file metadata (filename, Cloudinary `public_id`, and URL) to MongoDB.
- Responsive and simple frontend using EJS for file upload.
- Secure Cloudinary upload with environment variables.

## Technologies Used
- **Node.js** for the server-side logic.
- **Multer** for handling file uploads.
- **Cloudinary** for storing files in the cloud.
- **MongoDB** for storing file metadata.
- **Express** for routing.
- **EJS** for the view engine.
- **dotenv** for environment variable management.

## Requirements

Before running the project, make sure you have the following installed:
- [Node.js](https://nodejs.org/en/) and npm.
- [MongoDB](https://www.mongodb.com/try/download/community) (or MongoDB Atlas for cloud-hosted databases).
- A [Cloudinary account](https://cloudinary.com/), and your `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` values.

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/SalonRaut7/Multer-test.git
cd Multer-test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Create a .env file
Create a .env file in the root of the project with the following values:
```bash
PORT=your-port
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CONNECTION_STRING=your-mongo-url
```