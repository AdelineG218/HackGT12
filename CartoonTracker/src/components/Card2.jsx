import './Card.css'
import { Link } from 'react-router-dom'

const Card2 = (props) =>  {
  return (
      <div className="Card">
          <h2 className="name">{props.name}</h2>
          <p className='watched'>Genre: {props.genre}</p>
          <h4 className='watched'>Rating: {props.average_rating}/10 Stars</h4>
          
          {props.desc && <p className='description'>Description: {props.desc}</p>}

          <Link to={'/new'}
            state={{name: props.name,
                    genre: props.genre,
                    average_rating: props.average_rating,
                    desc: props.desc,
                    image: props.image,
                    user_rating: ""}}>
                    <button>Add to My Shows</button>
          </Link>
      </div>
  );
};

export default Card2