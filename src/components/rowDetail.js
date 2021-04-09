import "./../styles/RowDetail.css"
import YouTube from "react-youtube";
import MovieDetails from "./MovieDetails";
var getYouTubeID = require("get-youtube-id");

function RowDetail({info}){
    const trailerLink = info.trailerLink + "/embed/";
    const id = getYouTubeID(trailerLink);
    const opts = {
        height: "420",
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
    }
    return(
        <div className="row__detail">
            <div className="row__detail_title">{info.title}</div>
            <YouTube videoId={id} opts={opts} className="yt__window"/>
            <MovieDetails/>
        </div>
    );
}
export default RowDetail;