import React from 'react'

const infoStyle = {
    fontFamily: 'Verdana',
    fontSize: '14px'
};

const ProductInformation = (props) => {
    let description = [];
    if(props.info.description) {
        description = props.info.description.split(',')
    }
    return (
        <div >
            <h1>Product Details</h1>
            <div style={infoStyle}>{props.info.name}</div>
            <div style={infoStyle}>${props.info.cost}</div>
            <ul style={infoStyle}>
            {description.map((element, index) => {
                return <li>{element}</li>
            })}
            </ul>
        </div>
    )
}

export default ProductInformation;