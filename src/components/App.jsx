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
    totalHits:0,
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
        page:currentPage,
      } = await fetchFromApi(query,page);
      if (hits.length === 0){
        this.setState({isEmpty:true,page:currentPage})
      }
      
      this.setState((prevState)=>({
        images: [...prevState.images,...hits],
        isVisible: page < (totalHits/12),
        isEmpty:false,
        totalHits,
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
    const {images,isVisible,isLoading,isEmpty,error,modalImg,totalHits,query} = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onHandleSubmit}/>
        {isEmpty && <p>Sorry. There are no images</p>}
        {error && <p>Something went wrong - {error}</p>}
        {isLoading && <Loader/>}
        <ImageGallery
        isLoading={isLoading}
        isEmpty={isEmpty}
        images={images}
        totalHits={totalHits}
        query={query}
        loadMore={this.onLoadMore}
        setModalImage={this.modalImgSet}
        ></ImageGallery>
        {isVisible && <Button onClick={this.onLoadMore}>{isLoading? 'Loading...':'Load More'}</Button>}
        {modalImg && <Modal img={modalImg} onClose={this.modalImgReset}/>}
      </>
    )
  }
}