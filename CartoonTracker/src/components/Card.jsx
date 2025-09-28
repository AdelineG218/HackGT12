import React from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'
import { LinearProgressBar } from '../components/ProgressBar.jsx';

const Card = (props) =>  {
  console.log(props)
  return (
      <div className="Card">
          <Link to={'/show/' + props.id + '/edit'}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <p className='watched'>Genre: {props.genre.join(", ")}</p>
          <div className={props.tv_rating ? 'card_subtitle' : 'watched'}>
=          <div className='card_subtitle'>
            <h4>{props.tv_rating}</h4>
            <h4>Rating: {props.average_rating}/10 Stars</h4>
          </div>
          
          {props.desc && <p className='description'>Description: {props.desc}</p>}
          
          {props.user_rating > 0 ? <div>
            {[...Array(10)].map((_, i) => (
              <span className="star-rating" key={i}>
                {Math.round(i) < props.user_rating ? "⭐" : ""}
              </span>
            ))}
          </div>: <p className="star-rating"> ☆☆☆☆☆☆☆☆☆☆</p>}
          {props.num_episodes_watched != 0 && props.total_num_episodes != 1 && <p className='watched'>Watched: {props.num_episodes_watched}/{props.total_num_episodes}</p>}
          <ProgressBar num_episodes_watched={props.num_episodes_watched}
          <p className='watched'>Watched: {props.num_episodes_watched}/{props.total_num_episodes}</p>
          <LinearProgressBar num_episodes_watched={props.num_episodes_watched}
            total_num_episodes={props.total_num_episodes} />
      </div>
  );
};

export default Card