import React from 'react';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SideGallery from './SideGallery.jsx'







class MainGallery extends React.Component {

    render() {

        const settings = {
            dots: true,
            dotsClass: "slick-dots slick-thumb",
            infinite: true,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1,
            accessibility: true
            };
        
        const galleryStyle = {
            padding: '5px',
            width: '900px'
        };

        const imageStyle = {
            padding: '50px',
            width: '450px'
        };


        return (
            <div style={galleryStyle} >
                <Slider {...settings}>
                        {this.props.images.map((element) => {
                            if(typeof(element) === 'string') {
                            return (
                                    <img src={element}></img>
                            )
                            }
                        })}
                </Slider>
            </div>
        )
}
}



export default MainGallery