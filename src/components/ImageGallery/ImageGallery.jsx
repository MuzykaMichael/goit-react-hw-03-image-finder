import React, {Component} from 'react'
import { ImageList,ErrorMsg } from './ImageGallery.styled'
import {Loader} from '../Loader/Loader'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types'

export class ImageGallery extends Component{

    
    render(){
        const {images,query,setModalImage,isLoading,isEmpty} = this.props;
        if(isLoading===false || isEmpty === false){
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
                    {isLoading === true&& <Loader/>}
                </>
            );
        }
        if (isLoading===false && isEmpty===true){
            return(
                <>
                    <ErrorMsg>
                        We can't find pictures matching '{query}'.
                    </ErrorMsg>
                </>
            )
        }
    }
}

ImageGallery.propTypes = {
    images:propTypes.arrayOf(propTypes.object.isRequired).isRequired,
    totalHits: propTypes.number.isRequired,
    query:propTypes.string.isRequired,
    setModalImage:propTypes.func.isRequired,
}