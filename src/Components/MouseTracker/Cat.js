 import React from 'react';
 import catImg from '../../Resources/cat.jpg';
 
 const Cat = props =>{
  
    const mouse = props.mouse;
    return (
    <img src={catImg} alt="cat" style={{ height:'150px', width: '150px', position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }

  export default Cat;