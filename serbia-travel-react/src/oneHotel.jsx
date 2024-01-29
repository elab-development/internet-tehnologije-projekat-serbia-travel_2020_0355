import React from 'react'

const OneHotel = () => {
    return (
        <div className='card'>
            <img className='card-img' src="https://picsum.photos/200"  alt="Hotel" />
            <div className='card-body'>
                <h3 className='card-title'>
                    Hotel Name
                </h3>
                <div className='card-info'>
                    <p className='card-stars'>5 stars</p>
                    <p className='card-destination'>Pozarevac</p>
                </div>
            </div>
        </div>
    )
}

export default OneHotel;