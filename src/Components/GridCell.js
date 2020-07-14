import React from 'react';
import {RiDeleteBin6Line, RiInformationLine, RiFileCopyLine} from 'react-icons/ri';

const GridCell = props => {

    const {name, value, type, optionList} = props.cellData;
    const {index, changeHandler, handleRowDelete, handleRowCopy, handleRowInfo} = props; 

    switch(type){
        case "textbox": return (<input name={name} value={value} onChange={val => changeHandler(val)}/>);
    case "select": return(<select name={name} value={value} onChange={val => changeHandler(val)}>{
        optionList.map(element => {
            return(<option key={element.key} value={element.key}>{element.value}</option>);
        })}</select>);
        case 'action': return(
        <React.Fragment>
            <div data-toggle="tooltip" title="Delete" className="pad-l5 vertical-middle cursor-pointer" data-id={index} onClick={e => handleRowDelete(e)}> 
                <RiDeleteBin6Line/>
            </div>
            <div  data-toggle="tooltip" title="Copy" className="pad-l5 vertical-middle cursor-pointer" data-id={index} onClick={e => handleRowCopy(e)}>
                <RiFileCopyLine/>
            </div>
            <div  data-toggle="tooltip" title="Info" className="pad-l5 vertical-middle cursor-pointer" data-id={index} onClick={e => handleRowInfo(e)}>
                <RiInformationLine/>
            </div>
        </React.Fragment>);
        default: return (<label>{value}</label>);
    }
}

export default GridCell;