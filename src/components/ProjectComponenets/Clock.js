import React , { useRef } from "react";
import './Clock.css'



function Clock(props){
    const hours = useRef(null);
    const minutes = useRef(null);
    const seconds = useRef(null);

    let timer
    let timerTracker = 0;
    function timerInterval(){
        if(Number(seconds.current.innerHTML) === 59 && Number(minutes.current.innerHTML) === 59){
            hours.current.innerHTML = Number(hours.current.innerHTML)+ 1;
            minutes.current.innerHTML = 0;
            seconds.current.innerHTML = 0;
        }else if(Number(seconds.current.innerHTML) === 59){
            minutes.current.innerHTML = Number(minutes.current.innerHTML)+ 1;
            seconds.current.innerHTML = 0;
        }else{
            seconds.current.innerHTML = Number(seconds.current.innerHTML)+ 1;
        };
    }
    
    function startButtoncClick(){
        if(timerTracker === 0){
            timerTracker = 1;
            timer = setInterval(timerInterval, 1000);
            
        }else{};
    };

    function stopButtonClick(){
        clearInterval(timer);
        timerTracker = 0;
        let newData = {
            hours: hours.current.innerHTML,
            minutes: minutes.current.innerHTML,
            seconds: seconds.current.innerHTML
          }
          fetch(`https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects/${props.id}/projectTimer/hours.json`,{method: 'PUT',body: JSON.stringify(newData.hours)});
          fetch(`https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects/${props.id}/projectTimer/minutes.json`,{method: 'PUT',body: JSON.stringify(newData.minutes)});
          fetch(`https://react-test-708d5-default-rtdb.europe-west1.firebasedatabase.app/projects/${props.id}/projectTimer/seconds.json`,{method: 'PUT',body: JSON.stringify(newData.seconds)});
    };
    return (
        <div className="clock-container" >
            <div className="clock">
                <h1 className="hours" ref={hours}>{props.hours}</h1>
                <h1 className="hours-text">h</h1>
                <h1 className="minutes" ref={minutes}>{props.minutes}</h1>
                <h1 className="minutes-text">m</h1>
                <h1 className="seconds" ref={seconds}>{props.seconds}</h1>
                <h1 className="seconds-text">s</h1>
            </div>
            <div className="buttons-container">
                <button className="start" onClick={startButtoncClick} >START</button>
                <button className="stop" onClick={stopButtonClick}>STOP</button>
            </div>
        </div>


    );
}

export default Clock;