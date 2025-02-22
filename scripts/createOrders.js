import { getConfig, postConfig, makeRequest, params } from "../support/api.js";
import { ask } from "../support/questionAsync.js";
import { faker } from "@faker-js/faker";


go();
async function go() {
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

  for (var i = 0; i < howMany; i++) {
    let itemSelections = [];  
    const numberOfItems = Math.floor(Math.random() * 6) + 1;
    for (var item = 0; item < numberOfItems; item++) {
      const randomIndex = Math.floor(Math.random() * productReq.data.length);
      const selection = productReq.data[randomIndex];
      itemSelections.push({
        id: selection.id,
        department: selection.department,
        price: selection.price,
      });
    }
   
    const totalCost = itemSelections
      .map((e) => e.price)
      .reduce((a, b) => {
        return a + b;
      });

    const randomUser = Math.floor(Math.random() * userReq.data.length);
    const userObj = userReq.data[randomUser];    
    const obj = {   
      id: faker.string.uuid(),         
      email: userObj.email,
      items: itemSelections,
      totalItems: itemSelections.length,
      totalPrice: totalCost,
    };
    
    displayTable.push({
      email: obj.email, 
      "totalItems": obj.totalItems, 
      totalCost: obj.totalPrice
    })

    const ordersEndpoint = `${parms.baseUrl}${parms.orders}`;
    const postConf = await postConfig(ordersEndpoint, obj);
    await makeRequest(postConf);
  }
  // print info table.
  console.log("\n\n ===== Orders Created =====\n");
  console.table(displayTable)
}
