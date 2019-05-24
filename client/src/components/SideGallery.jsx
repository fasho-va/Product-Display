import React from 'react';
import Slider from "react-slick";

const imageStyle = {
    margin: '1rem',
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
                {props.images.map((element, index) => {
                    return <img onClick={()=> {props.slider.slickGoTo(index)}} src={element}></img>
                })}
            </Slider>
    </div>
    )
}

export default SideGallery