export function updateElementInArray(arr, target, key, value){
  return arr.map(a => {
    if ( a !== target )
      return a;
    return {
      ...a,
      [key]: value
    }
  });
}

export function subDivideIngredients(allIngredients, categories){
  return allIngredients.reduce((groups, ing) => {
    groups[ing.categoryId].ingredients.push(ing);
    return groups;
  }, categories.map(c => {
    return {
      ingredients: [],
      category: c,
    };
  }))
}