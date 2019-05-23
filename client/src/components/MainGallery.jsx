import React from 'react';
import Slider from "react-slick";




const galleryStyle = {
	padding: '5px',
	width: '900px'
};



const MainGallery = (props) => {
		return (
			<div onClick = {props.fullscreen} style={galleryStyle} >
				<Slider
					infinite={true}
					speed={500}
					slidesToShow={2}
					slidesToScroll={1}
					accessibility={true}
				>
					{props.images.map((element, index) => {
						return (
							<img  onClick={()=> {props.slideSet(index)}} src={element}></img>
						)
					})}
				</Slider>
			</div>
		)
}



export default MainGallery