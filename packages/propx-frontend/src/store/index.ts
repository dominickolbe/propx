import { create } from "zustand";
import propertiesJson from "../__mock__/properties.json";
import { Property, PropertyArr } from "propx-models/types/index";
import axios from "axios";
import { API_BASE } from "../constants";
import { RtPropertyArr } from "propx-models/runtypes";
import { sleep } from "../utils";

interface PropertyState {
  isLoading: boolean;
  properties: PropertyArr;
  load: () => void;
  add: (property: Property) => void;
}

export const usePropertyStore = create<PropertyState>()((set) => ({
  isLoading: true,
  // properties: propertiesJson,
  properties: [],
  load: async () => {
    await sleep(2000);
    set({ isLoading: true });
    try {
      // const response = await axios.get(`${API_BASE}/api/properties`);
      // const properties = RtPropertyArr.check(response.data);
      set({ properties: propertiesJson, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
  add: (property: Property) =>
    set((state) => ({ properties: [property, ...state.properties] })),
}));
