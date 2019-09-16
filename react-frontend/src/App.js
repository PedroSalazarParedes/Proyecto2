import React from 'react';
import './App.css';
import Explorer from './Explorer/Explorer';
import Recipe from './Recipe/Recipe';
import Login from './Login/Login';
import Search from './Search/Search';
import Create from './Create/Create';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actualMenu: 4,
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
        toRender = <Login />;
        break;
      case 1:
        toRender = <Explorer goToRecipe={this.goToRecipe} />;
        break;
      case 2:
        toRender = <Create/>;
        break;
      case 3:
        toRender = <Recipe recipe={this.state.actualRecipe} />;
        break;
      case 4:
        toRender = <Search goToRecipe={this.goToRecipe} />;
        break;
      default:
        toRender = (
          <div>
            Hangryff
          </div>
        );
    }

    return (
      <div>
        <div id="header">
          <div>
            <button onClick={this.goTo(0)} className={this.state.actualMenu === 0 ? 'active' : ''}>Login</button>
            <button onClick={this.goTo(1)} className={this.state.actualMenu === 1 || this.state.actualMenu === 3 ? 'active' : ''}>Explorer</button>
            {/* <button onClick={this.goTo(2)} className={this.state.actualMenu === 2 ? 'active' : ''}>Create</button> */}
            <button onClick={this.goTo(4)} className={this.state.actualMenu === 4 ? 'active' : ''}>Search</button>
          </div>
        </div>
        <div>{toRender}</div>
      </div>
    );
  }
}
