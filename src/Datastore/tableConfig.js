import React from 'react';

const TableConfig = 
{
  rowSelection: true,
  columns: [
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
        renderer: (args)=>{
            const {key, data} = args;
            const {id, changeHandler} = data;
            const value = data[key];
        return (<input data-id={id}  value={value} onClick={val => changeHandler({event:val, id:id, key:key})}/>)
        }
      }
    },
    {
        name: 'Value',
        key: 'variablevalue',
        cell: {
          renderer: (args)=>{
              const {key, data} = args;
              const {id, changeHandler} = data;
              const value = data[key];
          return (<input data-id={id}  value={value} onClick={val => changeHandler({event:val, id:id, key:key})}/>)
          }
        }
    }
  ]
};
export default TableConfig;