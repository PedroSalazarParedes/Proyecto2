import React from 'react';
import './App.css';
import Explorer from './explorer/Explorer';
import Recipe from './Recipe/Recipe';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actualMenu: 1,
      actualRecipe: undefined
    };
    this.goToRecipe = this.goToRecipe.bind(this);
  }

  goTo = (menu) => {
    return () => this.setState({ actualMenu: menu });
  };

  goToRecipe(r) {
    this.setState({
      actualMenu: 3,
      actualRecipe: r
    });
  }

  render() {

    let toRender = undefined;
    switch (this.state.actualMenu) {
      case 0:
        toRender = undefined;
        break;
      case 1:
        toRender = <Explorer goToRecipe={this.goToRecipe} />;
        break;
      case 2:
        toRender = undefined;
        break;
      case 3:
        toRender = <Recipe recipe={this.state.actualRecipe} />;
        break;
      default:
        toRender = (
          <div>
            Haga click en el menu
          </div>
        );
    }

    return (
      <div>
        <div id="header">
          <div>
            <button onClick={this.goTo(0)} className={this.state.actualMenu === 0 ? 'active' : ''}>Login</button>
            <button onClick={this.goTo(1)} className={this.state.actualMenu === 1 || this.state.actualMenu === 3 ? 'active' : ''}>Explorer</button>
            <button onClick={this.goTo(2)} className={this.state.actualMenu === 2 ? 'active' : ''}>Create</button>
          </div>
        </div>
        <div>{toRender}</div>
      </div>
    );
  }
}
