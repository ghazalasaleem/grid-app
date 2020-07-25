import React, { useContext } from 'react';
import TabDataContext from './Context/TableDataContext';

const GridCell = props =>{

    const {rowId, cellData} = props;
    const dataL = useContext(TabDataContext);
    const data =dataL.find(row => row.id === rowId);

    const {key, cell} = cellData;
    const {id} = data;
    const value = data[key];
    let cellDOM;
    
    if(cell && typeof cell.renderer === "function"){
        cellDOM= cell.renderer({data: data, key: key});
    }
    else{
        cellDOM=<label>{value}</label>;
    }
    return (<div className="table-cell"  data-id={id} data-title={key}>{cellDOM}</div>);
};

export default GridCell;