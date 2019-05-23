import React from 'react';
import Slider from "react-slick";

const imageStyle = {
    padding: '5px',
    width: '67px'
};

const SideGallery = (props) => {
    return (
        <div style={imageStyle} >
            <Slider
                arrows={false}
                dots={false}
                infinite={false}
                speed={500}
                slidesToShow={4}
                slidesToScroll={1}
                verticalSwiping={true}
                vertical={true}
                accessibility={false}
            >
                {props.images.map((element) => {
                    return <img src={element}></img>
                })}
            </Slider>
    </div>
    )
}

export default SideGallery