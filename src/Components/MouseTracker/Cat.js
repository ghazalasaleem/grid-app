 import React from 'react';
 
 const Cat = props =>{
  
    const mouse = props.mouse;
    return (
    <img className="catImg" src={require("../../Resources/cat.jpg")} alt="cat" style={{ height:'150px', width: '150px', position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }

  export default Cat;