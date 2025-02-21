/*
Reset dj.json to "Factory Defaults".
josereyes
*/

import { users, orders, products } from "../fixtures/data.js";
import fs from "fs";

resetDatabase();
async function resetDatabase() {
  const defaultOrders = await orders();
  const defaultUsers = await users();
  const defaultProducts = await products();
  const obj = {
    orders: defaultOrders,
    users: defaultUsers,
    products: defaultProducts,
  };
  const save = fs.createWriteStream("../db.json");
  save.write(JSON.stringify(obj));
  save.end();
}
