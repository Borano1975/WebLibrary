import React, { Component } from 'react';
import axios from 'axios';

export default class CreateBook extends Component {
  constructor (props) {
    super(props);

    this.onChangeBookName = this.onChangeBookName.bind(this);
    this.onChangeBookISBN = this.onChangeBookISBN.bind(this);
    this.onChangeBookAuthorName = this.onChangeBookAuthorName.bind(this);
    this.onChangeBookAuthorBio = this.onChangeBookAuthorBio.bind(this);
    this.onAddItem = this.onAddItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name : '',
      ISBN : 0,
      cover : null,
      authorname: '',
      authorbio:'',
      category: [
        { name: ''}
      ],
      value: ''
    }
  };

  componentDidMount () {
    this.setState({
      name: 'New Book 01',
      ISBN: '0123456789123',
      authorname: '',
      authorbio: '',
      category: [],
      value: ''
    })
  };

  onChangeBookName (e) {
    this.setState({
      name: e.target.value
    });
  };

  onChangeBookISBN (e) {
    this.setState({
      ISBN: e.target.value
    });
  };

  onChangeBookAuthorName (e) {
    this.setState({
      authorname: e.target.value
      
    });
  };

  onChangeBookAuthorBio (e) {
    this.setState({
      authorbio: e.target.value
    });
  };

  onClearArray = () => {
    this.setState({ category: [] });
  };

  onChangeValue = event => {
    this.setState({ value: event.target.value });
  };
 
  onAddItem = () => {
    this.setState(state => {
      const category = state.category.concat({name: state.value});
      return {
        category,
        value: '',
      };
    });
  };

  onSubmit (e) {
    e.preventDefault();
    const author = {
      name: this.state.authorname, 
      bio: this.state.authorbio
    }
    
    let token = localStorage.getItem('token')
    console.log('Token: ' + token)
    
    axios.post('http://localhost:5000/author', author, {headers: {Authorization: token}})
    .then((res) => {
      const book = {
        name: this.state.name,
        ISBN: this.state.ISBN,
        cover: this.state.cover,
        author: res.data._id,
        category: this.state.category
      }
      axios.post('http://localhost:5000/books', book, {headers: {Authorization: token}})
      .then((res) => {
        const loc = '/books/' + res.data._id
        window.location = loc
      })
      .catch(function (e) {
        console.log(e, 'Book not created.')
      })
    })
    .catch(function (e) {
      console.log(e, 'Author not created.')
    })
    
  }


  render() {
    return (
      <div>
        <h3>Create New Book Instance</h3>
        <form onSubmit={this.onSubmit}>

          <div className="form-group"> 
            <label>Name*: </label>
            <input ref="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangeBookName}
              />
          </div>

          <div className="form-group"> 
            <label>ISBN (numbers only): </label>
            <input  type="text"
                    required
                    className="form-control"
                    value={this.state.ISBN}
                    onChange={this.onChangeBookISBN}
                    />
          </div>

          <div className="form-group">
            <label>Author* (name and bio): </label>
            <input 
              type="text" 
              value={this.state.authorname}
              onChange={this.onChangeBookAuthorName}
              />
              <input 
              type="text" 
              value={this.state.authorbio}
              onChange={this.onChangeBookAuthorBio}
              />
          </div>
          
          <div className="form-group">
          <label>Category: </label>
          <input 
              type="text"
              value={this.state.value}
              onChange={this.onChangeValue}
            />

            <button
              type="button"
              onClick={this.onAddItem}
              disabled={!this.state.value}>
              Add Category
            </button>

            <button type="button" onClick={this.onClearArray}>
              Clear Categories
            </button>

          </div>

          <div className="form-group">
            <input type="button" value="Create Book Log" className="btn btn-primary" onClick={this.onSubmit}/>
          </div>

        </form>
      </div>
    );
  }
}