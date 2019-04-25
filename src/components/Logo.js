import React from 'react';

const Logo = ({title, img}) => {
    return (
        <div className="logo">
            <img className="" src={img}/>
            <label >
                {title}
            </label>
        </div>
        
    )
}

export default Logo;