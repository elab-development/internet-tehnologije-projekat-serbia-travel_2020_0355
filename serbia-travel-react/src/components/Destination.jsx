import React from 'react'

export default function Destination({ name, image }) {
    return (
        <div className="destination">
          <div className="image">
            <img src={image} alt="destinations" />
          </div>
          <div className="name">
            <h3>{name}</h3>
          </div>
        </div>
      );
    };
