import React, { useContext } from 'react';
import GridContext from './Context/GridContext';
const GridCell = props =>{

    const {data, cellData} = props;
    const {key, cell} = cellData;
    const {id} = data;
    const value = data[key];
    const gridCntxt = useContext(GridContext);
    const {activePage} = gridCntxt;
    let cellDOM;
    
    if(cell && typeof cell.renderer === "function"){
        cellDOM= cell.renderer({data: data, key: key, activePage: activePage});
    }
    else{
        cellDOM=<label>{value}</label>;
    }
    return (<div className="table-cell"  data-id={id} data-title={key}>{cellDOM}</div>);
};

export default GridCell;