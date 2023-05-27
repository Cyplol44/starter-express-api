const express = require('express');
const multer = require('multer');
const parseTorrent = require('parse-torrent');

const app = express();

// Set up multer middleware to handle file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB
    },
});

// Set up a route to handle file uploads
app.post('https://test-t2m.vercel.app/upload/', upload.single('torrent'), (req, res) => {
    // Use parseTorrent to parse the uploaded file data
    const parsedTorrent = parseTorrent(req.file.buffer);
    // Use parseTorrent.toMagnetURI() to convert the parsed data to a magnet URI
    const magnetURI = parseTorrent.toMagnetURI(parsedTorrent);

    // Send the magnet URI as the response
    res.send(magnetURI);
});

// Serve the static files in the public directory
app.use(express.static('public'));

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on http://localhost:3000');
});
