import React, { createContext } from 'react'

const SortColCntxt = React.createContext("");
const SortOrderAscCntxt = createContext(true);

export const SortColProvider = SortColCntxt.Provider;
export const SortColConsumer = SortColCntxt.Consumer;

export const SortOrderAscProvider = SortOrderAscCntxt.Provider;
export const SortOrderAscConsumer = SortOrderAscCntxt.Consumer;

export {
    SortColCntxt,
    SortOrderAscCntxt
};