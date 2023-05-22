import { api } from "./_graphQL";
import { Continent } from "../@types";
import { worldRequest } from "./worldRequest";

type CallOrigin = "ssr" | "csr";

export const worldAPI = {
  getContinents: async (type: CallOrigin): Promise<Continent[]> => {
    if (type === "csr") console.log("worldAPI.getContinents");

    const continents = (
      await api[type].query({
        query: worldRequest.getContinents,
      })
    ).data.continents as Continent[];

    return continents;
  },
};
