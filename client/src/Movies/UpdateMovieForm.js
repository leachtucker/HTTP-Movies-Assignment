import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { fetchMovie } from '../api/fetchMovie';
import { putMovie } from '../api/putMovie';

import { Circle } from 'react-spinners-css';

const initialFormValues = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
};

const UpdateMovieForm = ({ setRequestMade }) => {
    const params = useParams();
    const { push } = useHistory();
    const id = params.id;

    const [formValues, setFormValues] = useState(initialFormValues);
    const [movie, setMovie] = useState();

    useEffect(() => {
        fetchMovie(id)
            .then(res => {
                setMovie(res.data);
                setFormValues({ title: res.data.title, director: res.data.director, metascore: res.data.metascore, stars: res.data.stars });
            })
            .catch(err => {
                console.log(err.response);
            });
    }, []);

    const onSubmit = evt => {
        evt.preventDefault();

        putMovie(id, {...formValues})
            .then(res => {
                setFormValues(initialFormValues);
                setRequestMade(true);
                push(`/movies/${id}`);
            })
            .catch(err => {
                console.log(err.response);
            })
    };

    const onChange = evt => {
        // The stars input needs to be split and converted to an array before storing it in state
        if (evt.target.name === "stars") {
            const stars = evt.target.value.split(', ');
            setFormValues({ ...formValues, stars: stars });
        } else {
            setFormValues({ ...formValues, [evt.target.name]: evt.target.value });
        }
    };

    if (!movie) {
        return (
            <div className="container has-text-centered">
                <Circle size={32} />
            </div>
        );
    }

    return (
        <div className='box save-wrapper'>
            <div className="has-text-centered">
                <h2 className="title is-5">Update Movie</h2>
                <h3 className="subtitle is-7 highlighted tag is-info">{movie.title}</h3>
            </div>
            <form onSubmit={onSubmit}>
                <div className="field">
                    <label className="label">Title:</label>
                    <div className="control">
                        <input className="input" name="title" value={formValues.title} onChange={onChange} type="text" placeholder="Mr. & Mrs. Smith" required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Director:</label>
                    <div className="control">
                        <input className="input" name="director" value={formValues.director} onChange={onChange} type="text" placeholder="Doug Liman" required />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Metascore:</label>
                    <div className="control">
                        <input className="input" name="metascore" value={formValues.metascore} onChange={onChange} type="number" placeholder="75" required />
                    </div>
                    <p className="help is-caution">Enter only positive integers within 0-100</p>
                </div>
                <div className="field">
                    <label className="label">Stars:</label>
                    <div className="control">
                        <input className="input" name="stars" value={formValues.stars.join(', ')} onChange={onChange} type="text" placeholder="Brad Pitt, Angelina Jolie" required />
                    </div>
                    <p className="help">Enter actor names in "x, y, z" format.</p>
                </div>
                <div className="field is-grouped center">
                    <p className="control center">
                        <button className="button is-primary">
                            Submit
                        </button>
                    </p>
                    <p className="control center">
                        <button className="button is-light" onClick={() => push(`/movies/${id}`)}>
                            Cancel
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default UpdateMovieForm;