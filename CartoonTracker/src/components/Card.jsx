import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'

const Card = (props) =>  {
  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h4 className='author'>{props.type}</h4>
          <p className="description">Speed: {props.speed}</p>
          <p className="description">Strength: {props.strength}</p>
          <p className='description'>Has Magic: {props.magic ? "Yes" : "No"}</p>
      </div>
  );
};

export default Card