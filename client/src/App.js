import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from './Movies/UpdateMovieForm';
import AddMovieForm from './Movies/AddMovieForm';

import { getMovieList } from './api/getMovieList';

import '../node_modules/bulma/css/bulma.min.css';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [requestMade, setRequestMade] = useState(false);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList()
      .then(res => {
        setMovieList(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  }, [requestMade, ]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovieForm setRequestMade={setRequestMade} />
      </Route>

      <Route path="/add-movie">
        <AddMovieForm setRequestMade={setRequestMade} />
      </Route>
    </>
  );
};

export default App;
