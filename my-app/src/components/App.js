
import Banner from "./banner.js"
import Row from "./row.js"
// import MovieList from './movieList.js';
import './../styles/App.css';

function App() {
  return(
    <div className="app">

      {/* * Nav bar * */}
      <Banner/>
      
      
      
      {/* <MovieList/> */}
      <Row title="Les plus gros succès sur MML"/>
      <Row title="Tendance actuelles"/>
      <Row title="Série palpitantes"/>
      <Row title="Documentaire"/>
      <Row title="Série d'actions"/>

    </div>
  )
}

export default App;
