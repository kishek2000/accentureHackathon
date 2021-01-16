import React from 'react';
import { topicAnalytics } from '../store/data';

{
    courses: [
        {
            name: "Shapes",
            lessonStats: [
                {
                    attempts: [
                        {
                            time: 5.55,
                            accuracy: 0.78
                        },
                        {
                            time: 6.55,
                            accuracy: 0.88
                        },
                        {
                            time: 5.25,
                            accuracy: 0.68
                        }
                    ]
                }
            ]
        }
    ]
}

const PerformanceSummary = ({ childName }) => {
    return (
        <>
            <ul>
                {topicAnalytics.map((eachTopic, i) => {
                    return (
                        <li key={i}>
                            {childName} has improved their proficiency in {eachTopic.label} by {eachTopic.lastWeekChange} since last week and {eachTopic.lastMonthChange} since last month
                        </li>
                    );
                })}
            </ul>
            <h2>Performance Breakdown</h2>
            <p>
                [Auto-generated sentences based on last month's statistics]
            </p>
        </>
    );
}

export default PerformanceSummary;
