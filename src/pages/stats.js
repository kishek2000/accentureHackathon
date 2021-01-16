import React, { useState } from 'react';
import LineChart from '../components/LineChart';
import { useRouter } from 'next/router'

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
const Stats = () => {
    const router = useRouter();
    const { childName } = router.query;
    const { timespan } = router.query;

    const [res, setRes] = useState("week");
    let timeResolution = "month";

    return (
        <div>
            <div className='header'>
                <h1 
                    style={{textAlign: "center"}} 
                    className='title'>
                    {childName}'s progress
                </h1>
            </div>
			<LineChart 
                category={"numbers"}
                timeResolution={timespan}
            />
            <div>
                <a href="http://localhost:3000/stats?timespan=week&childName=Adi">Last 7 Days</a>
            </div>
            <div>
                <a href="http://localhost:3000/stats?timespan=month&childName=Adi">Last 30 Days</a>
            </div>
            <div>
                <a href="https://www.google.com">Last 365 Days</a>
            </div>
        </div>
    );
}

export default Stats;
