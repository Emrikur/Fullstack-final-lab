"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const sqlite = __importStar(require("sqlite"));
const sqlite3_1 = __importDefault(require("sqlite3"));
const uuid_1 = require("uuid");
let database;
(() => __awaiter(void 0, void 0, void 0, function* () {
    database = yield sqlite.open({
        driver: sqlite3_1.default.Database,
        filename: "database.sqlite",
    });
    yield database.run("PRAGMA foreign_keys = ON");
}))();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/dashboard/:user", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.params.user);
    response.send(request.params.user);
}));
app.use(express_1.default.json());
app.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.body.email && request.body.password) {
        const validateLogin = yield database.all(`SELECT * FROM accounts WHERE email=? AND password=?;`, [request.body.email, request.body.password]);
        const checkDb = validateLogin.find((user) => user.email === request.body.email &&
            user.password === request.body.password);
        let validData = true;
        if (checkDb) {
            response.send({ user: validateLogin[0] });
        }
        else {
            validData = false;
            response.status(401);
            response.send({ response: validData });
        }
    }
    else {
        response.status(400);
        response.send("missing input");
    }
}));
app.get("/accounts/admin", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getAdminBroadcast = yield database.all(`SELECT * FROM broadcasts;`);
    response.send(getAdminBroadcast);
}));
app.post("/horoscope/day", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = request.body.horoscope;
    fetch(`${URL}`)
        .then((response) => response.json())
        .then((result) => {
        const horoscopeData = result.data;
        response.send({ response: horoscopeData });
    });
}));
app.post("/horoscope/week", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = request.body.horoscope;
    fetch(`${URL}`)
        .then((response) => response.json())
        .then((result) => {
        const horoscopeData = result.data;
        response.send({ response: horoscopeData });
    });
}));
app.post("/horoscope/month", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const URL = request.body.horoscope;
    fetch(`${URL}`)
        .then((response) => response.json())
        .then((result) => {
        const horoscopeData = result.data;
        response.send({ response: horoscopeData });
    });
}));
app.put("/accounts/admin", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.body.user_id &&
        request.body.feature.length >= 6 &&
        request.body.optimization.length >= 6 &&
        request.body.upcoming.length >= 6) {
        const verifyAccount = yield database.all(`SELECT id FROM accounts WHERE id=?`, [request.body.user_id]);
        if (verifyAccount) {
            const getAdminBroadcast = yield database.all(`UPDATE broadcasts SET admin_id=?, feature=?, optimization=?, upcoming=?`, [
                request.body.user_id,
                request.body.feature,
                request.body.optimization,
                request.body.upcoming,
            ]);
            response.status(200);
            response.send("Resource updated successfully");
        }
        else {
            response.status(401);
            response.send("User unauthorized");
        }
    }
    else {
        response.status(400);
        response.send("missing an input field");
    }
}));
app.post("/accounts/create", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let match = true;
    if (request.body.name &&
        request.body.surname &&
        request.body.email &&
        request.body.password &&
        request.body.secAnswer &&
        request.body.zodiac) {
        if (request.body.password.length >= 6 &&
            request.body.secAnswer.length >= 1) {
            const getAllInfo = yield database.all(`SELECT * FROM accounts;`);
            // console.log(getAccount[0].id)
            if (getAllInfo.find((matchingAccount) => matchingAccount.email === request.body.email)) {
                match = false;
                response.status(400);
                response.send({ isValid: match });
            }
            else {
                const createAccount = yield database.all(`INSERT INTO accounts (name, surname, email, password, security_answer, zodiac) VALUES(
        "${request.body.name}",
         "${request.body.surname}",
         "${request.body.email}",
         "${request.body.password}",
         "${request.body.secAnswer}",
         "${request.body.zodiac}");
         `);
                const getAccount = yield database.all(`SELECT id FROM accounts WHERE email=?;`, [`${request.body.email}`]);
                const setToken = yield database.all(`INSERT INTO tokens (account_id, token) VALUES (${getAccount[0].id},'${(0, uuid_1.v4)()}');`);
                match = true;
                response.status(201);
                response.send({ isValid: match });
            }
        }
        else {
            response.status(400);
            response.send({ error: "Password too short" });
        }
    }
    else {
        response.status(400);
        response.send({ error: "Missing required input" });
    }
}));
app.post("/accounts/validation", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getName = yield database.all("SELECT id FROM accounts WHERE security_answer=? AND email=?", [request.body.securityAnswer, request.body.formEmail]);
    if (getName) {
        const getToken = yield database.all("SELECT token FROM tokens WHERE account_id=?", [getName[0].id]);
        response.send({ response: getToken[0].token });
    }
    else {
        response.send({ response: "Invalid output" });
    }
}));
app.post("/accounts/validation/token", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getToken = yield database.all("SELECT * FROM tokens");
    if (getToken.find((userToken) => userToken.token === request.body.userToken)) {
        const validUser = getToken.find((userToken) => userToken.token === request.body.userToken);
        const getName = yield database.all("SELECT name FROM accounts WHERE id=?", [
            getToken[0].account_id,
        ]);
        response.send({ response: getName[0].name });
    }
    else {
        response.send({ response: "Invalid output" });
    }
}));
app.patch("/accounts/update", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const getId = yield database.all(`SELECT account_id FROM tokens WHERE token=?`, [request.body.theUserToken]);
    const setPassword = yield database.all(`UPDATE accounts SET password=? WHERE id=?`, [request.body.password, getId[0].account_id]);
    response.send({ response: "Password Updated" });
}));
app.post("/dreams", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const setToken = yield database.all(`SELECT * FROM dreams WHERE account_id=?;`, [`${request.body.activeUserId}`]);
    console.log(setToken);
    // const getName = await database.all("SELECT * FROM accounts;");
    response.send({ dbEntries: setToken });
}));
app.post("/dreams/create", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const setEntry = yield database.all(`INSERT INTO dreams (account_id, title, text, tag) VALUES (${request.body.activeUserId}, "${request.body.formData.dreamTitle}", "${request.body.formData.dreamContent}", "${request.body.formData.dreamTags}");`);
    response.send({ response: "New post created" });
}));
app.delete("/dreams/delete", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    if (request.body.id_Of_Dream && request.body.activeUserId) {
        const deletePost = yield database.all(`DELETE FROM dreams WHERE dream_id=? AND account_id=?;`, [request.body.id_Of_Dream, request.body.activeUserId]);
        response.send({ answer: "Journal entry deleted" });
    }
    else {
        response.status(418);
        response.send({ InvalidRequest: "I'm a teapot!" });
    }
}));
app.listen(3000, () => {
    console.log("Webbtjänsten kan nu ta emot anrop på http://localhost:3000/");
});
