import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from 'react-bootstrap'
import './App.css';

import Header from "./layouts/Header.jsx";
import Main from "./layouts/Main.jsx";

function App() {
  return (
    <Router>
      <Container>
        <Header/>
        <Main/>
        {/*<Switch>
          <Route
            exact path="/" render={ () => <MyMap/>}
          />
        </Switch>*/}
      </Container>
    </Router>
  );
}

export default App;
