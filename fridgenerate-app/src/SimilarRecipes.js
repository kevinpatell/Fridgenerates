import React, { useState } from 'react';
import axios from 'axios';

const SimilarRecipes = ( {currentRecipe, setCurrentRecipe} ) => {

    const [similarRecipesList, setSimilarRecipesList] = useState([])

    const similarRecipesClick = (e) => {
        e.preventDefault();

        const url = 'http://localhost:8000/similar_recipes/';
    
        axios.post(url, {
            'data': {
                'recipe_id': currentRecipe.id
            }
        })
        .then((response) => {
            setSimilarRecipesList(response.data.recipes)
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <div>
            <button className="Ingredients-button" onClick={similarRecipesClick} type='button'>Click for Similar Recipes</button>
            <ul>
                {
                    similarRecipesList.map( (recipe) => {

                        const handleClick = (e) => {
                            e.preventDefault();

                            const url = "http://localhost:8000/recipe_details/";

                            axios.post(url, {
                                'data': {
                                    'recipe_id': recipe.id
                                }
                            })
                            .then(response => {
                                setCurrentRecipe(response.data)
                                setSimilarRecipesList([])
                            })
                            .catch(e => {
                                console.log("errors", e)
                            })
                        }

                        return (
                            <li onClick={handleClick} className='similar-recipe-info'>
                                <p className="similar-recipe-result-name">      {recipe.name}
                                </p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
        
    )
} 

export default SimilarRecipes;