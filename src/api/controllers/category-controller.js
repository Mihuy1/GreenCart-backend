import {
  listAllCategories,
  findCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
} from '../models/category-model.js';

const getCategory = async (req, res, next) => {
  try {
    const data = await listAllCategories();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const category = await findCategoryById(req.params.id);
    if (category) {
      res.json(category);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const postCategory = async (req, res, next) => {
  try {
    const result = await addCategory(req.body);
    if (result.category_id) {
      res.status(201).json({message: 'New category added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

const putCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = req.body;
    const result = await modifyCategory(id, category);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await removeCategory(id);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

export {
  getCategory,
  getCategoryById,
  postCategory,
  putCategory,
  deleteCategory,
};
