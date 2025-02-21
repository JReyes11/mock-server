import { params, postConfig, makeRequest } from "../support/api.js";
import { address } from "../fixtures/addressList.js";
import { faker } from "@faker-js/faker";

export const createUsers = async function (num) {
  const users = [];
  const addrData = await address();
  for (var i = 0; i < num; i++) {
    const addrObj =
      addrData.data[Math.floor(Math.random() * addrData.data.length)];
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const randomThreeDigits = Math.floor(Math.random() * 900) + 100;
    const randomFourDigits = Math.floor(Math.random() * 9000) + 1000;
    const letters = firstName.slice(0, firstName.length - 2);
    users.push({
      id: `${letters}${randomThreeDigits}`,
      email: `${firstName}${randomThreeDigits}@${faker.hacker.noun()}.com`,
      firstName: firstName,
      lastName: lastName,
      full_name: `${firstName} ${lastName}`,
      address1: addrObj.address1,
      address2: addrObj.address2,
      city: addrObj.city,
      state: addrObj.state,
      zipCode: addrObj.postalCode,
      phoneNumber: `(${randomThreeDigits}) 555-${randomFourDigits}`,
      alternative_phone: "",
      company: `${lastName} ${faker.hacker.noun()}`,
      country: "United States",
    });
  }
  return users;
};

export const updateDatabaseUsers = async function (arr) {
  const usersCreated = [];
  const parameters = await params();
  const endpoint = `${parameters.baseUrl}${parameters.users}`;
  for (var i = 0; i < arr.length; i++) {
    const conf = await postConfig(endpoint, arr[i]);
    await makeRequest(conf);
    usersCreated.push({
      id: arr[i].id,
      full_name: arr[i].full_name,
      email: arr[i].email,
    });
  }
  console.log("\n ===== The following users have been created =====");
  console.table(usersCreated);
};
