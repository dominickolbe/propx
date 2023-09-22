import multer from "@koa/multer";
import { nanoid } from "nanoid";
import { IMAGE_PATH_PRE_HASH_LENGTH } from "../constants";
import { IncomingMessage } from "http";

/**
 * Returns the process uptime
 * @return {number} The return value type is in seconds
 */
export const getProcessUptime = () => Math.floor(process.uptime());

/**
 * Helper function to 'simulate' a sleep
 * @param {number} duration in milliseconds
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Returns a unique hash with given length
 * @return {string} value
 */
export const generateUniqueHash = (length: number) => nanoid(length);

export const setupStorage = () =>
  multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads"),
    filename: (req, file, cb) =>
      cb(
        null,
        generateUniqueHash(IMAGE_PATH_PRE_HASH_LENGTH) + "_" + file.originalname
      ),
  });

export const validateFileType = (
  req: IncomingMessage,
  file: multer.File,
  cb: any
) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpg" ||
    file.mimetype == "image/jpeg"
  ) {
    cb(null, true);
  } else {
    return cb(new Error("Invalid mime type"), false);
  }
};
