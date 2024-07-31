const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./path-to-your-service-account-file.json');
const firebaseConfig = require('./firebaseConfig.json'); // Update with your Firebase project config file


// Initialize Firebase Admin SDK with your service account credentials
const serviceAccount = require('./path-to-your-service-account-file.json'); // Update this with your actual path
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  // Optionally, you can specify a databaseURL for Realtime Database or Firestore
});

// Middleware
app.use(cors());
app.use(bodyParser.json());


// Routes
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verify user credentials
    const userRecord = await admin.auth().getUserByEmail(email);
    // If user exists, attempt to sign in
    await admin.auth().signInWithEmailAndPassword(email, password);
    
    res.send({ success: true, message: 'Logged in successfully!' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(401).send({ success: false, message: 'Authentication failed' });
  }
});


// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
