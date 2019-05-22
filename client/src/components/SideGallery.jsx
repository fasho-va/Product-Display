import React from 'react';
import Slider from "react-slick";

class SideGallery extends React.Component {

    render() {

        const settings = {
            arrows: false,
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
            verticalSwiping: true,
            vertical: true
          };
        
        const imageStyle = {
            padding: '5px',
            width: '88px'
        };

        return (
            <div style={imageStyle} >
                <Slider {...settings}>
                    {this.props.images.map((element) => {
                        return <img src={element}></img>
                    })}
                </Slider>
        </div>
        )
    }
}

export default SideGallery