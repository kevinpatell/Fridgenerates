import React, { useState } from 'react';
import TopNav from './TopNav';
import RandomRecipes from './RandomRecipes';
import IngredientsSearch from './IngredientsSearch';
import axios from 'axios';

const Landing = () => {

  const [recipeList, setRecipeList] = useState([]);
  
  const randomClick = () => {
    const url = `http://localhost:8000/random_recipes/`;

    axios.get(url)
    .then((response) => {
        setRecipeList(response.data.recipes);
    })
    .catch((error) => {
        console.log(error);
    });
  }

  return (
    <div className="center">
      <RandomRecipes randomHandler={randomClick} />
      <section className="Landing">
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
          <div className="Landing-title">
            <h2>Add your ingredients and receive matching recipes instantly !</h2>
          </div>
      </section>
      <IngredientsSearch recipeList={recipeList} setRecipeList={setRecipeList} />
    </div>
  );
}

export default Landing;