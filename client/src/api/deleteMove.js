import axios from 'axios';

export const deleteMovie = (id) => {
    return axios.delete(`http://localhost:5000/api/movies/${id}`);
};