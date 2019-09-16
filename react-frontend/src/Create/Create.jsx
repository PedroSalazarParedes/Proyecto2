import React from 'react';
import PropTypes from 'prop-types';

export default class Create extends React.Component {
  render() {
    return (
      <div>
        <h1>Create a new recipe!</h1>
        <div>
          <input placeholder="Title" />
          <input placeholder="Image Name" />
          <input type="number" placeholder="Health Score" />
          <input type="number" placeholder="Servings" />
          <input type="number" placeholder="Price Per Serving" />
        </div>
      </div>
    );
  }
}

Create.propTypes = {

}
