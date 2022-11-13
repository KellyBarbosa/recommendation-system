import { server } from "./src/server/Server.js";

server.listen(process.env.PORT || 3333, () =>
  console.log(`App rodando na porta ${process.env.PORT || 3333}!`)
);
