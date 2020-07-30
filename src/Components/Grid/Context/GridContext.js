import { createContext } from 'react'

const GridContext = createContext({
    sortCol: "",
    sortOrderAsc: true,
    activePage: 1,
    rowsPerPage: 0,
    totalRows: 0,
    rowSelection: false
});

export const GridProvider = GridContext.Provider;
export const GridConsumer = GridContext.Consumer;

export default GridContext;