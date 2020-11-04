import axios from 'axios';

export const fetchMovie = (id) => {
    return axios.get(`http://localhost:5000/api/movies/${id}`);
};