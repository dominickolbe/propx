import Koa from "koa";
import Router from "@koa/router";
import { getProcessUptime } from "../../utils";

export const setupDebugRouter = (params: { prefix: string }) => {
  const { prefix } = params;
  return {
    init: (app: Koa) => {
      const router = new Router();

      router.get("/__status", async (ctx) => {
        ctx.body = {
          status: "success",
          uptime: getProcessUptime(),
        };
      });

      router.get("/__headers", async (ctx) => {
        ctx.body = ctx.request.headers;
      });

      router.allowedMethods();
      router.prefix(prefix);

      app.use(router.routes());
    },
  };
};
