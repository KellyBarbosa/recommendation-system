import { Router } from "express";
import { message } from "../../generateMessage.js";

const router = Router();

router.get("/", (req, res) => {
  const message = req.flash("message");
  const status = req.flash("status");
  res.render("index", { message, status });
});

router.post("/register", (req, res) => {
  let email = req.body.email;

  if (email.length > 0 && email !== undefined) {
    console.log("E-mail: " + email);
    req.flash("message", "E-mail cadastrado com sucesso!");
    req.flash("status", "success");
  } else {
    req.flash("message", "Erro ao cadastrar e-mail.");
    req.flash("status", "error");
  }
  res.redirect("/");
});

router.post("/sendMessage", async (req, res) => {
  let switchAnime = req.body.switchAnime;
  let switchTvShow = req.body.switchTvShow;
  let switchFilme = req.body.switchFilme;

  if (switchAnime || switchTvShow || switchFilme) {
    let email = await message(switchAnime, switchTvShow, switchFilme);
    console.log("Você recebeu uma nova mensagem:\n\n" + email);
    req.flash("message", "Mensagem enviada com sucesso!");
    req.flash("status", "success");
  } else {
    req.flash("message", "Selecione pelo menos uma categoria.");
    req.flash("status", "error");
  }

  res.redirect("/");
});

export { router };
