// pages/api/upload.js
import upload from '../../multer-config'; // Import the multer configuration

export default function handler(req, res) {
  upload.array('images', 10)(req, res, (err) => { // Accept up to 10 files
    if (err) {
      return res.status(500).json({ error: 'Error uploading files' });
    }
    // Files are available in req.files
    res.status(200).json({ message: 'Files uploaded successfully', files: req.files });
  });
}