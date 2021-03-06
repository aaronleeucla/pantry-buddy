import React, { useState } from 'react';
import cx from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem } from "reactstrap";
import { AddItemRow } from "../common/addItemRow/AddItemRow";
import { IconBtn } from "../common/iconBtn/IconBtn";
import { addRecipeName } from "../../actions/recipe";
import { extractHanlderIdFromEvent } from "../../helpers";
import { withIngredAvailCount } from "../../selectors";
import { recipeShape } from "../../models";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./index.module.scss";
import appStyles from "../../App.module.scss";

export function Recipes({ recipes, addRecipeName, history, match }){

  const [duplicates, setDuplicates] = useState({});

  function handleAddRecipe(name){
    isDuplicate(name) ? showValidationError(name) : addRecipeName(name)
  }

  function isDuplicate(name){
    return recipes.some(r => r.name === name);
  }

  function showValidationError(name){
    setDuplicates({ [name]: true });
    setTimeout(() => setDuplicates({}), 1500);
  }

  function navToEdit(e){
    const id = extractHanlderIdFromEvent(e);
    history.push(`${match.path}/${id}`)
  }

  return (
    <>
      <div className={styles.listHeader}>
        <div className="ml-2">Recipe</div>
        <div className="ml-auto">Available of Required</div>
      </div>
      <ListGroup>
        <TransitionGroup component={null}>
          {recipes.map((r) => (
          <CSSTransition
            key={r.id}
            timeout={{ enter: 200, exit: 400 }}
            className={appStyles.rowTransitions}>
            <div>
              <ListGroupItem className={cx("pl-3", { "invalid-blink border-bottom": duplicates[r.name] })}>
                <IconBtn icon="pencil-alt" label="edit" handlerId={r.id} clickHandler={navToEdit}/>
                <div className="d-flex w-100" onClick={() => history.push(`${match.path}/${r.id}`)}>
                  <div className="ml-2">{r.name}</div>
                  <div className="ml-auto">{r.available} of {r.required.length}</div>
                </div>
              </ListGroupItem>
            </div>
          </CSSTransition>
          ))}
        </TransitionGroup>
        <ListGroupItem className="pl-3">
          <AddItemRow addItemHandler={handleAddRecipe} label="recipe name"/>
        </ListGroupItem>
      </ListGroup>
    </>
  );
}

Recipes.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(recipeShape)),
  addRecipeName: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object
};

Recipes.defaultProps = { recipes: [] };

function mapStateToProps(state){
  return { recipes: withIngredAvailCount(state) }
}
function mapDispatchToProps(dispatch){
  return { addRecipeName: (name) => dispatch(addRecipeName(name)) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
