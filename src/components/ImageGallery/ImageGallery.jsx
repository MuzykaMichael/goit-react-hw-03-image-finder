import React, {Component} from 'react'
import { ImageList } from './ImageGallery.styled'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types'

export class ImageGallery extends Component{

    
    render(){
        const {images,setModalImage} = this.props;
            return(
                <>
                    <ImageList>
                        {images.map(({webformatURL,tags,largeImageURL},id)=>(
                            <ImageGalleryItem
                            key={id}
                            largeImg={largeImageURL}
                            src={webformatURL}
                            alt={tags}
                            setModalImage={setModalImage}
                            />
                        ))}
                    </ImageList>
                </>
            );
    }
}

ImageGallery.propTypes = {
    images:propTypes.arrayOf(propTypes.object.isRequired).isRequired,
    setModalImage:propTypes.func.isRequired,
}