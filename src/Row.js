import React,{useState,useEffect} from 'react';
import axios from './axios';
import './Row.css';

const baseImgUrl = "https://image.tmdb.org/t/p/original";

function Row({title,fetchUrl,isLargeRow}){

    const [movies,setMovies] = useState([]);

    useEffect(()=>{
        //if [] run once when row loads and don't run again

        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        };

        fetchData();

    },[fetchUrl]);

    console.log(movies);

    return (
        <div className="row">

            <h2 className="row_title">{title}</h2>

            <div className="row__posters">


                { movies.map(movie => (
                    <img 
                    key = {movie.id}
                    className = {`row__poster ${isLargeRow && "row__LargeRow"}`}
                    src = {`${baseImgUrl}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt = {movie.title} />
                ))}


            </div>

        </div>
    )
}

export default Row