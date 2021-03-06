import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
import Pantry from "./components/pantry";
import Recipes from "./components/recipes";

//mocks the child components so that are not fully mounted
jest.mock('./components/pantry', () => () => <div/>);
jest.mock('./components/recipes', () => () => <div/>);

//because function is not implemented in jest
window.HTMLElement.prototype.scrollIntoView = function() {};

describe('App', ()=>{

  const store = configureStore()({});

  //Page Object Model
  function getComponent(path){
    const c = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[path]}>
          <App/>
        </MemoryRouter>
      </Provider>
    );

    //navigation links; enclosed in functions to provide latest snapshot
    c.pantryNavLink = () => c.find('a.nav-link[children="Pantry"]');
    c.recipesNavLink = () => c.find('a.nav-link[children="Recipes"]');

    return c;
  }

  it('redirects from / to /pantry', () => {
    const c = getComponent('/');
    expect(c.find(Pantry)).toHaveLength(1);
    expect(c.find(Recipes)).toHaveLength(0);
  });

  it('renders at /pantry', () => {
    const c = getComponent('/pantry');
    expect(c.find(Pantry)).toHaveLength(1);
    expect(c.find(Recipes)).toHaveLength(0);
  });

  it('renders at /recipes', () => {
    const c = getComponent('/recipes');
    expect(c.find(Pantry)).toHaveLength(0);
    expect(c.find(Recipes)).toHaveLength(1);
  });

  it('navigates between /pantry and /recipe', () => {
    const c = getComponent('/pantry');

    //asserts initial nav button states
    expect(c.pantryNavLink().hasClass('active')).toBeTruthy();
    expect(c.recipesNavLink().hasClass('active')).not.toBeTruthy();

    //asserts transition to Recipes
    c.recipesNavLink().simulate('click', { button: 0 });
    expect(c.pantryNavLink().hasClass('active')).not.toBeTruthy();
    expect(c.recipesNavLink().hasClass('active')).toBeTruthy();
    expect(c.find(Recipes)).toHaveLength(1);

    //asserts transition back to Pantry
    c.pantryNavLink().simulate('click', { button: 0 });
    expect(c.find(Pantry)).toHaveLength(1);

  });

});

