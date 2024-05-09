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

// Serve API documentation in root apidocs folder
const apidocPath = path.join(path.resolve(), '../apidoc');
console.log(`Serving static files from: ${apidocPath}`);
app.use('/api/v1/apidoc', express.static(apidocPath));

app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: 'An unexpected error occurred'});
});

export default app;
