import React from 'react';
import PropTypes from 'prop-types';
import './explorer.css';

export default class Explorer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { recipes: [] };
    this.clickRecipe = this.clickRecipe.bind(this);
  }

  componentDidMount() {
    const api = 'http://localhost:3001/api/recipes/all';
    (async () => {
      const req = await fetch(api);
      const data = await req.json();
      this.setState({ recipes: data });
    })();
  }

  clickRecipe(recipe) {
    return () => this.props.goToRecipe(recipe);
  }

  render() {
    return (
      <div id="recipes-explorer-container">
        {this.state.recipes.map((r, i) => {
          return (
            <div key={i} onClick={this.clickRecipe(r)}>
              <span>{r._fields[0].properties.title}</span>
              <img src={r._fields[0].properties.image} alt={r._fields[0].properties.image}/>
              <div className="recipe-item-footer">
                <div>
                  <i className="fas fa-utensils"></i>
                  <span>{r._fields[0].properties.servings}</span>
                </div>
                <div>
                  <i className="fas fa-dollar-sign"></i>
                  <span>{r._fields[0].properties.pricePerServing}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

Explorer.propTypes = {
  goToRecipe: PropTypes.func.isRequired
}
