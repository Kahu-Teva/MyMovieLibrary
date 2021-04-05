import {movieList} from '../datas/movieList.js'
import "./../styles/MovieList.css"

function MovieList(){
    const categories = movieList.reduce(
        (acc, movie) =>
            acc.includes(movie.category) ? acc : acc.concat(movie.category),
        []
    )

    return(
        <div className="movieList">
            <div className="gradient_div"></div>
            <ul style={{margin:0}}>
                {categories.map((cat) => (
                    <li key={cat}>{cat}</li>
                    ))}
            </ul>
            <ul>
                {movieList.map((movie) => (
                    <li key={movie.id}>{movie.nom}</li>
                    ))}
            </ul>
        </div>
    )
}

export default MovieList