import React from 'react';
import Slider from "react-slick";

const SideGallery = (props) => {
    return (
        <div className='sideGalleryImg'>
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