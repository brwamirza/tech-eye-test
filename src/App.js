import React, { Component } from 'react';
import './App.css';
import './Vendor.js';
import Home from './components/Home.js';
import Products from './components/Products.js'
import PageNotFound from './components/PageNotFound.js'
import { BrowserRouter as Router, Switch, Route,  } from "react-router-dom";

class App extends Component {

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/test" component={PageNotFound} />
          <Route path={["/products/:id1/:id2/:id3","/products/:id1/:id2","/products/:id1","/products"]} component={Products} />
          <Route exact component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
