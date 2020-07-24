import React, { useEffect, useState } from 'react';
import './Grid.css'
import GridRow from './GridRow';
import GridHeader from './GridHeader';
// import AppModal from './../AppModal';
// import { render } from '@testing-library/react';

const Grid = props => {

    const {configData, dataList, selectCallback, sortRowCallback} = props;
    const [renderList, setRenderList] = useState([]);
    const [headerList, setHeaderList] = useState([]);
    const [content, setContent] = useState([]);
    const [sortCol, setSortCol] = useState("");
    const [sortOrderAsc, setSortOrderAsc] = useState(true);
    const [rowSelection, setRowSelection] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows]  = useState([]);
 

    useEffect(()=>{
        let headerL = [], renderL = [];
        if(configData.columns){
        configData.columns.map((row)=>{
            headerL.push({
                name: row.name,
                key: row.key,
                sort: row.sort,
                show: true
            });
            renderL.push({
                key: row.key,
                cell: row.cell
            });
        });
    }
        let dl = dataList && dataList.length?[...dataList]:[];
        dl.map(obj=>{obj.selected = false});
        setHeaderList([...headerL]);
        setRenderList(renderL); 
        setContent([...dl]);
        setRowSelection(configData.rowSelection);   
    },[configData, dataList]);

    useEffect(()=>{
        let dataL = JSON.parse(JSON.stringify(content));
        dataL.map((data)=>{
            data.selected = selectAll;
        });
        setContent([...dataL]);
    },[selectAll]);

    useEffect(()=>{
        if(selectCallback) selectCallback(selectedRows);
    },[selectedRows]);

    useEffect(()=>{
        setSelectedRows(getSelectedRows());
    },[content]);

    const handleRowSelection = (e, id) =>{
        if(e && e.currentTarget){
            const selectAllFlag = e.currentTarget.checked;
            if(id){
                let dataL = JSON.parse(JSON.stringify(content));
                dataL.map((data)=>{
                    if(data.id === id) data.selected = selectAllFlag;
                });
            setContent([...dataL]);
            }
            else{
                setSelectAll(selectAllFlag);
            }
        }
    };

    const handleSort = (e, key) =>{
        const sortKey = key? key.toLowerCase():'';
        let  sortOrder = sortOrderAsc;
        if(sortKey){
            if(sortKey !== sortCol) {
                setSortCol(sortKey);
                sortOrder = true;
                setSortOrderAsc(sortOrder);                
            } 
            else{
                sortOrder = !sortOrderAsc;
                setSortOrderAsc(sortOrder);
            } 
            sortRowCallback({key: sortKey, order: sortOrder?'asc':'desc'});      
        }
    };

    const getSelectedRows = () =>{
        let selectedList = [];
        content.map(data=>{
            if(data.selected) selectedList.push(JSON.parse(JSON.stringify(data)));
        });

        return selectedList;
    };

    return(
        <React.Fragment>
            <div className="large-table table-container">
                {headerList && headerList.length && (
                <React.Fragment>
                <div className="table-header table-row">
                    {
                        rowSelection && 
                        (<div className="table-cell chkCol">
                            <input type="checkbox" className="" checked={selectAll} onChange={(e)=>{handleRowSelection(e)}}/>
                        </div> )
                    }
                    {headerList.map(header =>{
                        const rowClass = (header.sort && header.sort.active?" cursor-pointer":" events-none");
                        return header.show?
                            <GridHeader key={header.key} header={header} rowClass={rowClass} handleSort={handleSort} sortCol={sortCol} sortOrderAsc={sortOrderAsc}></GridHeader>:"";
                    })}
                </div>
                </React.Fragment>
                )}
                {content && content.length && (
                    <div className="table-body">
                        {content.map((data) =>{
                            return (<GridRow data={data} key={data.id} renderList={renderList} rowSelection={rowSelection} handleRowSelection={handleRowSelection}></GridRow>);
                        })}
                    </div>            
                )}
            </div>
        </React.Fragment>
    );
}

export default Grid;