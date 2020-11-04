import axios from 'axios';

export const getMovieList = () => {
    return axios.get('http://localhost:5000/api/movies');
};