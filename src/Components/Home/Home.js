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
            <div >{(typeof(Worker) !=="undefine")?"Your browser supports Web Worker's":""}</div>
        </div>);
}

export default Home;