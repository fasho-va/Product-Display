import React from 'react';
import Axios from 'axios';
import MainGallery from './MainGallery.jsx'
import ProductInformation from './ProductInformation.jsx'
import SideGallery from './SideGallery.jsx';


const divStyle = {
    display: 'flex'
}

const componentStyle = {
    padding: '20px'
}

class ProductDisplay extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            product: {},
            images: [],
            uuid: 1
        }
        this.productHandler = this.productHandler.bind(this);
        this.buttonHandler = this.buttonHandler.bind(this);
        this.productChange = this.productChange.bind(this);
    }

    componentDidMount() {
        this.productChange();
    }
    
    productChange() {
        Axios.get(`/products${this.state.uuid}`, {
            params: {
                id: this.state.uuid
            }
        })
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

    productHandler(e) {
        console.log(e.target.value);
        this.setState({
            uuid: e.target.value
        })
    }

    buttonHandler() {
        this.productChange();
    }
    
    render() {
        return(
            <div>
                <input onChange={this.productHandler} type='text'></input>
                <button onClick={this.buttonHandler}>Change Product</button>
                <div style={divStyle}>
                    <div style={componentStyle}>
                        <MainGallery images = {this.state.images}/>
                    </div>
                    <br/>
                    <div style={componentStyle}>
                        <SideGallery images = {this.state.images}/>
                    </div>
                    <br/>
                    <div style={componentStyle}>
                        <button>+</button>
                        <ProductInformation info = {this.state.product} />
                    </div>
                </div>
            </div>
        )
    }
}


export default ProductDisplay;