import { Component } from "react";
import { fetchFromApi } from "api/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export class App extends Component{
  state = {
    query: '',
    page: 1,
    isLoading: false,
    isEmpty: false,
    images: [],
    isVisible: false,
    error: null,
    modalImg:'',
  }

  componentDidUpdate = (_,prevState) => {
    const {query,page} = this.state;

    if (prevState.query !== query || prevState.page !== page){
      this.getImages(query,page)
    }
  };

  getImages = async (query,page) => {
    if (!query){
      return alert("Type Something!!!")
    }
    this.setState({isLoading:true});
    try{
      const {
        hits,
        totalHits,
      } = await fetchFromApi(query,page);
      if (totalHits === 0){
        this.setState({isEmpty:true,})
      }
      
      this.setState((prevState)=>({
        images: [...prevState.images,...hits],
        isVisible: page < (totalHits/12),
        isEmpty:false,
      }));
    } catch(error){
      this.setState({error:error.message})
    } finally {
      this.setState({isLoading:false})
    }
  };

  onHandleSubmit = (value) =>{
    this.setState({query:value,images:[],page:1,})
  }

  onLoadMore = () => {
    this.setState((prevState)=>(
      {page:prevState.page+1}
    ))
  }

  modalImgSet = (src,alt) =>{
    this.setState({modalImg:{src,alt}})
  }

  modalImgReset = () =>{
    this.setState({modalImg:''})
  }

  render(){
    const {images,isVisible,isLoading,isEmpty,error,modalImg,} = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onHandleSubmit}/>
        {isEmpty && console.log("No images matching your query!")}
        {error && <p>Something went wrong - {error}</p>}
        {isLoading && <Loader/>}
        <ImageGallery
        images={images}
        setModalImage={this.modalImgSet}
        ></ImageGallery>
        {isVisible && <Button onClick={this.onLoadMore}>{isLoading? 'Loading...':'Load More'}</Button>}
        {modalImg && <Modal img={modalImg} onClose={this.modalImgReset}/>}
      </>
    )
  }
}