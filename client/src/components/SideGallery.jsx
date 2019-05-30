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
					responsive={[{breakpoint: 900, settings: {
						slidesToShow: 4,
						slidesToScroll: 1,
						vertical: false,
						verticalSwiping: false
					}}]}
					>
					{props.images.map((element, index) => {
							return <img onClick={()=> {props.slider.slickGoTo(index)}} src={element}></img>
					})}
				</Slider>
		</div>
	)	
}

export default SideGallery