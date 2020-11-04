import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { postMovie } from '../api/postMovie';

const initialFormValues = {
    title: "",
    director: "",
    metascore: 0,
    stars: []
};

const AddMovieForm = ({ setRequestMade }) => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { push } = useHistory();

    const onSubmit = evt => {
        evt.preventDefault();

        postMovie({...formValues})
            .then(res => {
                setFormValues(initialFormValues);
                setRequestMade(true);
                push('/');
            })
            .catch(err => console.log(err.response));
    };

    const onChange = evt => {
        evt.preventDefault();

        if (evt.target.name === "stars") {
            const stars = evt.target.value.split(', ');
            setFormValues({ ...formValues, stars: stars });
        } else {
            setFormValues({ ...formValues, [evt.target.name]: evt.target.value });
        }
    };

    return (
        <div className="box save-wrapper">
            <div className="has-text-centered">
                <h2 className="title is-5">Add Movie</h2>
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
                        <button className="button is-light" onClick={() => push(`/`)}>
                            Cancel
                        </button>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default AddMovieForm;