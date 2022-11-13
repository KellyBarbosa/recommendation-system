import { Router } from "express";

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

router.post("/sendMessage", (req, res) => {
  let switchAnime = req.body.switchAnime;
  let switchSerie = req.body.switchSerie;
  let switchFilme = req.body.switchFilme;

  if (switchAnime || switchSerie || switchFilme) {
    console.log("Anime: " + switchAnime);
    console.log("Série: " + switchSerie);
    console.log("Filme: " + switchFilme);
    req.flash("message", "Mensagem enviada com sucesso!");
    req.flash("status", "success");
  } else {
    req.flash("message", "Selecione pelo menos uma categoria.");
    req.flash("status", "error");
  }

  res.redirect("/");
});

export { router };
