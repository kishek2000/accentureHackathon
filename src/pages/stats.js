import React, { useState } from 'react';
import LineChart from '../components/LineChart';
import BarChart from '../components/BarChart';
import PerformanceSummary from '../components/PerformanceSummary';
import { useRouter } from 'next/router';
import { Container, Row, Col } from 'react-grid-system';
  
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
            
            <Container>
                <Row>
                    <Col sm={6}>
                        <LineChart 
                            category={"numbers"}
                            timeResolution={timespan}
                        />
                    </Col>
                    <Col sm={6}>
                        <BarChart />
                    </Col>
                </Row>
            </Container>
            
            <PerformanceSummary childName={childName} />

            <div>
                <a href="http://localhost:3000/stats?timespan=week&childName=Adi">Last 7 Days</a>
            </div>
            <div>
                <a href="http://localhost:3000/stats?timespan=month&childName=Adi">Last 30 Days</a>
            </div>
            <div>
                <a href="https://www.google.com">Last 365 Days</a>
            </div>
            <p>
                NOTE: Proficiency = (difficulty rating * accuracy) / time spend 
            </p>
        </div>
    );
}

export default Stats;
