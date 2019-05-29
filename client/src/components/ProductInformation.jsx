import React from 'react'

const ProductInformation = (props) => {
	let description = [];
	if(props.info.description) {
		description = props.info.description.split(',')
	}
	return (
		<div>
			<div className='productName'>{props.info.name}</div>
			<div className='productPrice'>${props.info.cost} USD</div>
			<p className='reviews'>{props.info.reviews} Reviews</p>
			<hr></hr>
			<div className='accordion active' onClick={props.detailButton}>PRODUCT DETAILS</div>
			<ul className='detailPanel'>
				{description.map((element, index) => {
					return <li>{element}</li>
				})}
			</ul>
			<hr></hr>
			<div className='accordion' onClick={props.infoButton}>SHIPPING INFORMATION</div>
			<div className='panel'>$80 By Packmule</div>
			<hr></hr>
			<div className='accordion' onClick={props.infoButton}>RETURNS</div>
			<div className='panel'>No Returns</div>
			<hr></hr>
		</div>
	)
}

export default ProductInformation;