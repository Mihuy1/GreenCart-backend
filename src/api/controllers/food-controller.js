import {
  addFood,
  findFoodById,
  removeFood,
  modifyFood,
  listAllFoods,
} from '../models/food-model.js';

const getFood = async (req, res) => {
  res.json(await listAllFoods());
};

const getFoodById = async (req, res) => {
  const food = await findFoodById(req.params.id);
  if (food) {
    res.json(food);
  } else {
    res.sendStatus(404);
  }
};

const postFood = async (req, res) => {
  console.log('postFood', req.body);
  const result = await addFood(req.body);
  if (result.food_id) {
    res.status(201);
    res.json({message: 'New food added.', result});
  } else {
    res.sendStatus(400);
  }
};

const putFood = async (req, res) => {
  const foodId = req.params.id;
  const updatedFood = req.body;

  const result = await modifyFood(updatedFood, foodId);

  if (result) {
    res.status(201).json(result);
  } else {
    res.sendStatus(404);
  }
};

const deleteFood = async (req, res) => {
  const foodId = req.params.id;

  const result = await removeFood(foodId);

  if (result) {
    res.status(200);
    res.json({message: 'Food deleted succesfully'});
  } else {
    res.status(404);
  }
};

export {getFood, getFoodById, postFood, putFood, deleteFood};
