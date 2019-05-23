import React from 'react';
import Axios from 'axios';
import MainGallery from './MainGallery.jsx'
import ProductInformation from './ProductInformation.jsx'
import SideGallery from './SideGallery.jsx';
import FullScreenGallery from './FullScreenGallery.jsx'

const fullscreenStyle = {
	background: 'black',
	textAlign: 'center'
}

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
			uuid: 1,
			infoSlider: true,
			fullscreen: false,
			zoom: false,
			slide: 0
		}
		this.productHandler = this.productHandler.bind(this);
		this.buttonHandler = this.buttonHandler.bind(this);
		this.productChange = this.productChange.bind(this);
		this.infoButtonHandler = this.infoButtonHandler.bind(this);
		this.fullscreen = this.fullscreen.bind(this);
		this.zoom = this.zoom.bind(this);
		//this.fullscreenInitialClasses = this.fullscreenInitialClasses.bind(this);
		this.fullscreenNext = this.fullscreenNext.bind(this);
		this.fullscreenPrev = this.fullscreenPrev.bind(this);
		this.fullscreenMoveSlide = this.fullscreenMoveSlide.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.fullscreenSlideSet = this.fullscreenSlideSet.bind(this);
		this.forceUpdate = this.forceUpdate.bind(this);
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
			let images = [];
			for (let key in results.data.images[0]) {
				if(typeof(results.data.images[0][key]) === 'string') {
					images.push(results.data.images[0][key])
				}
			}
			console.log(images);
			this.setState({
				product: results.data.product,
				images: images
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

	infoButtonHandler() {
		this.setState({
			infoSlider: !this.state.infoSlider
		})
	}

	fullscreen() {
		this.setState({
			fullscreen: !this.state.fullscreen
		})
	}

	zoom() {
		this.setState({
			zoom: !this.state.zoom
		}, () => {if(!this.state.zoom) {this.fullscreenMoveSlide(this.state.slide)}})
	}

	// fullscreenInitialClasses() {
	// 	const images = document.getElementsByClassName('fullscreenImg');
	// 	console.log(images);
	// 	if(this.state.slide === 0) {
	// 		images[images.length - 1].classList.add('prev')
	// 	} else {
	// 		images[this.state.slide -1].classList.add('prev');
	// 	}
	// 	if(this.state.slide === images.length -1) {
	// 		images[0].classList.add('next')
	// 	} else {
	// 		images[this.state.slide + 1].classList.add('next')
	// 	}
	// 	images[this.state.slide].classList.add('active')
	// }

	fullscreenNext() {
		const images = document.getElementsByClassName('fullscreenImg');
		console.log(images);
		if (this.state.slide === images.length -1) {
			this.setState({
				slide: 0
			}, () => {this.fullscreenMoveSlide(this.state.slide);})
		} else {
			this.setState({
				slide: this.state.slide + 1
			}, () => {this.fullscreenMoveSlide(this.state.slide);})
		}
	}

	fullscreenPrev() {
		const images = document.getElementsByClassName('fullscreenImg');
		console.log(images);
		if (this.state.slide === 0) {
			this.setState({
				slide: this.state.images.length -1
			}, () => {this.fullscreenMoveSlide(this.state.slide);})
		} else {
			this.setState({
				slide: this.state.slide - 1
			}, () => {this.fullscreenMoveSlide(this.state.slide);})
		}
	}

	fullscreenMoveSlide(slide) {
		let newPrev = slide - 1;
		let newNext = slide + 1;
		let oldPrev = slide - 2;
		let oldNext = slide + 2;
		let items = document.getElementsByClassName('fullscreenImg')
		if(slide === 0) {
			newPrev = items.length - 1;
			oldPrev = items.length - 2;
		} else if(slide === items.length -1) {
			newNext = 0;
			oldNext = items.length -1;
		}
		if(oldNext > items.length -1 ) {
			oldNext = 0;
		} else if(oldPrev < 0) {
			oldPrev = items.length - 1
		}
		console.log(oldPrev, newPrev);
		items[oldPrev].className = 'fullscreenImg';
		items[oldNext].className = 'fullscreenImg';
		items[newPrev].className = 'fullscreenImg' + " prev";
		items[slide].className = 'fullscreenImg' + " active";
		items[newNext].className = 'fullscreenImg' + " next";
	}

	handleKeyPress(event) {
			if(event.keyCode === 37) {
				this.fullscreenPrev()
			} else if (event.keyCode === 39) {
				this.fullscreenNext();
			}
	}

	fullscreenSlideSet(i) {
		this.setState({
			slide: i
		}, () => {if(this.state.fullscreen) {this.fullscreenMoveSlide(this.state.slide)}})
	}
	
	render() {
		if(!this.state.fullscreen) {
			return(
				<div >			
					<input onChange={this.productHandler} type='text'></input>
					<button onClick={this.buttonHandler}>Change Product</button>
					<div style={divStyle}>
						<div style={componentStyle}>
							<MainGallery slideSet = {this.fullscreenSlideSet} fullscreen = {this.fullscreen} images = {this.state.images}/>
						</div>
						<br/>
						<div style={componentStyle}>
							<SideGallery images = {this.state.images}/>
						</div>
						<br/>
						<div style={componentStyle}>
							<ProductInformation button = {this.infoButtonHandler} infoSlider = {this.state.infoSlider} info = {this.state.product} />
						</div>
					</div>
				</div>
			)
		} else {
			return(
				<div tabIndex="-1" onKeyDown={this.handleKeyPress} style={fullscreenStyle}>
					<FullScreenGallery slide = {this.state.slide} fullscreenMoveSlide = {this.fullscreenMoveSlide} fullscreenPrev = {this.fullscreenPrev} fullscreenNext = {this.fullscreenNext} fullscreen = {this.fullscreen} zoomFunc = {this.zoom} zoom = {this.state.zoom} images = {this.state.images}/>
				</div>
			)
		}
	}
}


export default ProductDisplay;