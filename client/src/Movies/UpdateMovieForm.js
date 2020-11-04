import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const initialFormValues = {
    title: "",
    director: "",
    metascore: undefined,
    stars: []
};

const UpdateMovieForm = () => {
    const params = useParams();
    const { push } = useHistory();
    const id = params.id;

    const [formValues, setFormValues] = useState(initialFormValues);

    const onChange = evt => {
        // The stars input needs to be split and converted to an array before storing it in state
        if (evt.target.name === "stars") {
            const stars = evt.target.value.split(', ');
            setFormValues({ ...formValues, stars: stars });
        } else {
            setFormValues({ ...formValues, [evt.target.name]: evt.target.value });
        }
    };

    return (
        <div className='box save-wrapper'>
            <div className="has-text-centered">
                <h2 className="title is-5">Update Movie</h2>
            </div>
            <form>
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
                        <input className="input" name="stars" value={formValues.stars.join(', ')} onChange={onChange} type="text" placeholder="Brad Pitt, Angelina Jolie, Seth Rogen" required />
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