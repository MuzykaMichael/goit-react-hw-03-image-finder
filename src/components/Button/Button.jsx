import { LoadMoreButton, LoadMoreButtonSpan } from "./Button.styled";
import React, {Component} from 'react'
import propTypes from 'prop-types'


export class Button extends Component{
    clickHandler = () =>{
        this.props.onClick()
    };
    render(){
        return <LoadMoreButton onClick={this.clickHandler}><LoadMoreButtonSpan>Load more!</LoadMoreButtonSpan></LoadMoreButton>
    }
}

Button.propTypes = {
    onClick:propTypes.func.isRequired,
}