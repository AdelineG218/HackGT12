import './ProgressBar.css'

const ProgressBar = (props) => {
    const percent = props.total_num_episodes > 0 ? props.num_episodes_watched/props.total_num_episodes : 0;

    return (
        <div className="container">
            <div className="progress_bar">
                <div className="progress_bar_fill" style={{width: `${percent*400}px`}}></div>
            </div>
        </div>
    )
}

export default ProgressBar