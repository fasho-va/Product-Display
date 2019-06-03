import React from 'react';
import Axios from 'axios';
import MainGallery from './MainGallery.jsx'
import ProductInformation from './ProductInformation.jsx'
import SideGallery from './SideGallery.jsx';
import FullScreenGallery from './FullScreenGallery.jsx'
import Slider from "react-slick";


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
			fullerScreen: false,
			mobile: false
		}
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
		this.detailButtonHandler = this.detailButtonHandler.bind(this);
		this.mainComponentWrapper = React.createRef();
		this.fullscreenGalleryComp = React.createRef();
		this.productInfo = React.createRef();
		this.fullscreenChildRef = React.createRef();
		this.handleMobile = this.handleMobile.bind(this)
	}

	componentDidMount() {
		window.addEventListener('updateUuid', (event) => {
			this.setState({uuid: event.detail, slide: 0}, () => {
				this.productChange();
			});
		}, false);
		this.fullscreenGalleryComp.current.focus();
		this.productChange();
		this.setState({
			nav1: this.slider
		});
		this.handleMobile();
		window.addEventListener('resize', this.handleMobile)
		window.addEventListener('keydown', this.handleKeyPress)
		window.addEventListener('mousemove', () => {
			if (this.state.fullscreen) {
				document.getElementsByClassName('fullscreenToolbar')[0].style.opacity = '1'; 
			}
		})
		
	}

	handleMobile() {
		if(window.innerWidth <= 900) {
			this.setState({mobile: true})
		} else if (window.innerWidth > 900) {
			this.setState({mobile: false})
		}
	}

	productChange() {
		Axios.get(`http://ec2-18-216-220-130.us-east-2.compute.amazonaws.com/products${this.state.uuid}`, {
			params: {
				id: this.state.uuid
			}
		})
		.then((results) => {
			let images = [];
			for (let key in results.data.images[0]) {
				if(typeof(results.data.images[0][key]) === 'string') {
					images.push(results.data.images[0][key])
				}
			}			
			this.setState({
				product: results.data.product,
				images: images
			})
		})
		.then(() => {
			this.productInfo.current.children[0].children[5].style.maxHeight = this.productInfo.current.children[0].children[5].scrollHeight + 'px';
		})
	}


	infoButtonHandler(e) {
		e.target.classList.toggle('active')
		if(e.target.nextElementSibling.style.maxHeight) {
			e.target.nextElementSibling.style.maxHeight = null;
		} else {
			e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + 'px';
		}
	}

	detailButtonHandler(e) {
		e.target.classList.toggle('active')
		if(e.target.nextElementSibling.style.maxHeight !== '0px') {
			e.target.nextElementSibling.style.maxHeight = '0px';
		} else {
			e.target.nextElementSibling.style.maxHeight = e.target.nextElementSibling.scrollHeight + 'px';
		}
	}

	fullscreen(e) {
		if(e.target.className !== 'fullscreenImg active' && e.target.className !== 'fullscreenButton--prev' && e.target.className !== 'fullscreenButton--next' && !this.state.fullerScreen) {
			if(this.state.fullscreen) {
				this.mainComponentWrapper.current.style.opacity = null
				this.mainComponentWrapper.current.style.visibility = null
				this.fullscreenGalleryComp.current.style.display = 'none'
				window.removeEventListener('scroll', this.fullscreen)
			} else if (!this.state.fullscreen && !this.state.mobile){
				this.mainComponentWrapper.current.style.opacity = 0
				this.mainComponentWrapper.current.style.visibility = 'hidden'
				this.fullscreenGalleryComp.current.style.display = 'block'
				window.location = '#'
				// this.onScroll()
				window.addEventListener('scroll', this.fullscreen)
			} else if (this.state.mobile) {
				return
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
		if (this.state.slide === this.state.images.length -1) {
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
		let items = this.fullscreenChildRef.children
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
		const elem = this.fullscreenGalleryComp;
		this.setState({
			fullerScreen: !this.state.fullerScreen
		},
		() => {
			if(this.state.fullerScreen) {
				elem.current.requestFullscreen();
			} else {
				document.webkitCancelFullScreen();
			}
		}
		)
	}


	
	render() {
			return(
				<div>			
					<div className='fullscreenGallery' ref={this.fullscreenGalleryComp}>
						<FullScreenGallery childRef = {el => (this.fullscreenChildRef = el)} fullerScreen = {this.fullerScreen} slide = {this.state.slide} fullscreenMoveSlide = {this.fullscreenMoveSlide} fullscreenPrev = {this.fullscreenPrev} fullscreenNext = {this.fullscreenNext} fullscreen = {this.fullscreen} zoomFunc = {this.zoom} zoom = {this.state.zoom} images = {this.state.images}/>
					</div>
					<div className='mainComponentWrapper' ref={this.mainComponentWrapper}>
						<div className ='mainGallery' onClick={this.fullscreen}>
							<Slider
								initialSlide={this.state.slide}
								infinite={false}
								speed={900}
								slidesToShow={2}
								slidesToScroll={1}
								accessibility={true}
								ref={slider => (this.slider = slider)}
								responsive={[{breakpoint: 900, settings: {
									slidesToShow: 1,
									speed: 900,
									initialSlide: this.state.slide
								}}]}
							>
								{this.state.images.map((element, index) => {
									return (
										<div >
											<img className='mainGalleryImg' onClick={()=> {this.fullscreenSlideSet(index)}} src={element}></img>
										</div>
									)
								})}
							</Slider>
							{/* <MainGallery slide = {this.state.slide} slideSet = {this.fullscreenSlideSet} fullscreen = {this.fullscreen} images = {this.state.images}/> */}
						</div>
						<br/>
						<div className='sideGallery'>
							<SideGallery mobile={this.state.mobile} slider = {this.state.nav1} images = {this.state.images} slideSet = {this.fullscreenSlideSet}/>
						</div>
						<br/>
						<div ref={this.productInfo} className='productInformation'>
							<ProductInformation detailButton = {this.detailButtonHandler} infoButton = {this.infoButtonHandler} info = {this.state.product} />
						</div>
					</div>
				</div>
			)
	}
}


export default ProductDisplay;