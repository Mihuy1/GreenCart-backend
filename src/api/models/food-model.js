import promisePool from '../../utils/database.js';

const listAllFoods = async () => {
  const [rows] = await promisePool.query('SELECT * FROM foods');
  console.log('rows', rows);
  return rows;
};

const findFoodById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM foods WHERE id = ?', [
    id,
  ]);
  console.log('rows', rows);
  return rows;
};

const addFood = async (food) => {
  const {name, description, price, category, image} = food;
  const sql = `INSERT INTO foods (name, description, price, category, image)
    VALUES (?, ?, ?, ?, ?)`;
  const params = [name, description, price, category, image].map(
    (arvo) => arvo ?? null
  );
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {food_id: rows[0].insertId};
};

const modifyFood = async (food, id) => {
  const sql = promisePool.format(`UPDATE foods SET ? WHERE id = ?`, [food, id]);

  const rows = await promisePool.execute(sql);
  console.log('rows', rows);

  if (rows[0].affectedRows === 0) return false;

  return {message: 'success'};
};

const removeFood = async (id) => {
  const sql = promisePool.format(`DELETE FROM foods WHERE id = ?`, [id]);

  const [rows] = await promisePool.execute(sql);

  if (rows.affectedRows === 0) {
    return false;
  }

  return {message: 'success'};
};

export {listAllFoods, findFoodById, addFood, modifyFood, removeFood};
