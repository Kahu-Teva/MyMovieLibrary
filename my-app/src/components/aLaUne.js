import "./../styles/ALaUne.css"
import logo from "./../assets/aLaUne.jpg"

function ALaUne(){
    let titleMovie = "RIVERDALE"
    let infoMovie = "Naviguant dans les eaux troubles du sexe, de l'amour, de l'éducation et de la famille, Archie et ses amis se retrouvent plongés au cœur d'une mystérieuse affaire."
    return(
        <div className="mml-alaune">
            <div className="mml-alaune__content">
                <img src={logo} alt="ALaUneMovieName" className="mml-logo" />

                <h2>{titleMovie}</h2>
                <p>
                    {infoMovie}
                </p>
                <button>
                    <span>Lecture</span>
                </button>
                <button>
                    <span>Plus d'infos</span>
                </button>
            </div>
        </div>
    )    
}

export default ALaUne