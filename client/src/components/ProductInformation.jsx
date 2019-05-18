import React from 'react'

const detailStyle = {
    fontFamily: 'Verdana',
    fontSize: '14px'
};

const nameStyle = {
    fontFamily: 'Verdana',
    fontSize: '22px'
};


const ProductInformation = (props) => {
    let description = [];
    if(props.info.description) {
        description = props.info.description.split(',')
    }
    return (
        <div >
            <p style={nameStyle}>{props.info.name}</p>
            <h2>${props.info.cost}</h2>
            <h3>Product Details</h3>
            <ul style={detailStyle}>
            {description.map((element, index) => {
                return <li>{element}</li>
            })}
            </ul>
        </div>
    )
}

export default ProductInformation;