const movieList = [
    "Charlie et la chocolatrie",
    "La Reine des Neige 4"
]

function MovieList(){
    return(
        <ul>
            {movieList.map((movie, index) => (
                <li key={`$(plant)-$(index)`}>{movie}</li>
            ))}
        </ul>
    )
}

export default MovieList