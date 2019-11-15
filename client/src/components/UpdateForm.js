import React, { useState } from 'react';
import axios from 'axios';

const UpdateForm = props => {
  const [movie, setMovie] = useState({
    id: props.match.params.id,
    title: '',
    director: '',
    metascore: '',
    stars: []
  });
  console.log("Initial Movie",movie);
  const handleSubmit = e => {
    e.preventDefault();
    console.log("Sending:",movie);
    axios
      .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
      .then (res => {
        props.updateItems(res.data);
        props.history.push('/movie-list');
      })
      .catch(err => console.log(err));
  }

  const handleChange = e => {
    setMovie({
      ...movie, [e.target.name]: e.target.value
    });
  }

  return (
    <div className="updateContainer">
      <h3>Updating Movie ID: {props.match.params.id}</h3>
      <form>
        <input
          type="text"
          name="title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          type="text"
          name="metascore"
          value={movie.metascore}
          onChange={handleChange}
        />
        <input
          type="text"
          name="stars"
          value="LEAVE BLANK!"
          onChange={handleChange}
        />
        <button
          type="button"
          value="Submit"
          onClick={handleSubmit}>Update
        </button>
      </form>
    </div>
  )
}

export default UpdateForm;