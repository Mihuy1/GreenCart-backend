import {
  listAllUsers,
  findUserById,
  modifyUser,
  removeUser,
  addUser,
} from '../models/user-model.js';

const getUsers = async (req, res) => {
  res.json(await listAllUsers());
};

const getUserById = async (req, res) => {
  const user = await findUserById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
};

const postUser = async (req, res) => {
  console.log('postUser', req.body);
  const result = await addUser(req.body);
  if (result.user_id) {
    res.status(201);
    res.json({message: 'New user added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putUser = async (req, res) => {
  const result = await modifyUser(req.params.id, req.body);
  if (result) {
    res.status(200);
    res.json({message: 'User updated.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;

  const result = await removeUser(userId);

  if (result) {
    res.status(200);
    res.json({message: 'User deleted succesfully'});
  } else {
    res.status(404);
  }
};

export {getUsers, getUserById, postUser, putUser, deleteUser};
