import React, { useEffect, useState } from 'react';
import './Grid.css'
import GridRow from './GridRow';
import GridHeader from './GridHeader';
import {GridProvider} from './Context/GridContext';
import GridFooter from './GridFooter';

const Grid = props => {

    const {configData, dataList, selectCallback, sortRowCallback, paginationCallback} = props;
    const [renderList, setRenderList] = useState([]);
    const [headerList, setHeaderList] = useState([]);
    const [content, setContent] = useState([]);
    const [sortCol, setSortCol] = useState("");
    const [sortOrderAsc, setSortOrderAsc] = useState(true);
    const [rowSelection, setRowSelection] = useState(false);
    const [selectAll, setSelectAll] = useState(false);
    const [selectedRows, setSelectedRows]  = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [defaultSort, setDefaultSort] = useState({});
 
    useEffect(()=>{
        let headerL = [], renderL = [];
        if(configData.columns){
            configData.columns.map((row)=>{
                if(!defaultSort || !defaultSort.col){
                    if(row.sort && row.sort.default && row.sort.active){
                        setDefaultSort({col: row.key, order: row.sort.order})  
                        setSortCol(row.key);
                        setSortOrderAsc(row.sort.order === 'asc'?true:false);
                    }
                }
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

    useEffect(()=>{
        if(paginationCallback) paginationCallback(activePage);
    },[activePage]);

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

    const pageChangeHandler = (pageNo) =>{
        // console.log('selected pg no -', pageNo);
        setActivePage(pageNo);
        setSortCol(defaultSort.col);
        setSortOrderAsc(defaultSort.order === 'asc'? true: false);
    }

    const getSelectedRows = () =>{
        let selectedList = [];
        content.map(data=>{
            if(data.selected) selectedList.push(JSON.parse(JSON.stringify(data)));
        });

        return selectedList;
    };

    return(
        <React.Fragment>
            <GridProvider value={{
                sortCol: sortCol,
                sortOrderAsc: sortOrderAsc,
                activePage: activePage,
                rowsPerPage: configData.rowsPerPage,
                totalRows: configData.totalRows,
                rowSelection: rowSelection,
                pageRange: configData.pageRange,
                handleSort:handleSort,
                handleRowSelection: handleRowSelection,
                onPageChange: pageChangeHandler
            }}>
            <div className="large-table table-container">
                {headerList && headerList.length && (
                    <div className="table-header table-row">
                        {
                            rowSelection && 
                            (<div className="table-cell chkCol">
                                <input type="checkbox" className="" checked={selectAll} onChange={(e)=>{handleRowSelection(e)}}/>
                            </div> )
                        }
                        <GridHeader headerList={headerList}></GridHeader>
                    </div>
                )}
                {content && content.length && (
                    <div className="table-body">
                        {content.map((data) =>{
                           return ( 
                                <GridRow data={data} key={data.id} renderList={renderList}></GridRow>                            
                           );
                        })}
                    </div>        
                )}
                {configData.pagination && (
                    <GridFooter></GridFooter>
                )}                
            </div>
            </GridProvider>
        </React.Fragment>
    );
}

export default Grid;