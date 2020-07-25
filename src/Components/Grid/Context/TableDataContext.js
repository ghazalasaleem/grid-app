import React from 'react'

const TabDataContext = React.createContext([]);

export const TabDataProvider = TabDataContext.Provider;
export const TabDataConsumer = TabDataContext.Consumer;

export default TabDataContext