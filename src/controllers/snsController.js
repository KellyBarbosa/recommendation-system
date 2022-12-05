import AWS from "aws-sdk";
import generateMessage from "../generateMessage.js";

const creds = new AWS.SharedIniFileCredentials({ profile: "default" });
const sns = new AWS.SNS({ creds, region: process.env.AWS_REGION });

export default {
  checkStatus(_, res) {
    return res.send({ status: "Ok", sns });
  },
  async home(req, res) {
    const message = req.session.message;
    const status = req.session.status;
    const info = await subscribeList(req);
    const pending = info.pending;
    const confirmed = info.confirmed;
    res.render("index", { message, status, pending, confirmed });
  },
  subscribe(req, res) {
    const email = req.body.email;
    const params = {
      Protocol: "EMAIL",
      TopicArn: process.env.AWS_ARN,
      Endpoint: email,
    };

    if (email !== "" && email !== undefined) {
      sns
        .subscribe(params, (err) => {
          if (err) {
            req.session.message = "Erro ao cadastrar e-mail.";
            req.session.status = "error";
          } else {
            req.session.message = "E-mail cadastrado com sucesso!";
            req.session.status = "success";
          }
        })
        .promise()
        .then(() => res.redirect("/"));
    } else {
      req.session.message = "Erro ao cadastrar e-mail.";
      req.session.status = "error";
      res.redirect("/");
    }
  },
  async sendMessage(req, res) {
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
      const params = {
        Subject: "Recommendations of the week",
        Message: email,
        TopicArn: process.env.AWS_ARN,
      };
      sns
        .publish(params, (err) => {
          if (err) {
            req.session.message = "Erro ao enviar mensagem.";
            req.session.status = "error";
          } else {
            req.session.message = "Mensagem enviada com sucesso!";
            req.session.status = "success";
          }
        })
        .promise()
        .then(() => res.redirect("/"));
    } else {
      req.session.message = "Selecione pelo menos uma categoria.";
      req.session.status = "error";
      res.redirect("/");
    }
  },
};

const subscribeList = async (req) => {
  req.session.message = "";
  req.session.status = "";
  const params = {
    TopicArn: process.env.AWS_ARN,
  };

  const data = await sns
    .listSubscriptionsByTopic(params)
    .promise()
    .then((data) => {
      return data.Subscriptions;
    });
  const pending = countPending(data);
  const confirmed = countConfirmed(data);
  return { pending, confirmed };
};

const countPending = (data) => {
  const pending = data.filter(
    (e) => e.SubscriptionArn === "PendingConfirmation"
  );
  return pending.length;
};

const countConfirmed = (data) => {
  const confirmed = data.filter((e) =>
    e.SubscriptionArn.includes(":Recommendations:")
  );
  return confirmed.length;
};
