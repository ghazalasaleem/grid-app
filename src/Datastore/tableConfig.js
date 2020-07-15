import React from 'react';

const TableConfig = 
[
    {
      name: 'Name',
      key: 'variablename',
      sort: {
        active: true,
        order: 'asc',
      },
      cell: {
      }
    },
    {
      name: 'Type',
      key: 'variabletype',
      sort: {
        active: true,
        order: 'asc',
      },
      cell: {
        renderer: function(data){
            const {name, value, changeHandler} = data;
        return (<input  value={value} onClick={val => changeHandler(val)}/>)
        }
      }
    },
    {
        name: 'Value',
        key: 'variablevalue',
        cell: {
        }
    }
  ];
  export default TableConfig;