import React from 'react';
import PropTypes from 'prop-types';
import './result.css';

export default class Result extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ingredients: {},
      recipes: []
    }
    this.updateIngredient = this.updateIngredient.bind(this);
    this.search = this.search.bind(this);
    this.clickRecipe = this.clickRecipe.bind(this);
  }

  updateIngredient(ingredient, active) {
    if (active) {
      this.setState((prevState) => {
        prevState.ingredients[ingredient.identity] = { ...ingredient, pos: Object.keys(prevState.ingredients).length };
        return prevState;
      });
    } else {
      this.setState((prevState) => {
        delete prevState.ingredients[ingredient.identity];
        return prevState;
      });
    }
  }

  search() {
    const api = 'https://hangryff.herokuapp.com/api/recipes/search';
    (async () => {
      const req = await fetch(api, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ingredients: Object.values(this.state.ingredients).map(i => i.name)
        })
      });
      const data = await req.json();
      this.setState({ recipes: data.map(r => r._fields).sort((a, b) => (a[1] - b[1])).map(d => ({ ...d[0].properties, extras: d[1] })) })
    })();
  }

  clickRecipe(recipe) {
    return () => this.props.goToRecipe(recipe);
  }

  render() {
    return (
      <div id="result-container">
        <div>
          {Object.values(this.state.ingredients).length !== 0 && Object.values(this.state.ingredients)
            .sort((a, b) => a.pos - b.pos)
            .map(i => (
              <span className="badge" key={i.identity}>{i.name}</span>
            ))}
          {Object.values(this.state.ingredients).length === 0 &&
            <span id="info">
              Add a Search Criteria
          </span>
          }
        </div>
        <div id="recipes-results-container">
          {this.state.recipes.map((r, index) => (
            <div className="recipe-result-item" key={`rec_${index}`} onClick={this.clickRecipe(r)}>
              <img src={r.image} alt={r.image} />
              <span>{r.title}</span>
              <span>Extra Ingredients: {r.extras}</span>
            </div>
          ))}
        </div>
        <button onClick={this.search}><i className="fas fa-search"></i></button>
      </div>
    );
  }
}

Result.propTypes = {
  goToRecipe: PropTypes.func.isRequired
}
