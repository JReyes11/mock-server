import { getConfig, postConfig, makeRequest, params } from "../support/api.js";
import { ask } from "../support/questionAsync.js";
import { faker } from "@faker-js/faker";

generateOrders();
async function generateOrders() {
  // Ask for how many records to create.
  const howMany = await ask("Number of Orders to create? (Ex: 5)");

  // Obtain products from DB.
  const parms = await params();
  const endpoint = `${parms.baseUrl}${parms.products}`;
  const conf = await getConfig(endpoint);
  const productReq = await makeRequest(conf);

  // Obtain users from DB
  const usersEndpoint = `${parms.baseUrl}${parms.users}`;
  const userConf = await getConfig(usersEndpoint);
  const userReq = await makeRequest(userConf);
  const displayTable = [];

  // random product, random user, build request obj, send request.
  for (var i = 0; i < howMany; i++) {
    const randomProd = Math.floor(Math.random() * productReq.data.length);
    const prodObj = productReq.data[randomProd];
    const randomUser = Math.floor(Math.random() * userReq.data.length);    
    const userObj = userReq.data[randomUser];
    const randomQuanity = Math.floor(Math.random() * 9) + 1;    
    const obj = {
      id: faker.string.uuid(),
      userId: userObj.id,
      email: userObj.email,
      productName: prodObj.productName,
      productId: prodObj.productId,
      pricePerUnit: prodObj.price,
      quantity: randomQuanity,
      totalPrice: randomQuanity * prodObj.price,
    };
    const ordersEndpoint = `${parms.baseUrl}${parms.orders}`;
    const postConf = await postConfig(ordersEndpoint, obj);
    await makeRequest(postConf);
    displayTable.push({
      id: obj.id,
      userId: obj.userId,
    });
  }
  // print info table.
  console.log("\n\n ===== Orders Created =====\n");
  console.table(displayTable);
}
