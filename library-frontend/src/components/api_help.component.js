import React, { Component } from 'react';

export default class API extends Component {
  render() {
    return (
        <div>
            <h1>API CRUD OPERATIONS FOUND BELOW:</h1>
            <br></br>
            <h1>ADMIN:</h1>

            <h3>Create Admin(POST):</h3>
            <h5>'URL: /admin'</h5>
            <p>Required: 'email', 'password'</p>
            <p>Optional: 'name' </p>
            
            <h3>Login Admin(POST):</h3>
            <h5>'URL: /admin/login'</h5>
            <p>Required: 'email', 'password'</p>
            
            <h3>Logout Admin(POST):</h3>
            <h5>'URL: /admin/logout'</h5>
            <p>Required: Authentication</p>
            
            <h3>Logout All Admin Sessions(POST):</h3>
            <h5>'URL: /admin/logoutALL'</h5>
            <p>Required: Authentication</p>
            
            <h3>Read Admin Profile(GET):</h3>
            <h5>'URL: /admin/me'</h5>
            <p>Required: Authentication</p>
            
            <h3>Update Admin(PATCH):</h3>
            <h5>'URL: /admin/me'</h5>
            <p>Optional: Authentication, 'email', 'password'</p>

            <h3>Delete Admin(DELETE):</h3>
            <h5>'URL: /admin/me'</h5>
            <p>Required: Authentication</p>

            <br></br>
            <h1>BOOKS:</h1>

            <h3>Create Book(POST):</h3>
            <h5>'URL: /books'</h5>
            <p>Required: Authentication, 'name'</p>
            <p>Optional: 'ISBN', 'cover', 'author' </p>

            <h3>Get All Books(GET):</h3>
            <h5>'URL: /books'</h5>

            <h3>Get Book By Id(GET):</h3>
            <h5>'URL: /books/:id'</h5>

            <h3>Update Book By Id(PATCH):</h3>
            <h5>'URL: /books/:id'</h5>
            <p>Required: Authentication</p>
            <p>Optional: 'name', 'ISBN', 'cover', author</p>

            <h3>Delete Books By Id(DELETE):</h3>
            <h5>'URL: /books/:id'</h5>
            <p>Required: Authentication</p>

            <h3>Add Book Cover(POST):</h3>
            <h5>'URL: /book/:id/cover'</h5>
            <p>Required: Authentication, 'cover'</p>

            <h3>Get Book Cover(Get):</h3>
            <h5>'URL: /books/:id/cover'</h5>

            <h3>Delete Book Cover(DELETE):</h3>
            <h5>'URL: /books/:id/cover'</h5>
            <p>Required: Authentication</p>

            <br></br>
            <h1>AUTHOR:</h1>
            <h3>Create Author(POST):</h3>
            <h5>'URL: /author'</h5>
            <p>Required: Authentication, 'name', 'bio'</p>

            <h3>Get all Authors(GET):</h3>
            <h5>'URL: /author'</h5>

            <h3>Get Author By Id(GET):</h3>
            <h5>'URL: /author/:id'</h5>

            <h3>Update Author By Id(PATCH):</h3>
            <h5>'URL: /author/:id'</h5>
            <p>Required: Authentication,</p>
            <p>Optional: 'name', 'bio' </p>
            
            <h3>Delete Author By Id(DELETE):</h3>
            <h5>'URL: /author/:id'</h5>
            <p>Required: Authentication</p>

            <br></br>
            <h1>CATEGORY:</h1>
            <h3>Create Category(POST):</h3>
            <h5>'URL: /category'</h5>
            <p>Required: Authentication, 'name'</p>

            <h3>Get all Categories(GET):</h3>
            <h5>'URL: /category'</h5>

            <h3>Get Category By Id(GET):</h3>
            <h5>'URL: /category/:id'</h5>

            <h3>Update Category By Id(PATCH):</h3>
            <h5>'URL: /category/:id'</h5>
            <p>Required: Authentication,</p>
            <p>Optional: 'name' </p>
            
            <h3>Delete Category By Id(DELETE):</h3>
            <h5>'URL: /category/:id'</h5>
            <p>Required: Authentication</p>

            <br></br>
            <h1>BOOKCATEGORY:</h1>
            <p>(Relation between Book and Category collections)</p>
            <h3>Create BookCategory(POST):</h3>
            <h5>'URL: /bookcategory'</h5>
            <p>Required: Authentication, 'book_id', 'category_id'</p>

            <h3>Get all BookCategories(GET):</h3>
            <h5>'URL: /bookcategory'</h5>

            <h3>Get BookCategory By Id(GET):</h3>
            <h5>'URL: /bookcategory/:id'</h5>

            <h3>Update BookCategory By Id(PATCH):</h3>
            <h5>'URL: /bookcategory/:id'</h5>
            <p>Required: Authentication,</p>
            <p>Optional: 'book_id', 'category_id' </p>
            
            <h3>Delete BookCategory By Id(DELETE):</h3>
            <h5>'URL: /bookcategory/:id'</h5>
            <p>Required: Authentication</p>

        </div>
    );
  }
}