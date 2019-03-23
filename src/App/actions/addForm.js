import Action from "./";

//keeps track of the state of the form (checkbox, select),
//except for the text input, which is maintained locally on that component
export function updateAddIngForm(form){
  return { type: Action.INGRED_FORM_UPDATE, form }
}