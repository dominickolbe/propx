import multer from "@koa/multer";
import Router from "@koa/router";
import Koa from "koa";
import { propertyBodySchema } from "propx-models/schemas";
import {
  HTTP_STATUS_BAD_REQUEST,
  PROPERTIES_DEFAULT_ORDER_BY,
} from "propx-utils/src";
import { FIELDNAME_IMAGE, MAX_FILE_SIZE } from "../../constants";
import { PropertyModel } from "../../database/mongo/model/Property";
import { validatePropertyPostBody } from "../../middleware/validation";
import { setupStorage, sleep, validateFileType } from "../../utils";

export const setupApiRouter = (params: { prefix: string }) => {
  const { prefix } = params;
  return {
    init: (app: Koa) => {
      const router = new Router();

      const uploadConfig = multer({
        storage: setupStorage(),
        // due to limitation, filesize will be checked further down
        // limits: { fileSize: MAX_FILE_SIZE },
        fileFilter: validateFileType,
      });

      router.get("/__status", async (ctx) => {
        ctx.body = {
          status: "success",
        };
      });

      router.get("/properties", async (ctx, next) => {
        await sleep(2000);

        try {
          const LIMIT = 250;
          const OFFSET = 0;

          const data = await PropertyModel.find()
            .sort(PROPERTIES_DEFAULT_ORDER_BY)
            .limit(LIMIT)
            .skip(OFFSET);

          ctx.body = data;
          return next();
        } catch {
          ctx.response.status = HTTP_STATUS_BAD_REQUEST;
          return;
        }
      });

      router.post(
        "/properties",
        uploadConfig.single(FIELDNAME_IMAGE),
        validatePropertyPostBody,
        async (ctx, next) => {
          // checking for file size
          // TODO: refactor and creating middleware
          if (ctx.file.size > MAX_FILE_SIZE) {
            ctx.response.status = HTTP_STATUS_BAD_REQUEST;
            return;
          }

          const parsedBody = propertyBodySchema.cast(ctx.request.body);

          const property = new PropertyModel({
            address: parsedBody.address,
            image: ctx.file.filename,
            price: parsedBody.price,
          });

          await property.save();

          ctx.body = property.toJSON();
          return next();
        }
      );

      router.allowedMethods();
      router.prefix(prefix);

      app.use(router.routes());
    },
  };
};
