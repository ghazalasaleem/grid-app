import React from 'react';
const GridCell = props =>{

    const {cellData, data} = props;
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
        return (<div className="table-cell" key={id} data-id={id} data-key={key}>{cellDOM}</div>);
};

export default GridCell;