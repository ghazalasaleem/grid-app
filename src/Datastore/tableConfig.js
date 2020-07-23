import React from 'react';

const TableConfig = 
{
  rowSelection: true,
  columns: [
    {
      name: 'Name',
      key: 'variablename',
      type: 'textBox',
      sort: {
        active: true,
        order: 'asc',
      },
      cell: {}
    },
    {
      name: 'Type',
      key: 'variabletype',
      type: 'textBox',
      sort: {
        active: true,
        order: 'asc',
      },
      cell: {}
    },
    {
        name: 'Value',
        key: 'variablevalue',
        type: 'textBox',
        cell: {}
    },
    {
      name: 'Action',
      key: 'variableaction',
      type: 'action',
      cell: {}
    }
  ]
};
export default TableConfig;