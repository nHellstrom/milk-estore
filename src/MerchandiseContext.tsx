import React from "react";
import { IMilk } from "./interfaces";

const context = React.createContext<IMilk[]>([]);

export const MerchandiseContextProvider = context.Provider;
export const MerchandiseContextConsumer = context.Consumer;
export const MerchandiseContext = context;