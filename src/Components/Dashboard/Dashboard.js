import React, { useState, useEffect, createRef, useRef} from 'react';
import Header from '../Header/Header';
import Grid from '../Grid/Grid';
import TableConfig from '../../Datastore/tableConfig';
import VariableSrv from '../../Services/VariableSrv';
import './dashboard.scss';
import AppModal from '../Modal/AppModal';
import Delete from '../Action/Delete';
import Info from '../Action/Info';
import Copy from '../Action/Copy';
import TreeIcon from '../Action/TreeIcon';

const Dashboard = () => {

  const [GridData, setGridData] = useState([]);
  const [TableConf, setTableConf] = useState([]);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  // const [currentPage, setCurrentPage] = useState(1);
  
  const modalRef = createRef();
  const dataList = useRef([]);

  useEffect(()=>{
    let request = {};
    if(TableConfig.pagination){
      request = {
        start: 0,
        count: TableConfig.rowsPerPage
      };
      setRowsPerPage(TableConfig.rowsPerPage);
    }
    VariableSrv.getData(request)
    .then((response)=>{
      if(response && response.totalRows && response.dataList && response.dataList.length){
        mapResponse(response);
      }
    })
    .catch(error => {
      console.log(error);
    });    
  },[]);

  useEffect(()=>{
    dataList.current = [...GridData];
  },[GridData]);

  const actionRender = (props) =>{
    return (
      <React.Fragment>
        <Delete dataList={props} onClick={handleRowDelete}></Delete>
        <Copy dataList={props} onClick={handleRowCopy}></Copy>
        <Info dataList={props} onClick={handleRowInfo}></Info>
      </React.Fragment>);
  };

  const textBoxRenderer = (props) =>{
    const {key, data} = props;
    const {id, hasChild, isChild, parentId} = data;
    const value = data[key];
    let classes = "input-cell", cellDOM;

    if(key === 'variablename' && isChild){
      classes += ' pad-l14';
    }

    if(key === 'variablename' && hasChild){
      classes += " childIcon";
      cellDOM = 
      <div className = {classes}>
        {hasChild?<TreeIcon  dataList={props} onClick={handleSubtree}></TreeIcon>:''}
        <input data-id={id} value={value} onChange={e => handleChange({event:e, ...props})}/>
      </div>;
    }
    else{
      cellDOM = 
      <div className={classes}>
        <input data-id={id} value={value} onChange={e => handleChange({event:e, ...props})}/>
      </div>;
    }
    
    return cellDOM;
  };

  const handleSubtree = props =>{
    const {data} = props.dataList;
    if(data.childrenList){
      let childList = Array.from(data.childrenList, child => child.id);
      let tableData = [...dataList.current];

      tableData.map(row =>{
        if(row.id === data.id){
          row.isChildVisible = !row.isChildVisible;
        }
        if(childList.includes(row.id)){
          row.hidden = !row.hidden;
        }
      });
      setGridData([...tableData]);
    }
  };

  const mapCompleteDataList = props =>{
    const data = props.data;
    let dataList =[];
    data.map(row =>{
      if(row && row.childrenList && row.childrenList.length){
        dataList.push({...row, hasChild: true, isChildVisible: false});
        row.childrenList.map((child) =>{
          dataList.push({...child, isChild: true, hidden: true, parentId: row.id});
        });
      }
      else{
        dataList.push({...row, hasChild: false});
      }
    });

    setGridData([...dataList]);
  }

  const mapResponse = response =>{
    const list = {...TableConfig};
    list.columns.map((row)=>{
      if(row.type === 'action'){
        row.cell = {
          renderer: actionRender
        }
      }
      else if(row.type === 'textBox'){
        row.cell = {
          renderer: textBoxRenderer
        }
      }
    });
    setTableConf(Object.assign({...list},{totalRows: response.totalRows}));
    mapCompleteDataList({data:response.dataList});
  };

  const handleRowDelete =  args =>{
    let {id, parentId, isChild} = args.dataList.data;
    let {activePage} = args.dataList
    let request ={
      id:id
    };
    if(isChild){
      request.parentId = parentId;

    }
    if(TableConfig.pagination){
      request.start = (activePage-1)* TableConfig.rowsPerPage;
      request.count = TableConfig.rowsPerPage;
    }
    VariableSrv.deleteData(request)
      .then((response)=>{
        mapResponse(response);
      })
      .catch(error => {
        console.log(error);
      }); 
  };

  const handleRowCopy = args =>{
    const {data, activePage} = args.dataList;
    const {parentId, isChild} = data;
    const newRow = Object.assign({...data},{id:null,
      variablename: data.variablename +'(1)'});
    
    let request ={
      data:newRow
    };
    if(isChild){
      request.parentId = parentId;
    }
    if(TableConfig.pagination){
      request.start = (activePage-1)* TableConfig.rowsPerPage;
      request.count = TableConfig.rowsPerPage;
    }
    VariableSrv.addNewData(request)
      .then((response)=>{
        mapResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleRowInfo = args =>{
    const {data} = args.dataList;  
    setIsInfoModalVisible(true);
    setModalData(data);
  };

  const handleChange = args =>{
    const {data, key, event, activePage} = args;
    const val = event.currentTarget.value;
    const {parentId, isChild} = data
    let rowData = {...data};
    rowData[key] = val;

    let tableData = [...dataList.current];

    tableData.map(row =>{
          if(row.id === rowData.id){
              row.variablevalue = rowData.variablevalue;
              row.variablename = rowData.variablename;
              row.variabletype = rowData.variabletype;
          }
      }); 
  setGridData([...tableData]);
    let request ={
      data: rowData
    };
    if(isChild){
      request.parentId = parentId;
    }
    if(TableConfig.pagination){
      request.start = (activePage-1)* TableConfig.rowsPerPage;
      request.count = TableConfig.rowsPerPage;
    }
    setTimeout(setData, 3000, request);
  };

  const setData = request =>{
    VariableSrv.updateData(request)
      .then((response)=>{
        mapResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  const handleSort = args =>{
    const {key, order} = args;
    let tableContent = [...GridData];
    VariableSrv.sortData({key:key , order: order, dataList: tableContent})
    .then((response) =>{
      // setGridData([...response]);
      mapCompleteDataList({data:response});
    })
    .catch(error => {
      console.log(error);
    });
  };

  const handlePagination = pgNo => {
    VariableSrv.getData({start: (pgNo-1)*rowsPerPage, count: rowsPerPage})
    .then((response)=>{
        // setCurrentPage(pgNo);
        // setGridData([...response.dataList]);
        mapCompleteDataList({data:response.dataList});
    })
    .catch(error => {
      console.log(error);
    });
  }
  const handleSelect = args =>{
    // console.log(JSON.stringify(args));
  };

  return (
    <React.Fragment>
      <div className="dashboard">
        {/* <Header></Header> */}
        <Grid 
          configData={TableConf} 
          dataList={GridData} 
          selectCallback= {handleSelect}
          sortRowCallback={handleSort}
          paginationCallback={handlePagination}
          ></Grid>
      </div>
    {modalData && isInfoModalVisible && (
      <AppModal ref={modalRef} data={modalData}></AppModal>   
     )}
    </React.Fragment>
  );
}
export default Dashboard;