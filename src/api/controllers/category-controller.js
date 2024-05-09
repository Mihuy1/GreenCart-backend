import {
  listAllCategories,
  findCategoryById,
  addCategory,
  modifyCategory,
  removeCategory,
} from '../models/category-model.js';

/**
 * @api {get} /categories Get all categories
 * @apiName GetCategories
 * @apiGroup Category
 * @apiSuccess {Object[]} categories List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Categories not found.
 */
const getCategory = async (req, res, next) => {
  try {
    const data = await listAllCategories();
    res.json(data);
  } catch (error) {
    next(error);
  }
};

/**
 * @api {get} /categories/:id Get category by ID
 * @apiName GetCategoryById
 * @apiGroup Category
 * @apiParam {Number} id Category's unique ID.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
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

/**
 * @api {post} /categories Add a new category
 * @apiName PostCategory
 * @apiGroup Category
 * @apiParam {String} name Category's name.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
const postCategory = async (req, res, next) => {
  try {
    console.log('postCategory', req.body, req.file);
    const result = await addCategory(req.body, req.file);
    if (result.category_id) {
      res.status(201).json({message: 'New category added.', result});
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {put} /categories/:id Update a category
 * @apiName PutCategory
 * @apiGroup Category
 * @apiParam {Number} id Category's unique ID.
 * @apiParam {String} name Category's name.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
const putCategory = async (req, res, next) => {
  try {
    const id = req.params.id;
    const category = req.body;
    const file = req.file;
    const result = await modifyCategory(id, category, file);
    if (result) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @api {delete} /categories/:id Delete a category
 * @apiName DeleteCategory
 * @apiGroup Category
 * @apiParam {Number} id Category's unique ID.
 * @apiSuccess {Object} category Category's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
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
