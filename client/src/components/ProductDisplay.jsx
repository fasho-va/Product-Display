import React from 'react';
import Axios from 'axios';
import MainGallery from './MainGallery.jsx'
import ProductInformation from './ProductInformation.jsx'
import SideGallery from './SideGallery.jsx';
import FullScreenGallery from './FullScreenGallery.jsx'
import Slider from "react-slick";



const divStyle = {
	display: 'flex',
	margin: '1rem'
}

const componentStyle = {
	margin: '1rem'
}


class ProductDisplay extends React.Component{
	constructor(props) {
		super(props)
		this.state = {
			product: {},
			images: [],
			uuid: 59,
			fullscreen: false,
			zoom: false,
			slide: 0,
			nav1: null,
			nav2: null,
			fullerScreen: false
		}
		this.productHandler = this.productHandler.bind(this);
		this.buttonHandler = this.buttonHandler.bind(this);
		this.productChange = this.productChange.bind(this);
		this.infoButtonHandler = this.infoButtonHandler.bind(this);
		this.fullscreen = this.fullscreen.bind(this);
		this.zoom = this.zoom.bind(this);
		this.fullscreenNext = this.fullscreenNext.bind(this);
		this.fullscreenPrev = this.fullscreenPrev.bind(this);
		this.fullscreenMoveSlide = this.fullscreenMoveSlide.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
		this.fullscreenSlideSet = this.fullscreenSlideSet.bind(this);
		this.forceUpdate = this.forceUpdate.bind(this);
		this.fullerScreen = this.fullerScreen.bind(this);
	}

	componentDidMount() {
		this.productChange();
		this.setState({
      nav1: this.slider
		});
		document.addEventListener('keydown', this.handleKeyPress)
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

	infoButtonHandler(e) {
		e.target.classList.toggle('active')
		if(e.target.nextElementSibling.style.maxHeight) {
			e.target.nextElementSibling.style.maxHeight = null;
		} else {
			e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + 'px';
		}
	}

	fullscreen(e) {
		if(e.target.className !== 'fullscreenImg active') {
			if(this.state.fullscreen) {
				document.getElementsByClassName('mainComponentWrapper')[0].style.visibility = null
				document.getElementsByClassName('fullscreenGallery')[0].style.display = 'none'
			} else {
				document.getElementsByClassName('mainComponentWrapper')[0].style.visibility = 'hidden'
				document.getElementsByClassName('fullscreenGallery')[0].style.display = 'block'
			}
			this.setState({
				fullscreen: !this.state.fullscreen
			},
			() => {
				if(this.state.fullscreen) {
					this.fullscreenMoveSlide(this.state.slide)
				} else {
					this.setState({
						nav1: this.slider
					})
				}
			}		
			)
		}
	}

	zoom(e) {
		if (e.target.className === 'fullscreenImg active' || this.state.zoom) {
			this.setState({
				zoom: !this.state.zoom
			}, () => {if(!this.state.zoom) {
				this.fullscreenMoveSlide(this.state.slide)}
			})
		}
	}

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
		if(!this.state.zoom && this.state.fullscreen) {
			if(event.keyCode === 37) {
				this.fullscreenPrev()
			} else if (event.keyCode === 39) {
				this.fullscreenNext();
			}
		}
	}

	fullscreenSlideSet(i) {
		this.setState({
			slide: i
		})
	}

	fullerScreen() {
		const elem = document.documentElement;
		this.setState({
			fullerScreen: !this.state.fullerScreen
		},
		() => {
			if(this.state.fullerScreen) {
				if (elem.requestFullscreen) {
					elem.requestFullscreen();
				}
			} else {
				if (elem.exitFullscreen) {
					elem.exitFullscreen();
				}
			}
		}
		)
	}
	
	render() {
		// if(!this.state.fullscreen) {
			return(
				<div>			
					<input onChange={this.productHandler} type='text'></input>
					<button onClick={this.buttonHandler}>Change Product</button>
					<div className='fullscreenGallery'>
						<FullScreenGallery fullerScreen = {this.fullerScreen} slide = {this.state.slide} fullscreenMoveSlide = {this.fullscreenMoveSlide} fullscreenPrev = {this.fullscreenPrev} fullscreenNext = {this.fullscreenNext} fullscreen = {this.fullscreen} zoomFunc = {this.zoom} zoom = {this.state.zoom} images = {this.state.images}/>
					</div>
					<div className='mainComponentWrapper'>
						<div style={{width: '900px', margin:'1rem'}} onClick={this.fullscreen}>
							<Slider
								initialSlide={this.state.slide}
								infinite={false}
								speed={900}
								slidesToShow={2}
								slidesToScroll={1}
								accessibility={true}
								ref={slider => (this.slider = slider)}
							>
								{this.state.images.map((element, index) => {
									return (
										<div >
											<img style={{width: '95%', height: '95%'}} onClick={()=> {this.fullscreenSlideSet(index)}} src={element}></img>
										</div>
									)
								})}
							</Slider>
							{/* <MainGallery slide = {this.state.slide} slideSet = {this.fullscreenSlideSet} fullscreen = {this.fullscreen} images = {this.state.images}/> */}
						</div>
						<br/>
						<div style={{componentStyle}}>
							<SideGallery slider = {this.state.nav1} images = {this.state.images} slideSet = {this.fullscreenSlideSet}/>
						</div>
						<br/>
						<div className='productInformation'>
							<ProductInformation button = {this.infoButtonHandler} info = {this.state.product} />
						</div>
					</div>
				</div>
			)
		// } else {
		// 	return(
		// 		<div className='fullscreenGallery'>
		// 			<FullScreenGallery fullerScreen = {this.fullerScreen} slide = {this.state.slide} fullscreenMoveSlide = {this.fullscreenMoveSlide} fullscreenPrev = {this.fullscreenPrev} fullscreenNext = {this.fullscreenNext} fullscreen = {this.fullscreen} zoomFunc = {this.zoom} zoom = {this.state.zoom} images = {this.state.images}/>
		// 		</div>
		// 	)
		// }
	}
}


export default ProductDisplay;