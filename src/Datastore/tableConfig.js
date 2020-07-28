const TableConfig = 
{
  pagination: true,
  totalRows: 0,
  rowsPerPage: 3,
  rowSelection: true,
  pageRange: 5,
  columns: [
    {
      name: 'Name',
      key: 'variablename',
      type: 'textBox',
      sort: {
        default: true,
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