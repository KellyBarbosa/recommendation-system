import { Router } from "express";
import snsController from "../../Controllers/snsController.js";

const router = Router();

router.get("/status", snsController.checkStatus);

router.get("/", snsController.home);

router.post("/register", snsController.subscribe);

router.post("/sendMessage", snsController.sendMessage);

export { router };
