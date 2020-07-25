import React from 'react'

const TabConfContext = React.createContext([]);

export const TabConfProvider = TabConfContext.Provider;
export const TabConfConsumer = TabConfContext.Consumer;

export default TabConfContext