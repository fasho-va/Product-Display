import React from 'react'

const detailStyle = {
	fontFamily: 'Oswald',
	fontSize: '14px'
};

const ProductInformation = (props) => {
	let description = [];
	if(props.info.description && props.infoSlider) {
		description = props.info.description.split(',')
	}
	return (
		<div >
			<h1 className='productName'>{props.info.name}</h1>
			<h2 className='productPrice'>${props.info.cost} USD</h2>
			<p onClick={props.button}>Product Details       +</p>
				<ul className='productDetails'>
					{description.map((element, index) => {
						return <li>{element}</li>
					})}
				</ul>
		</div>
	)
}

export default ProductInformation;