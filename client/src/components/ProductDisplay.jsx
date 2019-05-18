import React from 'react';
import Axios from 'axios';
import MainGallery from './MainGallery.jsx'
import ProductInformation from './ProductInformation.jsx'
import SideGallery from './SideGallery.jsx';


const divStyle = {
    display: 'flex'
}

class ProductDisplay extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            images: []
        }
    }

    componentDidMount() {
        Axios.get('/products')
        .then((results) => {
            console.log(results.data);
            this.setState({
                product: results.data.product,
                images: Object.values(results.data.images[0])
            })
        })
        .then(() => {
            console.log(this.state)
        })
    }
    
    render() {
        return(
            <div style={divStyle}>
                <div>
                    <MainGallery images = {this.state.images}/>
                </div>
                <br/>
                <div>
                    <SideGallery images = {this.state.images}/>
                </div>
                <br/>
                <div>
                    <ProductInformation info = {this.state.product} />
                </div>
            </div>
        )
    }
}


export default ProductDisplay;