import React from 'react';
//import '../../public/style.css'

const fullImageStyle = {
  width: `50%`
};

const FullScreenGallery = (props) => {
  if(!props.zoom) {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <div onClick={props.zoomFunc} className='magnifyingGlass'></div>
          <div onClick={props.fullscreen} className='exit'></div>
        </div>
        <div className='fullscreenWrapper' onClick={props.fullscreen}>
          <div className ='fullscreen'>
            {/* <img onClick={props.zoomFunc} className='fullscreenImg initial' src={props.images[0]}></img> */}
            {props.images.map((element) => {
                return <img onClick={props.zoomFunc} className='fullscreenImg' src={element}></img>
            })}
            <div onClick={props.fullscreenNext} className='fullscreenButton--next'></div>
            <div onClick={props.fullscreenPrev} className='fullscreenButton--prev'></div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div>
        <img style={{width: '100%', cursor: 'zoom-out'}} onClick={props.zoomFunc} src={props.images[props.slide]}></img>
      </div>
    )
  }
}




export default FullScreenGallery;