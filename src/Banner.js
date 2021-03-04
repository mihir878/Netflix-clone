import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './requests';

function Banner(){

    const [movies,setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(request.data.results[
                Math.floor(Math.random()*request.data.results.length)
            ]);
        }
        fetchData();
    },[]);

    console.log(movies);

    /*function truncate(str, n) {
        return str.length > n ? str.substr(0, n-1) + '…' : str;
      }*/

    return(
        <header className="banner"
        style = {{
            backgroundSize : "cover",
            backgroundImage : `url(
                https://image.tmdb.org/t/p/original${movies?.backdrop_path}
            )`,
            backgroundPosition : "center center"
            
        }}
        >
            
            <div className="banner_contents">
            <h1 className="banner_title">
                {movies?.title||movies?.name||movies?.original_name}
            </h1>
            <div>
                <button className="banner_button">Play</button>
                <button className="banner_button ">My List</button>
            </div>
            <h1 className="banner_description">{movies?.overview}</h1>
            </div>
            <div className="banner_fadedButton"/>
        </header>
    )
}

export default Banner;