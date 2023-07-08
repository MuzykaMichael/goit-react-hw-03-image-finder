import React, {Component} from 'react'
import propTypes from 'prop-types'
import { GalleryItem, GalleryItemImage, ModalButton } from './ImageGalleryItem.styled'

export class ImageGalleryItem extends Component{
    
    clickHandler = (src,alt) =>{
        this.props.setModalImage(src,alt)
    };

    render(){
        const {alt,src,largeImg} = this.props;
        return(
            <GalleryItem>
                <ModalButton onClick={()=>this.clickHandler(largeImg,alt)} type='button'>
                    <GalleryItemImage src={src} alt={alt}/>
                </ModalButton>
            </GalleryItem>

        );
    }
}


ImageGalleryItem.propTypes = {
    alt:propTypes.string.isRequired,
    src:propTypes.string.isRequired,
    largeImg:propTypes.string.isRequired,
    setModalImage:propTypes.func.isRequired,

}