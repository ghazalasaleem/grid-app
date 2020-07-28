import React from 'react';
import {RiInformationLine} from 'react-icons/ri';

const Info = props =>{

    const {dataList, onClick} = props;
    const data = dataList.data;
    
    return (<div  data-toggle="tooltip" title="Info"
        className="pad-l5 vertical-middle cursor-pointer"
        data-id={data.id} onClick={e => onClick({e, dataList})}>
        <RiInformationLine/>
    </div>);
};

export default Info;