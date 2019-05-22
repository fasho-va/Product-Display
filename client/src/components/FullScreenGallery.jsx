import React from 'react';
//import '../../public/style.css'

const fullImageStyle = {
  width: `50%`
};

const FullScreenGallery = (props) => {
  if(!props.zoom) {
    return (
      <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div onClick={props.fullscreen} style={{color: 'white', width: '25px'}}>X</div>
        </div>
        <div className='fullscreenWrapper'>
          <div className ='fullscreen'>
            <img onClick={props.zoomFunc} className='fullscreenImg initial' src={props.images[0]}></img>
            {props.images.map((element) => {
              if (props.images[0] !== element) {
                return <img onClick={props.zoomFunc} className='fullscreenImg' src={element}></img>
              }
            })}
            <div onClick = {props.fullscreenNext} className='fullscreenButton--next'></div>
            <div onClick = {props.fullscreenPrev} className='fullscreenButton--prev'></div>
          </div>
        </div>
      </>
    )
  } else {
    return (
      <div>
        <img style={{width: '100%'}} onClick={props.zoomFunc} src={props.images[props.slide]}></img>
      </div>
    )
  }
}




export default FullScreenGallery;