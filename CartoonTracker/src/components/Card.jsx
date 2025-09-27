import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'

const Card = (props) =>  {
  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <div className='card_subtitle'>
            <h4>{props.tv_rating}</h4>
            <h4>Rating: {props.average_rating}/10 Stars</h4>
            <h4>Watched: {props.num_episodes_watched}/{props.total_num_episodes}</h4>

          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full"
              style={{
                width: `${
                  (props.num_episodes_watched / props.total_num_episodes) * 100
                }%`,
              }}
            ></div>
          </div>
          {props.description && <p className='description'>Description: {props.description}</p>}
          
          {props.user_rating != 0 ? <div>
            {[...Array(10)].map((_, i) => (
              <span className="star-rating" key={i}>
                {Math.round(i) < props.user_rating ? "⭐" : ""}
              </span>
            ))}
          </div>: <p className="star-rating"> "☆☆☆☆☆☆☆☆☆☆"</p>}
      </div>
  );
};

export default Card