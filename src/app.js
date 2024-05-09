import express from 'express';
import api from './api/index.js';
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/uploads', express.static('uploads'));
app.use('/api/v1', api);

// Serve API documentation from the 'apidoc' directory at the '/app' path
app.use('/app', express.static(path.join(__dirname, 'apidoc')));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// In your app.js or middlewares.js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: 'An unexpected error occurred'});
});

export default app;
