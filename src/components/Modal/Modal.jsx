import { Component } from "react";
import propTypes from 'prop-types'
import { createPortal } from "react-dom";
import { ModalWindow, ModalWindowContent } from "./Modal.styled";

const rootModal = document.querySelector('#root-modal');

export class Modal extends Component{
    componentDidMount(){
        window.addEventListener('keydown', this.handleClose)
    };

    componentWillUnmount(){
        window.removeEventListener('keydown',this.handleClose)
    };

    modalClose = () =>{
        this.props.onClose();
    };

    handleClose = evt =>{
        if(evt.code==='Escape') {
            this.modalClose();
        }
        return;
    }

    handleModalWindowClick = evt =>{
        if (evt.currentTarget === evt.target){
            this.modalClose();
        }
        return;
    }

    render(){
        const {src,alt} = this.props.img;
        

    return createPortal(
        <ModalWindow onClick={this.handleModalWindowClick}>
            <ModalWindowContent>
                <img src={src} alt={alt}/>
            </ModalWindowContent>
        </ModalWindow>,
        rootModal
    )
}
}

Modal.propTypes = {
    img:propTypes.shape({
        src:propTypes.string.isRequired,
        alt:propTypes.string.isRequired,
    }).isRequired,
    onClose: propTypes.func.isRequired,
}