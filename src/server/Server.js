import express from "express";
import "dotenv/config";
import { router } from "./routes/index.js";
import session from "express-session";
import flash from "connect-flash";
import cookieParser from "cookie-parser";

const server = express();

server.set("view engine", "ejs");

server.use(express.static("public"));

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use(cookieParser(process.env.SECRET_COOKIES));

server.use(
  session({
    secret: process.env.SECRET_SESSION,
    cookie: {
      maxAge: 60000,
    },
    resave: true,
    saveUninitialized: true,
  })
);

server.use(flash());

server.use(router);

export { server };
