import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  const message = req.flash("message");
  const status = req.flash("status");
  res.render("index", { message, status });
});

router.post("/register", (req, res) => {
  let email = req.body.email;
  console.log("E-mail: " + email);
  if (email.length > 0 && email !== undefined) {
    req.flash("message", "E-mail cadastrado com sucesso!");
    req.flash("status", "success");
    res.redirect("/");
  } else {
    req.flash("message", "Erro ao cadastrar e-mail.");
    req.flash("status", "error");
    res.redirect("/");
  }
});

router.post("/sendMessage", (req, res) => {
  req.flash("message", "Mensagem enviada com sucesso!");
  req.flash("status", "success");
  res.redirect("/");
});

export { router };
