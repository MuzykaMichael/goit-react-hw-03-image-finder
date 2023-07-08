import { Component } from "react";
import {Form,Button,SpanLabel,Input} from './Searchbar.styled'
import propTypes from 'prop-types'


export class Searchbar extends Component{
    state = {
        query:'',
    }



    handleChange = e =>{
        this.setState({query:e.currentTarget.value.toLowerCase().trim()})
    }

    handleSubmit = e =>{
        e.preventDefault();

        const {query} = this.state;
        const {onSubmit} = this.props;

        onSubmit(query);
        this.setState({query:""})
    }






    render(){
        const {query} = this.state;
        return(
            <Form onSubmit={this.handleSubmit}>
                <Button type='submit'>
                    <SpanLabel>Search</SpanLabel>
                </Button>
                <Input
                type="text"
                name="query"
                onChange={this.handleChange}
                value={query}
                required
                autoFocus
                placeholder="Type image to find"
                />
            </Form>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: propTypes.func.isRequired,

}