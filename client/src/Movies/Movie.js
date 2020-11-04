import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

import { fetchMovie } from '../api/fetchMovie';
import { deleteMovie } from '../api/deleteMove';

import { Circle } from 'react-spinners-css';

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const { push } = useHistory();

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const redirectToEdit = (id) => {
    push(`/update-movie/${id}`);
  };

  const onDelete = (id) => {
    deleteMovie(id)
      .then(res => {
        push('/');
      })
      .catch(err => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id)
      .then(resp => {
        setMovie(resp.data);
      })
      .catch(err => {
        console.log(err.response);
      });

  }, [params.id]);

  if (!movie) {
    return (
      <div className="container has-text-centered">
        <Circle size={32} />
      </div>
    );
  }

  return (
    <div className="save-wrapper box">
      <MovieCard movie={movie} />
      <div className="controls-group">
        <div className="button is-primary" onClick={saveMovie}>
          Save
        </div>
        <div className="button is-warning" onClick={() => {redirectToEdit(movie.id)}} >
          Edit
        </div>
        <div className="button is-danger" onClick={() => {onDelete(movie.id)}} >
          Delete
        </div>
      </div>
    </div>
  );
}

export default Movie;
