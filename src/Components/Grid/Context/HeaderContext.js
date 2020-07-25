import React from 'react'

const HeaderContext = React.createContext([]);

export const HeaderProvider = HeaderContext.Provider;
export const HeaderConsumer = HeaderContext.Consumer;

export default HeaderContext