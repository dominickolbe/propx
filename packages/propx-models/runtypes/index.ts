import * as rt from "runtypes";

export const RtPropertyCreate = rt.Record({
  address: rt.String,
  image: rt.String,
  price: rt.Number,
});

export const RtProperty = rt.Record({
  _id: rt.String,
  address: rt.String,
  image: rt.String,
  price: rt.Number,
  updatedAt: rt.String,
  createdAt: rt.String,
});

export const RtPropertyArr = rt.Array(RtProperty);
