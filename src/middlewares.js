import jwt from 'jsonwebtoken';
import 'dotenv/config';

import sharp from 'sharp';

const createThumbnail = (req, res, next) => {
  if (!req.file) {
    next();
    console.log('No file to resize');
    return;
  }

  const [filename, extension] = req.file.filename.split('.');

  sharp(req.file.path)
    .resize(160, 160)
    .png()
    .toFile(`${req.file.destination}/${filename}_thumb.${extension}`)
    .then(() => next());
};

const authenticationToken = (req, res, next) => {
  console.log('authenticationToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);

  if (token === null) {
    return res.sendStatus(401);
  }

  try {
    res.locals.customer = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(403).send({message: 'Forbidden, invalid token'});
  }
};

const isAdmin = async (req, res, next) => {
  console.log('isAdmin', res.locals.customer);
  const customer = res.locals.customer;

  if (customer.role !== 'admin') {
    return res.sendStatus(403).json({message: 'Forbidden, not an admin'});
  }

  next();
};

export {authenticationToken, isAdmin, createThumbnail}; // Export the multer upload middleware
