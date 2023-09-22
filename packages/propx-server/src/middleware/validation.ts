import Koa from "koa";
import { HTTP_STATUS_BAD_REQUEST } from "propx-utils/src";
import { propertyBodySchema } from "propx-models/schemas";

/**
 * Validate request body data
 */
export const validatePropertyPostBody = async (
  ctx: Koa.Context,
  next: Koa.Next
) => {
  try {
    propertyBodySchema.validateSync(ctx.request.body);
  } catch {
    ctx.response.status = HTTP_STATUS_BAD_REQUEST;
    return;
  }
  return next();
};
