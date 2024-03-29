import express from "express";
import "dotenv/config";
import { router } from "./src/server/routes/index.js";
import session from "express-session";

const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

app.use(router);

app.listen(process.env.PORT || 3333, () =>
  console.log(`App rodando na porta ${process.env.PORT || 3333}!`)
);
