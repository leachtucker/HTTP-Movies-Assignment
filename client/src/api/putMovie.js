import axios from 'axios';

export const putMovie = (id, movie) => {
    const updatedMovie = {...movie, id: id};
    return axios.put(`http://localhost:5000/api/movies/${id}`, updatedMovie);
};