import React, { Component } from 'react';
import axios from 'axios';


export default class Book extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      name: '',
      ISBN: '',
      cover: null,
      author_id: ''
    };
  };
  state = { cover: null }

  componentDidMount() {
    axios.get('http://localhost:5000/books/' + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.name,
          ISBN: response.data.ISBN,
          author_id: response.data.author_id
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  };
  
  fileSelectHandler = (event) => {
    event.preventDefault()
    console.log(event.target);
    this.setState({
      cover: event.target.files[0]
    })
  }

  
  fileUploadHandler = (event) => {
    event.preventDefault()
    const form_data = new FormData();
    form_data.append('cover', this.state.cover, this.state.cover.name);

    let token = localStorage.getItem('token');
    let postCoverURL = '/books/' + this.props.match.params.id + '/cover';
    axios.post(postCoverURL, form_data, {headers: {Authorization : token}})
    .then(function (response) {
      console.log(response); 
    })
    .catch(function (error) {
        console.log(error.response);
    });
  }

  
  onDelete(event){
    event.preventDefault()
    let token = localStorage.getItem('token')
    axios.delete('http://localhost:5000/books/' + this.props.match.params.id, {
      headers: {Authorization: token}
    })
      .then(response => {
        console.log('Deleted:' + response);
      })
      .catch(function (error) {
        console.log(error.response);
      })
  };
  
  
  render() {
    return (
      <div>
        <h1>Book _id: {this.props.match.params.id}</h1>
        <h1>Name: {this.state.name}</h1>
        <h1>ISBN: {this.state.ISBN}</h1>

        <br></br>
        <label>Upload Cover: </label>
        <input 
          type="file"
          onChange={this.fileSelectHandler}
          />
        <button 
          onClick={this.fileUploadHandler}>Upload
        </button>

        <br></br>


        <div className="form-group">
            <input type="button" value="Delete Book" className="btn btn-primary" onClick={this.onDelete}/>
        </div>
      </div>
    );
  }
}