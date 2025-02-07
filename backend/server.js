const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS
app.use(bodyParser.json());

const SECRET = process.env.ENCRYPTION_SECRET || 'mysecretkey'; // Replace with a secure key
const KEY = crypto.createHash('sha256').update(String(SECRET)).digest();
const ALGORITHM = 'aes-256-cbc';

// Endpoint for password encryption
app.post('/encrypt', (req, res) => {
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password is required' });
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedString = iv.toString('hex') + ':' + encrypted;
  res.json({ encryptedString });
});

// Endpoint for password decryption
app.post('/decrypt', (req, res) => {
  const { encryptedString } = req.body;
  if (!encryptedString) {
    return res.status(400).json({ error: 'Encrypted string is required' });
  }
  const parts = encryptedString.split(':');
  if (parts.length !== 2) {
    return res.status(400).json({ error: 'Invalid encrypted string format.' });
  }
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ password: decrypted });
  } catch (err) {
    console.error('Decryption error:', err);
    res.status(500).json({ error: 'Decryption failed. Check that you provided a valid encrypted string.' });
  }
});

// New endpoint for username encryption
app.post('/encrypt-username', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
  let encrypted = cipher.update(username, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  const encryptedString = iv.toString('hex') + ':' + encrypted;
  res.json({ encryptedString });
});

// New endpoint for username decryption
app.post('/decrypt-username', (req, res) => {
  const { encryptedString } = req.body;
  if (!encryptedString) {
    return res.status(400).json({ error: 'Encrypted string is required' });
  }
  const parts = encryptedString.split(':');
  if (parts.length !== 2) {
    return res.status(400).json({ error: 'Invalid encrypted string format.' });
  }
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  try {
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    res.json({ username: decrypted });
  } catch (err) {
    console.error('Username decryption error:', err);
    res.status(500).json({ error: 'Username decryption failed. Check that you provided a valid encrypted string.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
