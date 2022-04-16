// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

export default class App extends Component {
  pageSize=10
  country="in"
  //apikey="170ccfe47e0c4d4c8c52ee71e3d19dc7"
  //apikey="d093053d72bc40248998159804e0e67d"
  apikey = process.env.REACT_APP_NEWS_API_KEY

  render() {
    return (
      <div>
        <Router>
          <NavBar/>
          <Routes>
              <Route exact path='/' element={<News key="general" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="general"/>}/>
              <Route exact path='/general' element={<News key="general" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="general"/>}/>
              <Route exact path='/business'element={<News key="business" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="business"/>}/>
              <Route exact path='/entertainment' element={<News key="entertainment" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="entertainment" />}/>
              <Route exact path='/health' element={<News key="health" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="health" />}/>
              <Route exact path='/science' element={<News key="science" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="science" />}/>
              <Route exact path='/sports' element={<News key="sports" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="sports"/>}/>
              <Route exact path='/technology' element={<News key="technology" apikey={this.apikey} pageSize={this.pageSize} country={this.country} category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }
}
