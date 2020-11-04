import axios from 'axios';

export const postMovie = (movie) => {
    return axios.post('http://localhost:5000/api/movies', movie);
}