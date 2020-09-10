import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import Header from "./components/header/Header.jsx";

function App() {
  return (
    <Router>
      <>
        <Header/>
        {/*<Switch>
          <Route
            exact path="/" render={ () => <MyMap/>}
          />
        </Switch>*/}
      </>
    </Router>
  );
}

export default App;
