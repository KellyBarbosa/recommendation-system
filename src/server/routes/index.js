import { Router } from "express";
import generateMessage from "../../generateMessage.js";
import AWS from 'aws-sdk'


const router = Router();

// AWS CONFIGS

const creds = new AWS.SharedIniFileCredentials({ profile: 'default' })
const sns = new AWS.SNS({ creds, region: process.env.AWS_REGION })

router.get('/status', (req, res) => res.send({ status: 'ok', sns }))

router.get("/", (req, res) => {
  const message = req.flash("message");
  const status = req.flash("status");
  res.render("index", { message, status });
});



router.post("/register", (req, res) => {
  const email = req.body.email;
  console.log(req.body);
  const params = {
    Protocol: 'EMAIL',
    TopicArn: process.env.AWS_ARN,
    Endpoint: email
  }

  if (email !== "" && email !== undefined) {
    console.log("E-mail: " + email);

    sns.subscribe(params, (err, data) => {
      if (err) {
        console.log(err);
        req.flash("message", "Erro ao cadastrar e-mail.");
        req.flash("status", "error");
      }
      else {
        req.flash("message", "E-mail cadastrado com sucesso!");
        req.flash("status", "success");
      }
    }).promise().then(() => res.redirect("/"))
  } else {
    req.flash("message", "Erro ao cadastrar e-mail.");
    req.flash("status", "error");
    res.redirect("/");
  }
});

router.post("/sendMessage", async (req, res) => {
  const getSwitch = {
    anime: req.body.switchAnime,
    tv: req.body.switchTvShow,
    filme: req.body.switchFilme,
  };

  if (getSwitch.anime || getSwitch.tv || getSwitch.filme) {
    const email = await generateMessage.message(
      getSwitch.anime,
      getSwitch.tv,
      getSwitch.filme
    );
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
