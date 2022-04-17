// import logo from './logo.svg';
import './App.css';

import React from 'react'
import NavBar from './components/NavBar';
import News from './components/News';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const App = () => {
  let pageSize=10
  let country="in"
  //apikey="170ccfe47e0c4d4c8c52ee71e3d19dc7"
  //apikey="d093053d72bc40248998159804e0e67d"
  let apikey = process.env.REACT_APP_NEWS_API_KEY
    return (
      <div>
        <Router>
          <NavBar/>
          <Routes>
              <Route exact path='/' element={<News key="general" apikey={apikey} pageSize={pageSize} country={country} category="general"/>}/>
              <Route exact path='/general' element={<News key="general" apikey={apikey} pageSize={pageSize} country={country} category="general"/>}/>
              <Route exact path='/business'element={<News key="business" apikey={apikey} pageSize={pageSize} country={country} category="business"/>}/>
              <Route exact path='/entertainment' element={<News key="entertainment" apikey={apikey} pageSize={pageSize} country={country} category="entertainment" />}/>
              <Route exact path='/health' element={<News key="health" apikey={apikey} pageSize={pageSize} country={country} category="health" />}/>
              <Route exact path='/science' element={<News key="science" apikey={apikey} pageSize={pageSize} country={country} category="science" />}/>
              <Route exact path='/sports' element={<News key="sports" apikey={apikey} pageSize={pageSize} country={country} category="sports"/>}/>
              <Route exact path='/technology' element={<News key="technology" apikey={apikey} pageSize={pageSize} country={country} category="technology"/>}/>
          </Routes>
        </Router>
      </div>
    )
}

export default App