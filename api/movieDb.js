import axios from "axios";
import { apiKey, apiToken } from "../constants/index.js"


// Endpoints

const apiBaseUrl = "https://api.themoviedb.org/3";

const trendingMoviesUrl = `${apiBaseUrl}/trending/movie/day?apiKey=${apiKey}`;
const upcomingMoviesUrl = `${apiBaseUrl}/movie/upcoming?apiKey=${apiKey}`;
const topRatedMoviesUrl = `${apiBaseUrl}/movie/top_rated?apiKey=${apiKey}`;
const movieDetailUrl = (id) => `${apiBaseUrl}/movie/${id}?apiKey=${apiKey}`;
const similarMoviesUrl = (id) => `${apiBaseUrl}/movie/${id}/similar?apiKey=${apiKey}`;
const movieCastUrl = (id) => `${apiBaseUrl}/movie/${id}/credits?apiKey=${apiKey}`;
const personDetailsUrl = (id) => `${apiBaseUrl}/person/${id}?apiKey=${apiKey}`;
const moviesWithThisActorUrl = (id) => `${apiBaseUrl}/person/${id}/movie_credits?apiKey=${apiKey}`;
const searchMovieUrl = (movie) => `${apiBaseUrl}/search/movie?query=${movie}&include_adult=false&apiKey=${apiKey}`;

const moviePageUrl = (type, page) => `${apiBaseUrl}/movie/${type}?page=${page}&apiKey=${apiKey}`;


export const image500 = (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w500${imgPath}` : null; 
export const image342 = (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w342${imgPath}` : null; 
export const image185 = (imgPath) => imgPath ? `https://image.tmdb.org/t/p/w185${imgPath}` : null; 


// fallback images 
export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';
export const fallbackPersonImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmUiF-YGjavA63_Au8jQj7zxnFxS_Ay9xc6pxleMqCxH92SzeNSjBTwZ0l61E4B3KTS7o&usqp=CAU';


const apiCall = async(endpoint, params) =>{

  const options = {
    method:"GET",
    url: endpoint,
    params: params ? params : {},
    headers:{
      "Accept": "application/json",
      "Authorization": `Bearer ${apiToken}`
    }
  };

  try{

    const response = await axios.request(options);
    
    return response.data

  }catch(error){

    console.log("ERROR", error);
    return {};
  }
};



export const fetchTrendingMovies = () =>{
  return apiCall(trendingMoviesUrl);
}

export const fetchUpcomingMovies = () =>{
  return apiCall(upcomingMoviesUrl);
}

export const fetchTopRatedMovies = () =>{
  return apiCall(topRatedMoviesUrl);
}

export const fetchMovieDetails = (movieId) =>{
  return apiCall(movieDetailUrl(movieId));
}

export const fetchSimilarMovies = (movieId) =>{
  return apiCall(similarMoviesUrl(movieId));
}

export const fetchMovieCast = (movieId) =>{
  return apiCall(movieCastUrl(movieId));
}

export const fetchPersonDetails = (personId) =>{
  return apiCall(personDetailsUrl(personId));
}

export const fetchMoviesWithThisActor = (personId) =>{
  return apiCall(moviesWithThisActorUrl(personId));
}

export const fetchSearchMovie = (movie) =>{
  return apiCall(searchMovieUrl(movie));
}

export const fetchMoviePage = (type, page) =>{
  return apiCall(moviePageUrl(type, page));
}
