import React from 'react'
import './ProgressBar.css'

// Old linear progress bar component, renamed to LinearProgressBar
export const LinearProgressBar = (props) => {
    const percent = props.total_num_episodes > 0 ? props.num_episodes_watched / props.total_num_episodes : 1;
    console.log(percent * 400);
    return (
        <div className="container">
            <div className="progress_bar">
                <div className="progress_bar_fill" style={{ width: `${percent * 400}px` }}></div>
            </div>
        </div>
    );
};

// New circular progress bar component
export const CircularProgressBar = (props) => {
    const { total_num_episodes, num_episodes_watched } = props;

    const percent = total_num_episodes > 0
        ? (num_episodes_watched / total_num_episodes) * 100
        : 100;

    const circumference = 2 * Math.PI * 70;
    const offset = circumference - (percent / 100) * circumference;

    return (
        <div className="circular-progress-bar-container">
            <svg className="circular-progress" width="160" height="160">
                <circle
                    className="progress-bar-background"
                    cx="80"
                    cy="80"
                    r="70"
                />
                <circle
                    className="progress-bar-fill"
                    cx="80"
                    cy="80"
                    r="70"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                />
            </svg>
            <div className="progress-text">
                {Math.round(percent)}%
            </div>
        </div>
    );
};
