import React, { useState, useEffect, createRef} from 'react';
import Header from '../Header/Header';
import Grid from '../Grid/Grid';
import TableConfig from '../../Datastore/tableConfig';
import VariableSrv from '../../Services/VariableSrv';
import './dashboard.css';
import AppModal from '../Modal/AppModal';
import Delete from '../Action/Delete';
import Info from '../Action/Info';
import Copy from '../Action/Copy';

const Dashboard = () => {

  const [GridData, setGridData] = useState([]);
  const [TableConf, setTableConf] = useState([]);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  // const [pagination, setPagination] = useState(false);
  const dashRef = createRef();

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

  // useEffect(()=>{
  //   // console.log(GridData);
  // },[GridData]);

  const actionRender = (props) =>{
    return (<React.Fragment>
        <Delete dataList={props} onClick={handleRowDelete}></Delete>
        <Copy dataList={props} onClick={handleRowCopy}></Copy>
        <Info dataList={props} onClick={handleRowInfo}></Info>
      </React.Fragment>);
  };

  const textBoxRenderer = (props) =>{
    const {key, data} = props;
    const {id} = data;
    const value = data[key];

    return (<input data-id={id} value={value} onChange={e => handleChange({event:e, ...props})}/>)
  };

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
    setGridData([...response.dataList]);
  };

  const handleRowDelete =  args =>{
    let {id} = args.dataList.data;
    let {activePage} = args.dataList
    let request ={
      id:id
    };
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
    const newRow = Object.assign({...data},{id:null,
      variablename: data.variablename +'(1)'});
    
    let request ={
      data:newRow
    };
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
    let rowData = {...data};
    rowData[key] = val;

    let request ={
      data: rowData
    };
    if(TableConfig.pagination){
      request.start = (activePage-1)* TableConfig.rowsPerPage;
      request.count = TableConfig.rowsPerPage;
    }

    VariableSrv.updateData(request)
      .then((response)=>{
        mapResponse(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleSort = args =>{
    const {key, order} = args;
    let tableContent = [...GridData];
    VariableSrv.sortData({key:key , order: order, dataList: tableContent})
    .then((response) =>{
      setGridData([...response]);
    })
    .catch(error => {
      console.log(error);
    });
    setGridData([...tableContent]); 
  };

  const handlePagination = pgNo => {
    VariableSrv.getData({start: (pgNo-1)*rowsPerPage, count: rowsPerPage})
    .then((response)=>{
        setCurrentPage(pgNo);
        setGridData([...response.dataList]);
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
        <Header></Header>
        <Grid 
          configData={TableConf} 
          dataList={GridData} 
          selectCallback= {handleSelect}
          sortRowCallback={handleSort}
          paginationCallback={handlePagination}
          ></Grid>
      </div>
    {modalData && isInfoModalVisible && (
      <AppModal ref={dashRef} data={modalData}></AppModal>   
     )}
    </React.Fragment>
  );
}
export default Dashboard;