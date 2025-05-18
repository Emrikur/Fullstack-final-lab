import cors from "cors";
import express from "express";
import * as sqlite from "sqlite";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import { v4 as uuidv4 } from "uuid";

let database: Database;
(async () => {
  database = await sqlite.open({
    driver: sqlite3.Database,
    filename: "database.sqlite",
  });

  await database.run("PRAGMA foreign_keys = ON");

  //console.log("Redo att göra databasanrop");
})();

const app = express();
app.use(cors());

app.get("/dashboard/:dashboard", async (request, response) => {
console.log(request.params.dashboard)
  // const getName = await database.all("SELECT * FROM accounts;");
  // response.send(`${getName[0].name}`);
  response.send(request.params.dashboard)
});

app.use(express.json());

app.post("/login", async (request, response) => {
  console.log("Backend recieved body:", request.body);
  if (request.body.email && request.body.password) {

    const validateLogin = await database.all(
      `SELECT * FROM accounts WHERE email=? AND password=?;`,
      [request.body.email, request.body.password]
    );
    const checkDb = validateLogin.find(
      (user) =>
        user.email === request.body.email &&
        user.password === request.body.password
    );
    //console.log(validateLogin[0])
    if (checkDb) {
      console.log(validateLogin[0]);
      console.log("You're in");
      // const getName = await database.all("SELECT * FROM accounts;");
      response.send({ user: validateLogin[0] });
    } else {
      response.status(401);
    }
  } else {
    response.status(400);
    response.send("missing input");
  }
});

app.post("/accounts/create", async (request, response) => {
  let match = true


  console.log(request.body.name);
  console.log(request.body.surname);
  console.log(request.body.email);
  console.log(request.body.password);

  if (
    request.body.name &&
    request.body.surname &&
    request.body.email &&
    request.body.password
  ) {


    if (request.body.password.length >= 6) {

        const getAllInfo = await database.all(
        `SELECT * FROM accounts;`
      );




      // console.log(getAccount[0].id)

      if(getAllInfo.find(matchingAccount => matchingAccount.email === request.body.email)){
        match = false
        response.status(400)
        response.send({isValid:match})


      }else{

        const createAccount = await database.all(
        `INSERT INTO accounts (name, surname, email, password) VALUES(
        "${request.body.name}",
         "${request.body.surname}",
         "${request.body.email}",
         "${request.body.password}");`
      );

      const getAccount = await database.all(
        `SELECT id FROM accounts WHERE email=?;`,
        [`${request.body.email}`]
      );

      //console.log(getAccount[0].id);
      const setToken = await database.all(
        `INSERT INTO tokens (account_id, token) VALUES (${
          getAccount[0].id
        },'${uuidv4()}');`
      );
      match = true
      response.status(201)
      response.send({isValid:match})
      }
    } else {
      response.status(400);
      response.send({error:"Password too short"});
    }
  } else {
    response.status(400);
    response.send({error:"Missing required input"});
  }
});

app.put("/accounts/update", async (_request, response) => {
  // const getName = await database.all("SELECT * FROM accounts;");
  response.send(``);
});

app.delete("/accounts/delete", async (_request, response) => {
  // const getName = await database.all("SELECT * FROM accounts;");
  response.send(`account deleted`);
});

app.listen(3000, () => {
  console.log("Webbtjänsten kan nu ta emot anrop på http://localhost:3000/");
});
