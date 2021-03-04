import React,{useState,useEffect} from 'react';
import Youtube from 'react-youtube';
import axios from './axios';
import movieTrailer from "movie-trailer";
import './Row.css';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl,isLargeRow}){

    const [movies,setMovies] = useState([]);

    const [trailerIdUrl,setTrailerIdUrl] = useState("");

    useEffect(()=>{
        //if [] run once when row loads and don't run again

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };

        fetchData();

    },[fetchUrl]);

    const opts = {
      height : "390",
      width : "100%",
      playerVars : {
        autoplay : "1",
      },
    };

    const handleClick = (movie) => {
        if(trailerIdUrl){
            setTrailerIdUrl("");
        }
        else{
            movieTrailer(movie?.title||movie?.name||"")
            .then(url => {
                const urlParams = new URLSearchParams(new URL(url).search);
                setTrailerIdUrl(urlParams.get("v"));                
            })
            .catch((error) => console.log(error));

        }
    }

    //console.log(movies);
    return (
        <div className="row">

            <h2 className="row_title">{title}</h2>

            <div className="row__posters">


                { movies.map(movie => (
                    <img 
                    key = {movie.id}
                    onClick = { () => handleClick(movie)}
                    className = {`row__poster ${isLargeRow && "row__LargeRow"}`}
                    src = {`${baseImgUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt = {movie.title} />
                ))}


            </div>

            <div>
                {trailerIdUrl &&  <Youtube videoId={trailerIdUrl} opts={opts} />
            }</div>

        </div>
    )
}

export default Row