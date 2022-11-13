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
  /*  if (email === undefined) {
    return res.redirect("/");
  } */
  if (email.length > 0 && email !== undefined) {
    console.log("Sucesso");
    req.flash("message", "Operação realizada com sucesso!");
    req.flash("status", "success");
    res.redirect("/");
  }
});

export { router };
