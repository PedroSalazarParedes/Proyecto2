import React from 'react';
import PropTypes from 'prop-types';
import './search.css';
import Ingredient from './Ingredient/Ingredient';
import Result from './Result/Result';

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchCriteria: 1,
      ingredients: []
    };
    this.searchCriteriaHandler = this.searchCriteriaHandler.bind(this);
    this.newIngredientHandler = this.newIngredientHandler.bind(this);
    this.resultRef = React.createRef();
  }

  componentDidMount() {
    const api = 'https://hangryff.herokuapp.com/api/ingredients/all';
    (async () => {
      const req = await fetch(api);
      const data = await req.json();
      const ings = data.records
        .map(i => ({ ...i._fields[0].properties, identity: i._fields[0].identity }))
        .sort((a, b) => (a.name.toLowerCase() < b.name.toLowerCase()) ? -1 : 1);

      this.setState({ ingredients: ings });
    })();
  }

  searchCriteriaHandler(sc) {
    return () => this.setState({ searchCriteria: sc });
  }

  newIngredientHandler(ingredient, active) {
    this.resultRef.updateIngredient(ingredient, active);
  }

  render() {
    let searchInput = (
      <div id="name-search-container">
        <div>
          <input placeholder="Recipe Name" />
          <button>Search</button>
        </div>
      </div>
    );
    if (this.state.searchCriteria === 1) {
      searchInput = (
        <div id="ingredients-search-container">
          {this.state.ingredients.length===0  && 
          <span>Cargando...</span>}
          {this.state.ingredients.map((i, index) => (
            <Ingredient ingredient={i} key={`ing_${index}`} newIngredientHandler={this.newIngredientHandler} />
          ))}
        </div>
      );
    }
    return (
      <div id="search-container">
        <div>
          <div>
            {/* <button onClick={this.searchCriteriaHandler(0)} className={this.state.searchCriteria === 0 ? 'active' : ''}>By Name</button> */}
            <button onClick={this.searchCriteriaHandler(1)} className={this.state.searchCriteria === 1 ? 'active' : ''}>By Ingredients</button>
          </div>
          {searchInput}
        </div>
        <div>
          <Result ref={(r) => this.resultRef = r} goToRecipe={this.props.goToRecipe} />
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  goToRecipe: PropTypes.func.isRequired
}
