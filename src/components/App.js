
import './../styles/App.css';

import Banner from "./banner.js"
import Row    from "./row.js"
import Navbar    from "./navbar.js"

// function App() {
//   return(
//     <div className="app">
//       <Navbar />
//       <Banner/>
//       <Row title="Les plus gros succès sur MML"/>
      
//       {/* <Row title="Tendance actuelles"/>
//       <Row title="Série palpitantes"/>
//       <Row title="Documentaire"/>
//       <Row title="Série d'actions"/> */}

//     </div>
//   )
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Switch>
        <Route path="/">
          <div className="app">
            <Navbar />
            <Banner/>
            <Row/>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}