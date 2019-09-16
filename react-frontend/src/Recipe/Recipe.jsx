import React from 'react';
import PropTypes from 'prop-types';
import './recipe.css';

export default class Recipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipe: undefined
    };
  }

  componentDidMount() {
    const title = '_fields' in this.props.recipe ? this.props.recipe._fields[0].properties.title : this.props.recipe.title;
    (async () => {
      const req = await fetch(`http://localhost:3001/api/recipes/${encodeURIComponent(title)}`);
      const data = await req.json();
      this.parseRecipe(data);
    })();
  }

  parseRecipe(data) {
    const nodes = {};
    const rels = {};

    data
      .map(i => i._fields[0].segments)
      .flat()
      .forEach(i => {
        const relKey = `${i.relationship.start}->${i.relationship.end}`;
        if (!(i.end.identity in nodes)) {
          nodes[i.end.identity] = i.end;
        }
        if (!(i.start.identity in nodes)) {
          nodes[i.start.identity] = i.start;
        }
        if (!(relKey in rels)) {
          rels[relKey] = i.relationship;
        }
      });

    const recipe = Object.values(nodes).filter(n => n.labels[0] === 'Recipe')[0].properties;

    Object.values(rels)
      .filter(r => r.type === 'StepIngredient')
      .forEach(si => {
        const step = nodes[si.start];
        if (!('ingredients' in step.properties)) {
          step.properties.ingredients = [];
        }
        step.properties.ingredients.push({ ...nodes[si.end].properties, meta: si.properties });
      });

    Object.values(rels)
      .filter(r => r.type === 'StepEquipment')
      .forEach(si => {
        const step = nodes[si.start];
        if (!('equipment' in step.properties)) {
          step.properties.equipment = [];
        }
        step.properties.equipment.push({ ...nodes[si.end].properties, meta: si.properties });
      });

    recipe.steps = {};
    Object.values(rels)
      .filter(r => r.type === 'StepLink')
      .forEach(s => recipe.steps[s.properties.step] = nodes[s.end].properties);

    this.setState({ recipe });
  }

  render() {
    let toRender = (
      <div>
        Loading...
      </div>
    );
    if (this.state.recipe) {
      toRender = (
        <div id="recipe-container">
          <div>
            <div>
              <h1>{this.state.recipe.title}</h1>
              <img src={this.state.recipe.image} alt={this.state.recipe.image} />
            </div>
            <div>
              <div>
                <i className="fas fa-heartbeat"></i>
                <span>{this.state.recipe.healthScore}</span>
              </div>
              <div>
                <i className="fas fa-utensils"></i>
                <span>{this.state.recipe.servings}</span>
              </div>
              <div>
                <i className="fas fa-dollar-sign"></i>
                <span>{this.state.recipe.pricePerServing}</span>
              </div>
              <div>
                <a href={this.state.recipe.source}>{this.state.recipe.sourceName}</a>
              </div>
            </div>
          </div>

          <div>
            {Object.keys(this.state.recipe.steps).map(k => {
              const s = this.state.recipe.steps[k];
              return (
                <div key={`step_${k}`} className="step">
                  <div>
                    <span>{`Step ${k}`}</span>
                    <span>{s.text}</span>
                  </div>
                  <div>
                    {s.ingredients &&
                      <div className="extra" >
                        <span>Ingredients</span>
                        <div>
                          {s.ingredients.map((i, index) => (
                            <div key={`ing_${index}`} className="ingredient">
                              <span>{i.name}</span>
                              <span>{(i.meta.meta && i.meta.meta.join(', ')) || '-'}</span>
                              <img src={`https://spoonacular.com/cdn/ingredients_100x100/${i.image}`} alt={i.image} />
                              <span>Quantity</span>
                              <span>{`${i.meta.amount} ${i.meta.measures_metric_unitLong}`}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                    {s.equipment &&
                      <div className="extra">
                        <span>Equipment</span>
                        <div>
                          {s.equipment.map((e, index) => (
                            <div key={`equ_${index}`} className="equipment">
                              <span>{e.name}</span>
                              <img src={`https://spoonacular.com/cdn/equipment_100x100/${e.image}`} alt={e.image} />
                            </div>
                          ))}
                        </div>
                      </div>
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    }
    return (
      toRender
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired
}
