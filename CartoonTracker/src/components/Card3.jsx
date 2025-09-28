import './Card.css'
import { Link } from 'react-router-dom'
import React from 'react';

const Card3 = (props) =>  {
  return (
      <div className="Card">
          <h2 className="name">{props.name}</h2>
          
          {props.desc && <p className='description'>Description: {props.desc}</p>}

          <Link to={'/new'}
            state={{name: props.name,
                    desc: props.desc}}>
                    <button>Add to My Shows</button>
          </Link>
      </div>
  );
};

export default Card3