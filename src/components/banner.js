import React from "react"
import "./../styles/Banner.css"
import bgBanner from "./../assets/aLaUne.jpg"

function truncate(str, n){
    return str?.length > n ? str.substr(0, n - 1) + "..." :str;
}

function Banner() {
    let titleMovie = "RIVERDALE"
    let description = "Naviguant dans les eaux troubles du sexe, de l'amour, de l'éducation et de la famille, Archie et ses amis se retrouvent plongés au cœur d'une mystérieuse affaire."
    return (
        <header className="banner"
            style={{
                backgroundSize:`cover`,
                backgroundImage: `url(`+bgBanner+`)`,
                backgroundPosition:`center center`
            }}
        >

            <div className="banner__contents">
                <h1 className="banner__title">{titleMovie}</h1>
                <p className="banner__description">
                    {truncate(description,150)}
                </p>
                <div className="banner__buttons">                    
                    <button className="banner__button button_play">
                        <div className="banner__button_ico"/>
                        <span>Lecture</span>
                    </button>
                    <button className="banner__button button_more_info">
                        <div className="banner__button_ico"/>
                        <span>Plus d'infos</span>
                    </button>                
                </div>
            </div>
            <div className="banner__fadeBottom"></div>
            
        </header>
    )
}

export default Banner