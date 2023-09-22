import "dotenv/config";

import { bodyParser } from "@koa/bodyparser";
import KoaCors from "@koa/cors";
import Koa from "koa";
import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} from "propx-utils/src";
import { CLIENT_ORIGIN, PORT } from "./config";
import { UPLOAD_PATH } from "./constants";
import { Database } from "./database/mongo";
import { setupApiRouter } from "./routes/api";
import { setupDebugRouter } from "./routes/debug";
const serve = require("koa-static");

const SetupDebugRouter = setupDebugRouter({ prefix: "/debug" });
const SetupApiRouter = setupApiRouter({ prefix: "/api" });

const server = async () => {
  console.log(`[Info]: server is starting`);

  const result = await Database.connect();
  if (result.err) process.exit(1);

  const app = new Koa();

  app.use(
    KoaCors({
      credentials: true,
      origin: CLIENT_ORIGIN,
      allowMethods: "GET",
    })
  );

  app.use(bodyParser());

  app.use(serve(UPLOAD_PATH));

  // catch all error in preceding middleware
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || HTTP_STATUS_INTERNAL_SERVER_ERROR;
      ctx.app.emit("error", err, ctx);
    }
  });

  // throw error in response middleware
  // app.use(async (ctx) => {
  //   ctx.response.status = HTTP_STATUS_BAD_REQUEST;
  //   return;
  // });

  SetupDebugRouter.init(app);
  SetupApiRouter.init(app);

  app.listen(PORT, () => {
    console.log(`[Info]: server is running on port ${PORT}`);
  });
};

server();
