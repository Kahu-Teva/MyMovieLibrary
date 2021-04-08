import "./../styles/RowDetail.css"
import YouTube from "react-youtube";
var getYouTubeID = require("get-youtube-id");

function RowDetail({info}){
    const trailerLink = info.trailerLink + "/embed/";
    const id = getYouTubeID(trailerLink);
    const opts = {
        height: "390",
        width: "96%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1
        }
    }
    return(
        <div className="row__detail">
            <div className="title">{info.title}</div>
            <YouTube videoId={id} opts={opts} className="yt__window"/>
        </div>
    );
}
export default RowDetail;