import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/navbar.component";
import Book from "./components/book.component";
import CreateBook from "./components/createbook.component";
import Admin from "./components/admin.component";
import API from "./components/api_help.component";


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/login" component={Admin}/>
        <Route path="/books/:id" component={Book}/>
        <Route path="/create" component={CreateBook}/>
        <Route path="/api" component={API}/>
      </div>
    </Router>
  );
}

export default App;
