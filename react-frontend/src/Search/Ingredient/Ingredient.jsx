import React from 'react';
import PropTypes from 'prop-types';

export default class Ingredient extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
    this.selectIngredientHandler = this.selectIngredientHandler.bind(this);
  }

  selectIngredientHandler() {
    this.setState((prevState) => ({ active: !prevState.active }), () => {
      this.props.newIngredientHandler(this.props.ingredient, this.state.active);
    });
  }

  render() {
    return (
      <div
        key={`ing_${this.props.ingredient.identity}`}
        className={`ingredient-item ${(this.state.active ? 'active' : '')}`}
        onClick={this.selectIngredientHandler}>
        <img src={`https://spoonacular.com/cdn/ingredients_100x100/${this.props.ingredient.image}`} alt={this.props.ingredient.image} />
        <span>{this.props.ingredient.name}</span>
      </div>
    );
  }
}

Ingredient.propTypes = {
  ingredient: PropTypes.object.isRequired,
  newIngredientHandler: PropTypes.func.isRequired
}
