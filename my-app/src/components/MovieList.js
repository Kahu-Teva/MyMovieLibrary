const movieList = [
    "Charlie et la chocolatrie",
    "La Reine des Neige 4",
    "Fast and Furious 7",
    "Terminator: La renaissance",

]

function MovieList(){
    return(
        <ul>
            {movieList.map((movie, index) => (
                <li key={`${movie}-${index}`}>{movie}</li>
            ))}
        </ul>
    )
}

export default MovieList