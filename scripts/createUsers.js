// Create Users in db.json
import { createUsers, updateDatabaseUsers } from "../support/helper.js";
import { ask } from "../support/questionAsync.js";

generateUsers();
async function generateUsers() {
  console.log("\n ======= Create Users =======\n");
  const userCount = await ask("Number of Users to create? (Ex: 5)");
  /\d/.test(parseInt(userCount)) == false ? process.exit() : "";
  const newUserArr = await createUsers(userCount); // create user objects
  console.log("newUserArr : ", newUserArr.length)  
  await updateDatabaseUsers(newUserArr);
}
