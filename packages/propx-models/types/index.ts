import mongoose from "mongoose";
import { Static } from "runtypes";
import { RtProperty, RtPropertyArr, RtPropertyCreate } from "../runtypes";

// PROPERTY
export type Property = Static<typeof RtProperty>;
export type PropertyCreate = Static<typeof RtPropertyCreate>;
export type PropertyArr = Static<typeof RtPropertyArr>;

export interface IProperty extends PropertyCreate, mongoose.Document {}
