const express = require('express');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = 3000;

// Serve static files from frontend/public
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Create upload folder path
const uploadPath = path.join(__dirname, 'uploads');

// Counter for naming audio files
let counter = 1;

// Multer storage config to save as audio1.wav, audio2.wav, ...
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = `audio${counter++}.wav`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// Upload endpoint
app.post('/upload', upload.single('audio'), (req, res) => {
  res.send({ message: 'Audio uploaded successfully.' });
});

// Optional: Serve caller.html and agent.html explicitly
app.get('/caller.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/caller.html'));
});

app.get('/agent.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/public/agent.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
