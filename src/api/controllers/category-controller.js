import {
  listAllCategories,
  findCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
} from '../models/category-model.js';

const getCategory = async (req, res) => {
  const data = await listAllCategories();
  res.json(data);
};

const getCategoryById = async (req, res) => {
  const category = await findCategoryById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.sendStatus(404);
  }
};

const postCategory = async (req, res) => {
  const result = await addCategory(req.body);

  if (result.category_id) {
    res.status(201);
    res.json({message: 'New category added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putCategory = async (req, res) => {
  const id = req.params.id;
  const category = req.body;

  const result = await modifyCategory(id, category);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

const deleteCategory = async (req, res) => {
  const id = req.params.id;

  const result = await removeCategory(id);

  if (result) {
    res.json(result);
  } else {
    res.sendStatus(404);
  }
};

export {
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
