import React, { useState, useEffect} from 'react';
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

  useEffect(()=>{

    setGridData(VariableSrv.getData());
    
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
    setTableConf({...TableConfig});
  },[]);

  useEffect(()=>{
    console.log(GridData);
  },[GridData]);

  const actionRender = (props) =>{
    const {data} = props;
    return (<React.Fragment>
        <Delete data={data} onClick={handleRowDelete}></Delete>
        <Copy data={data} onClick={handleRowCopy}></Copy>
        <Info data={data} onClick={handleRowInfo}></Info>
      </React.Fragment>);
  };

  const textBoxRenderer = (props) =>{
    const {key, data} = props;
    const {id} = data;
    const value = data[key];

    return (<input data-id={id} value={value} onChange={e => handleChange({event:e, data:data, key:key})}/>)
  };

  const handleRowDelete =  args =>{
    let {id} = args.data;
    VariableSrv.deleteData({id})
      .then((response)=>{
        setGridData([...response]);
      })
      .catch(error => {
        console.log(error);
      }); 
  };

  const handleRowCopy = args =>{
    const row = args.data;
    const newRow = Object.assign({...row},{id:null,
      variablename: row.variablename +'(1)'});
    VariableSrv.addNewData({data:newRow})
      .then((response)=>{
        setGridData([...response]);
      })
      .catch(error => {
        console.log(error);
      });
  };
  
  const handleRowInfo = args =>{
    const {data} = args;  
    setIsInfoModalVisible(true);
    setModalData(data);
  };

  const handleChange = args =>{

    const {data, key, event} = args;
    const val = event.currentTarget.value;
    let rowData = {...data};
    rowData[key] = val;
    VariableSrv.updateData({data:rowData})
      .then((response)=>{
        setGridData([...response]);
      })
      .catch(error => {
        console.log(error);
      });

  };

  // sorting logic - either manual or api call.
  const sortContentList = (list, key) =>{
    return key?(list.sort((a,b) => {
        let aVal = a[key].toLowerCase();
        let bVal = b[key].toLowerCase();
        if(aVal < bVal) return -1;
        else if(aVal > bVal) return 1;
        else return 0;

    })):list;
};
  const handleSort = args =>{
    const {key, order} = args;
    let tableContent = [...GridData];
    tableContent = sortContentList(tableContent, key);
    if(order === 'desc'){
        tableContent.reverse();
    }
    setGridData([...tableContent]); 
  };

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
          ></Grid>
      </div>
    {modalData && isInfoModalVisible && (
      <AppModal data={modalData}></AppModal>   
     )}
    </React.Fragment>
  );
}
export default Dashboard;