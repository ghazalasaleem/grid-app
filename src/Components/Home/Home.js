import React, { useEffect, useState } from 'react';
import './Home.scss';


const Home = () =>{

    const [time, setTime] = useState();

    useEffect(()=>{
        const date = new Date();
        const ticking = setInterval(()=>{setTime(date.getHours()+":"+date.getMinutes()+":"+date.getSeconds())}, 1000);

        return ()=> {clearInterval(ticking);}
    });
    return (
        <div className="home-container">
            <h2 className="msg">Hi Human!!</h2>
            <div className="timer">Time: <span>{time}</span></div>
        </div>);
}

export default Home;

{/* <button onClick={()=> setStop(!stop)}>Start/Stop</button> */}
