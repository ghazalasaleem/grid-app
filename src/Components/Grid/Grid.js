import React, { useEffect, useState, createContext } from 'react';
import './Grid.css'
import GridRow from './GridRow';
import GridHeader from './GridHeader';
import {HeaderProvider} from './Context/HeaderContext';
import {TabConfProvider} from './Context/TableConfContext';
import {TabDataProvider} from './Context/TableDataContext';
import {SortColProvider, SortOrderAscProvider} from './Context/GridContext';


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
                <HeaderProvider value={headerList}>
                <SortColProvider value={sortCol}>
                <SortOrderAscProvider value={sortOrderAsc}>
                    <div className="table-header table-row">
                        {
                            rowSelection && 
                            (<div className="table-cell chkCol">
                                <input type="checkbox" className="" checked={selectAll} onChange={(e)=>{handleRowSelection(e)}}/>
                            </div> )
                        }
                        <GridHeader handleSort={handleSort}></GridHeader>
                    </div>
                </SortOrderAscProvider>
                </SortColProvider>
                </HeaderProvider>
                </React.Fragment>
                )}
                <TabConfProvider value={renderList}>
                {content && content.length && (
                    <TabDataProvider value={content}>
                    <div className="table-body">
                        {content.map((data) =>{
                           return ( 
                                <GridRow key={data.id}
                                    rowId={data.id}
                                    rowSelection={rowSelection}
                                    handleRowSelection={handleRowSelection}>
                                </GridRow>                            
                           );
                        })}
                    </div>  
                    </TabDataProvider>          
                )}
                </TabConfProvider>
            </div>
        </React.Fragment>
    );
}

export default Grid;