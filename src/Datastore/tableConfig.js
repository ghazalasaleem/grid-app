import React from 'react';
import {RiDeleteBin6Line, RiInformationLine, RiFileCopyLine} from 'react-icons/ri';

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
        return (<input data-id={id}  value={value} onChange={val => changeHandler({event:val, id:id, key:key})}/>)
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
          return (<input data-id={id}  value={value} onChange={val => changeHandler({event:val, id:id, key:key})}/>)
          }
        }
    },
    {
      name: 'Action',
      key: 'variableaction',
      cell: {
        renderer: (args)=>{
          const {data} = args;
          const {id, handleRowDelete, handleRowCopy, handleRowInfo} = data;
          return (
            <React.Fragment>
              <div data-toggle="tooltip" title="Delete" className="pad-l5 vertical-middle cursor-pointer" data-id={id} onClick={e => handleRowDelete(e)}> 
                <RiDeleteBin6Line/>
              </div>
              <div  data-toggle="tooltip" title="Copy" className="pad-l5 vertical-middle cursor-pointer" data-id={id} onClick={e => handleRowCopy(e)}>
                <RiFileCopyLine/>
              </div>
              <div  data-toggle="tooltip" title="Info" className="pad-l5 vertical-middle cursor-pointer" data-id={id} onClick={e => handleRowInfo(e)}>
                <RiInformationLine/>
              </div>
            </React.Fragment>
          );
          }
      }
    }
  ]
};
export default TableConfig;