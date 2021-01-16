import React from 'react';
import { topicAnalytics } from '../store/data';

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
            <ul>
                {topicAnalytics.map((eachTopic, i) => {
                    return (
                        <li key={i}>
                            {childName} has improved their proficiency in {eachTopic.label} by {eachTopic.lastWeekChange} since last week and {eachTopic.lastMonthChange} since last month
                        </li>
                    );
                })}
            </ul>
        </>
    );
}

export default PerformanceSummary;
