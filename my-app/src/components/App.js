
import './../styles/App.css';

import Banner from "./banner.js"
import Row    from "./row.js"
import Navbar    from "./navbar.js"

function App() {
  return(
    <div className="app">
      
      <Navbar />
      <Banner/>
      <Row title="Les plus gros succès sur MML"/>
      <Row title="Tendance actuelles"/>
      <Row title="Série palpitantes"/>
      <Row title="Documentaire"/>
      <Row title="Série d'actions"/>

    </div>
  )
}

export default App;
