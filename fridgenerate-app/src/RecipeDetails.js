import React, { useState } from 'react';
import axios from 'axios';
import SimilarRecipes from './SimilarRecipes'

const RecipeDetails = ({ currentRecipe, setCurrentRecipe }) => {


    function recipeDetails() {
        if (currentRecipe.id) {
            return (
                <div className="recipe-summary">
                    <div className="recipe-details-name"><h1> {currentRecipe.name}</h1></div>
                    <div className="recipe-details-img"><img src={currentRecipe.image} alt={currentRecipe.name}/></div>
                    <div className="recipe-details-org">
                        <p>
                            <span className="recipe-details-span">Ingredients: </span>
                            <br/>
                            <br/>
                            {currentRecipe.originalString.map(ingredient => (
                                <li>{ingredient}</li>
                            ))}
                        </p>
                    </div>
                    <div className="recipe-details-inst"><p><span className="recipe-details-span">Instructions: </span>
                    <br/>
                    <br/>
                    {currentRecipe.instructions}</p></div>
                    <SimilarRecipes currentRecipe={currentRecipe} setCurrentRecipe={setCurrentRecipe} />
                </div>
            )
        }
    }

    return (
        <section className="recipe-details">
            {recipeDetails()}
        </section>
    )
};


export default RecipeDetails;