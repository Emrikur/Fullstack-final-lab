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
    //console.log("Redo att göra databasanrop");
}))();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.get("/dashboard/:dashboard", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(request.params.dashboard);
    // const getName = await database.all("SELECT * FROM accounts;");
    // response.send(`${getName[0].name}`);
    response.send(request.params.dashboard);
}));
app.use(express_1.default.json());
app.post("/login", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Backend recieved body:", request.body);
    if (request.body.email && request.body.password) {
        const validateLogin = yield database.all(`SELECT * FROM accounts WHERE email=? AND password=?;`, [request.body.email, request.body.password]);
        const checkDb = validateLogin.find((user) => user.email === request.body.email &&
            user.password === request.body.password);
        //console.log(validateLogin[0])
        if (checkDb) {
            console.log(validateLogin[0]);
            console.log("You're in");
            // const getName = await database.all("SELECT * FROM accounts;");
            response.send({ user: validateLogin[0] });
        }
        else {
            response.status(401);
        }
    }
    else {
        response.status(400);
        response.send("missing input");
    }
}));
app.post("/accounts/create", (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    let match = true;
    console.log(request.body.name);
    console.log(request.body.surname);
    console.log(request.body.email);
    console.log(request.body.password);
    if (request.body.name &&
        request.body.surname &&
        request.body.email &&
        request.body.password) {
        if (request.body.password.length >= 6) {
            const getAllInfo = yield database.all(`SELECT * FROM accounts;`);
            // console.log(getAccount[0].id)
            if (getAllInfo.find(matchingAccount => matchingAccount.email === request.body.email)) {
                match = false;
                response.status(400);
                response.send({ isValid: match });
            }
            else {
                const createAccount = yield database.all(`INSERT INTO accounts (name, surname, email, password) VALUES(
        "${request.body.name}",
         "${request.body.surname}",
         "${request.body.email}",
         "${request.body.password}");`);
                const getAccount = yield database.all(`SELECT id FROM accounts WHERE email=?;`, [`${request.body.email}`]);
                //console.log(getAccount[0].id);
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
app.put("/accounts/update", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // const getName = await database.all("SELECT * FROM accounts;");
    response.send(``);
}));
app.delete("/accounts/delete", (_request, response) => __awaiter(void 0, void 0, void 0, function* () {
    // const getName = await database.all("SELECT * FROM accounts;");
    response.send(`account deleted`);
}));
app.listen(3000, () => {
    console.log("Webbtjänsten kan nu ta emot anrop på http://localhost:3000/");
});
