import React, { useState, useEffect } from 'react';
import { Modal, ModalBody, Input } from "reactstrap";
import cx from "classnames";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { addIngredient } from "../../../actions/ingredient";
import { categoryShape } from "../../../models";

export function AddIngredientModal({ isOpen, unlistedIng, close, addIngredient, categories }){

  const [categoryId, setCategoryId] = useState("");
  const [showErrorBlink, setBlink] = useState(false);
  const [hadError, setError] = useState(false);

  useEffect(() => { setTimeout(() => setCategoryId(""), 500) }, [isOpen]);

  function prepAddIngred(){
    if ( categoryId === "" ){
      showValidationError();
    } else {
      const ingredient = makeIngredient(unlistedIng, categoryId);
      addIngredient(ingredient);
      setError(false);
      close();
    }
  }

  function showValidationError(){
    setBlink(true);
    setError(true);
    setTimeout(() => setBlink(false), 1500);
  }

  function makeIngredient({ name }, categoryId, isAvailable = false){
    return { name, categoryId, isAvailable };
  }

  function onCategoryChange(e){
    setCategoryId(Number(e.target.value));
  }

  return (
    <Modal isOpen={isOpen}>
      <ModalBody className="text-center">
        <h3 className="p-2">Add "{unlistedIng && unlistedIng.name}" to Pantry</h3>
        <Input
          onChange={onCategoryChange}
          value={categoryId}
          type="select"
          className={cx("mt-3", { "invalid-blink": showErrorBlink })}>
          <option disabled value="">select type</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </Input>
        { hadError &&
        <div role="alert" className="sr-only">must have a food category</div>
        }
      </ModalBody>
      <div className="d-flex justify-content-around p-3">
        <button className="btn btn-light border w-50 mr-2" onClick={close}>Cancel</button>
        <button className="btn btn-primary w-50 ml-2" onClick={prepAddIngred}>Add</button>
      </div>
    </Modal>
  )
}

AddIngredientModal.propTypes = {
  isOpen: PropTypes.bool,
  unlistedIng: PropTypes.shape({ name: PropTypes.string }),
  close: PropTypes.func,
  addIngredient: PropTypes.func,
  categories: PropTypes.arrayOf(PropTypes.shape(categoryShape))
};

AddIngredientModal.defaultProps = {
  categories: []
};

function mapStateToProps({ categories }){
  return { categories }
}
function mapDispatchToProps(dispatch){
  return { addIngredient: (ing) => dispatch(addIngredient(ing)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddIngredientModal);
