import React, { useEffect, useState } from 'react';
import './Grid.css'
import GridRow from './GridRow';
import GridToolbar from './GridToolbar';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';
import AppModal from './AppModal';

const Grid = props => {

    const {headers, tableData, newRow} = props;
    const [contentHeader, setContentHeader] = useState(headers);
    const [content, setContent] = useState([]);
    const [sortCol, setSortCol] = useState("");
    const [sortOrderAsc, setSortOrderAsc] = useState(true);
    const [modalData, setModalData] = useState(null)
    const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
    const[customCols, setCustomCols] = useState([]);

    useEffect(() =>{
        
        const sortableCol = headers.find(prop => prop.sort);
        const colName = sortableCol?sortableCol.name.toLowerCase():"";
        setSortCol(colName);
        setSortOrderAsc(true);
        
        setContent([...sortContentList(tableData, colName)]);
        setCustomCols(Array.from(headers,obj=> obj.name.toLowerCase()));
    },[tableData, headers]);

    useEffect(() =>{
        const data = [...tableData];
        const headerList = [...headers];
        let customData = [];
        data.map(item=>{
            let propList =[];
            item.map((prop)=>{
                if(customCols.find(col => col === prop.name)){
                    propList.push(Object.assign({visible: true},{...prop}));
                }
                else{
                    propList.push(Object.assign({visible: false},{...prop}));
                }
            });
            customData.push([...propList]);
        });
        setContent([...sortContentList(customData, sortCol)]);

        headerList.map(item =>{
            if(customCols.find(col => col === item.name.toLowerCase())){
                item.visible = true;
            }
            else{
                item.visible = false;
            }
        });

        setContentHeader(headerList);
    },[customCols.length]);

    const sortContentList = (list, key) =>{
        return key?(list.sort((a,b) => {
            let aVal = a.find(prop => prop.name === key).value.toLowerCase();
            let bVal = b.find(prop => prop.name === key).value.toLowerCase();
            if(aVal < bVal) return -1;
            else if(aVal > bVal) return 1;
            else return 0;

        })):[];
    };

    const handleSort = (event, key) =>{
        const sortKey = key? key.toLowerCase():'';
        let  sortOrder = sortOrderAsc;
        let tableContent =[...content];
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
            tableContent = sortContentList(tableContent, sortKey);
            if(!sortOrder){
                tableContent.reverse();
            }
            setContent([...tableContent]);      
        }
    };
    const handleRowDelete = (e) =>{
        const index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
        if(index >= 0){
            let tableContent = [...content];
            tableContent.splice(index, 1);
            setContent([...tableContent]); 
        }               
    };
    const handleRowCopy = (e) =>{
        let index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
        if(index && parseInt(index) >= 0){
            index = parseInt(index);
            let copyRow =JSON.parse(JSON.stringify([...content][index]));
            copyRow.map((prop) =>{
                if(prop.name === "name") {
                    prop.key = "CC"+prop.key;
                    prop.value = "Copy of "+prop.value;
                }
            })
            let tableContent = [...content];
            tableContent.splice(++index,0,copyRow);
            setContent([...tableContent]);
        }
    };
    const handleRowInfo = (e) =>{
        let index = e.currentTarget?e.currentTarget.getAttribute('data-id'):null;
        if(index && parseInt(index) >= 0) {
            index = parseInt(index);
            let rowName =[...content][index].find(prop => prop.name === "name").value;
            setIsInfoModalVisible(true);
            setModalData(rowName);
        }
    };
    const handleAddRow = e =>{
        let dataList = [...content];
        dataList.splice(0,0,newRow);
        setContent([...sortContentList(dataList, sortCol)]);
    };
    const handleShowCols = e=>{
        const options = e.currentTarget.options;
        let value = [];
        for (var i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        setCustomCols(value);
    }
    return(
        <React.Fragment>
    <div className="large-table table-container">
        
        {headers && headers.length && (
            <React.Fragment>
            <GridToolbar showAddnew={true} showSort={false} showHide={true} headers={headers} handleHideColmns={handleShowCols} selectedList={customCols} handleAdd={handleAddRow}></GridToolbar>
            <div className="table-header table-row">
                {contentHeader.map(header =>{
                    const rowClass = "table-cell"+ (header.sort?" cursor-pointer":"");
                    const cellDom = header.visible !== false?
                    (<div className={rowClass} key={header.key} data-title={header.name.toLowerCase()} onClick={e => handleSort(e,header.name)}>{header.name}
                    {header.sort?<div className="pad-l5 vertical-middle">{sortOrderAsc?<FiArrowDown/>:<FiArrowUp/>}</div>:''}</div>
                ):"";
                    return cellDom;
                    
                    })}
            </div>
            </React.Fragment>
        )}
        {content && content.length && (
            <div className="table-body">
                {content.map((data,index) =>{
                    return (<GridRow 
                        data={data}
                        key={index}
                        index={index}
                        handleRowDelete={handleRowDelete}
                        handleRowCopy={handleRowCopy}
                        handleRowInfo={handleRowInfo}>

                        </GridRow>);
                })
                }
            </div>
            
        )}
    </div>
    {modalData && isInfoModalVisible && (
     <AppModal data={modalData}></AppModal>   
    )}
    </React.Fragment>
    );
}

export default Grid;