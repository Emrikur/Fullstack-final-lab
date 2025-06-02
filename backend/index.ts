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
})();

const app = express();
app.use(cors());

app.get("/dashboard/:user", async (request, response) => {
  console.log(request.params.user);
  // const getName = await database.all("SELECT * FROM accounts;");
  // response.send(`${getName[0].name}`);
  response.send(request.params.user);
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
    let validData = true;

    if (checkDb) {
      // console.log("Validate Login", validateLogin[0]);
      // console.log("You're in");
      response.send({ user: validateLogin[0] });
    } else {
      validData = false;
      response.status(401);
      response.send({ response: validData });
    }
  } else {
    response.status(400);
    response.send("missing input");
  }
});
app.get("/accounts/admin", async (request, response) => {
  const getAdminBroadcast = await database.all(`SELECT * FROM broadcasts;`);
  console.log(getAdminBroadcast);

  response.send(getAdminBroadcast);
});

app.post("/horoscope/day", async (request, response) => {
  const URL = request.body.horoscope;

  fetch(`${URL}`)
    .then((response) => response.json())
    .then((result) => {
      const horoscopeData = result.data;
      //console.log(horoscopeData);

      //console.log(adminBroadcast)
      response.send({ response: horoscopeData });
    });
  //console.log(request.body.horoscope);
  //console.log(horoscopeData)
});

app.post("/horoscope/week", async (request, response) => {
  const URL = request.body.horoscope;

  fetch(`${URL}`)
    .then((response) => response.json())
    .then((result) => {
      const horoscopeData = result.data;
      //console.log(horoscopeData);

      //console.log(adminBroadcast)
      response.send({ response: horoscopeData });
    });
});

app.post("/horoscope/month", async (request, response) => {
  const URL = request.body.horoscope;

  fetch(`${URL}`)
    .then((response) => response.json())
    .then((result) => {
      const horoscopeData = result.data;
      //console.log(horoscopeData);

      //console.log(adminBroadcast)
      response.send({ response: horoscopeData });
    });
});

app.put("/accounts/admin", async (request, response) => {
  console.log(request.body.user_id);
  console.log(request.body.feature);
  console.log(request.body.optimization);
  console.log(request.body.upcoming);

  if (
    request.body.user_id &&
    request.body.feature.length >= 6 &&
    request.body.optimization.length >= 6 &&
    request.body.upcoming.length >= 6
  ) {
    const verifyAccount = await database.all(
      `SELECT id FROM accounts WHERE id=?`,
      [request.body.user_id]
    );

    if (verifyAccount) {
      const getAdminBroadcast = await database.all(
        `UPDATE broadcasts SET admin_id=?, feature=?, optimization=?, upcoming=?`,
        [
          request.body.user_id,
          request.body.feature,
          request.body.optimization,
          request.body.upcoming,
        ]
      );

      response.status(200);
      response.send("Resource updated successfully");
    } else {
      response.status(401);
      response.send("User unauthorized");
    }
  } else {
    response.status(400);
    response.send("missing an input field");
  }
});

app.post("/accounts/create", async (request, response) => {
  let match = true;

  console.log(request.body.name);
  console.log(request.body.surname);
  console.log(request.body.email);
  console.log(request.body.password);
  console.log(request.body.secAnswer);
  console.log(request.body.zodiac);

  if (
    request.body.name &&
    request.body.surname &&
    request.body.email &&
    request.body.password &&
    request.body.secAnswer &&
    request.body.zodiac
  ) {
    if (
      request.body.password.length >= 6 &&
      request.body.secAnswer.length >= 1
    ) {
      const getAllInfo = await database.all(`SELECT * FROM accounts;`);

      // console.log(getAccount[0].id)

      if (
        getAllInfo.find(
          (matchingAccount) => matchingAccount.email === request.body.email
        )
      ) {
        match = false;
        response.status(400);
        response.send({ isValid: match });
      } else {
        const createAccount = await database.all(
          `INSERT INTO accounts (name, surname, email, password, security_answer, zodiac) VALUES(
        "${request.body.name}",
         "${request.body.surname}",
         "${request.body.email}",
         "${request.body.password}",
         "${request.body.secAnswer}",
         "${request.body.zodiac}");
         `
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
        match = true;
        response.status(201);
        response.send({ isValid: match });
      }
    } else {
      response.status(400);
      response.send({ error: "Password too short" });
    }
  } else {
    response.status(400);
    response.send({ error: "Missing required input" });
  }
});

app.post("/accounts/validation", async (request, response) => {
  const getName = await database.all(
    "SELECT id FROM accounts WHERE security_answer=? AND email=?",
    [request.body.securityAnswer, request.body.formEmail]
  );
  console.log("Användar-id:", getName[0].id);

  if (getName) {
    const getToken = await database.all(
      "SELECT token FROM tokens WHERE account_id=?",
      [getName[0].id]
    );
    console.log(getToken[0].token);
    response.send({ response: getToken[0].token });
  } else {
    response.send({ response: "Invalid output" });
  }
});
app.post("/accounts/validation/token", async (request, response) => {
  const getToken = await database.all("SELECT * FROM tokens");
  console.log("Användar-tokens:", getToken);

  if (
    getToken.find((userToken) => userToken.token === request.body.userToken)
  ) {
    const validUser = getToken.find(
      (userToken) => userToken.token === request.body.userToken
    );
    console.log("The valid user", validUser.name);
    const getName = await database.all("SELECT name FROM accounts WHERE id=?", [
      getToken[0].account_id,
    ]);
    console.log(getName[0].name);
    response.send({ response: getName[0].name });
  } else {
    response.send({ response: "Invalid output" });
  }
});

app.patch("/accounts/update", async (request, response) => {
  const getId = await database.all(
    `SELECT account_id FROM tokens WHERE token=?`,
    [request.body.theUserToken]
  );

  console.log(getId);

  const setPassword = await database.all(
    `UPDATE accounts SET password=? WHERE id=?`,
    [request.body.password, getId[0].account_id]
  );
  // console.log("User Password "+ request.body.password)
  // console.log("UserToken "+ request.body.theUserToken)
  response.send({ response: "Password Updated" });
});

app.post("/dreams", async (request, response) => {
  console.log(request.body.activeUserId);
  const setToken = await database.all(
    `SELECT * FROM dreams WHERE account_id=?;`,
    [`${request.body.activeUserId}`]
  );

  console.log(setToken);
  // const getName = await database.all("SELECT * FROM accounts;");
  response.send({ dbEntries: setToken });
});
app.post("/dreams/create", async (request, response) => {
  console.log(request.body.formData);
  const setEntry = await database.all(
    `INSERT INTO dreams (account_id, title, text, tag) VALUES (${request.body.activeUserId}, "${request.body.formData.dreamTitle}", "${request.body.formData.dreamContent}", "${request.body.formData.dreamTags}");`
  );

  response.send({ response: "New post created" });
});

app.delete("/dreams/delete", async (request, response) => {
  // console.log(request.body.id_Of_Dream)
  // console.log(request.body.activeUserId)

  if (request.body.id_Of_Dream && request.body.activeUserId) {
    const deletePost = await database.all(
      `DELETE FROM dreams WHERE dream_id=? AND account_id=?;`,
      [request.body.id_Of_Dream, request.body.activeUserId]
    );

    response.send({ answer: "Post deleted" });
  } else {
    response.status(418);
    response.send({ InvalidRequest: "I'm a teapot!" });
  }
});

app.listen(3000, () => {
  console.log("Webbtjänsten kan nu ta emot anrop på http://localhost:3000/");
});
