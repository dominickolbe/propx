import mongoose from "mongoose";
import { MONGO_HOST } from "../../config";
import { createErr, createOk } from "option-t/cjs/PlainResult";

const options = {
  useNewUrlParser: true,
  retryWrites: true,
};

export const Database = {
  connect: async () => {
    console.log("[Info]: (mongo) connecting ...");
    try {
      const connection = await mongoose.connect(MONGO_HOST, options);
      console.log("[Info]: (mongo) successfully connected");
      return createOk(connection);
    } catch (error) {
      console.log("[Error]: (mongo) connection failed");
      return createErr(error);
    }
  },
  disconnect: async () => {
    console.log("[Info]: (mongo) close connection ...");
    return mongoose.disconnect();
  },
};
