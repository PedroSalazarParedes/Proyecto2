import React from 'react';
import './App.css';
import Explorer from './explorer/Explorer';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      actualMenu: -1
    };
  }

  goTo = (menu) => {
    return () => this.setState({ actualMenu: menu });
  };

  render() {

    let toRender = undefined;
    switch (this.state.actualMenu) {
      case 0:
        toRender = undefined;
        break;
      case 1:
        toRender = <Explorer />;
        break;
      case 2:
        toRender = undefined;
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
        <div>
          <button onClick={this.goTo(0)}>Login</button>
          <button onClick={this.goTo(1)}>Explorer</button>
          <button onClick={this.goTo(2)}>Create</button>
        </div>
        <div>{toRender}</div>
      </div>
    );
  }
}
