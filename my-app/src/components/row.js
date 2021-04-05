
import {movieList} from './../datas/movieList.js'
import bgRow from "./../assets/filmtest.jpg"
import "./../styles/Row.css"

function Row({title}){
    return(
        <div className="row">
            <h2 className="row__title">{title}</h2>
            <div className="row__posters">
                {movieList.map((movie) => (
                    <img
                        key={movie.id}
                        className="row__poster"
                        src={bgRow}
                        alt={movie.nom}
                    />
                ))}
            </div>
        </div>
    )
}

export default Row