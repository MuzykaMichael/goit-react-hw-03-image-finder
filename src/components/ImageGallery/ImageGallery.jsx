import React, {Component} from 'react'
import { ImageList,ErrorMsg } from './ImageGallery.styled'
import { LoadMoreButton } from 'components/Button/Button.styled'
import {Loader} from '../Loader/Loader'
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem'
import propTypes from 'prop-types'

export class ImageGallery extends Component{
    state = {
        page:1,
        pagesTotal:this.props.totalHits / 12,
    }
    handleLoadMore = () =>{
        this.setState(prevState=>{
            return {page:prevState.page+1}
        })
    }
    
    render(){
        const {images,query,setModalImage,isLoading,isEmpty} = this.props;
        const {page,pagesTotal} = this.state;
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
                            onClick={setModalImage}
                            />
                        ))}
                    </ImageList>
                    {page<pagesTotal&&isLoading!==true && (
                        <LoadMoreButton onClick={this.handleLoadMore}>Load More</LoadMoreButton>
                    )}
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
    loadMore: propTypes.func.isRequired,
    setModalImage:propTypes.func.isRequired,
}