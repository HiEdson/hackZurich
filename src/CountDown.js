import React from "react";
import './countDown.css'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const CountDown=(props)=>{
    let dur = props.time;
    return(
       <div className='countEl'>

            <CountdownCircleTimer
                isPlaying
                duration={dur}
                colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}
                size={140}
            >
                {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            <p>Time to the problem accur</p>
       </div>

    )
}



export default CountDown;