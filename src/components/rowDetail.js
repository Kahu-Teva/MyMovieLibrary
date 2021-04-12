import "./../styles/RowDetail.css"
import YouTube from "react-youtube";
import { Link } from "react-router-dom";
var getYouTubeID = require("get-youtube-id");

function RowDetail({movie}){
    const trailerLink = movie.trailerLink;
    const id = getYouTubeID(trailerLink);
    const opts = {
        height: "420",
        width: "100%",
        playerVars: {
            rel:0,
            autoplay: 1,
            showinfo: 1,
            frameborder: 0,
        }
    }
    return(
        <div className="row__detail">
            <div className="row__detail_title">
                {movie.title + " ("+ movie.releaseDate +")"}
            </div>
            <Link to={`/movieDetails?id=${movie._id}`} className="link_more_info">
                <div className="link_more_info_ico"/>
                <span>Plus d'infos</span>
            </Link>
            <YouTube videoId={id} opts={opts} className="yt__window"/>
        </div>
    );
}
export default RowDetail;