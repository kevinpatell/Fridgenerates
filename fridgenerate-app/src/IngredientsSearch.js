import React, { useState } from 'react';
import ReactTags from 'react-tag-autocomplete';
import axios from 'axios';
import RecipeDetails from './RecipeDetails';
import Results from './Results';
import $ from 'jquery';


const IngredientsSearch = ( {recipeList, setRecipeList} ) => {

    const [tags, setTags] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState({})

    const handleDelete = (i) => {
        console.log("Handle delete:", i);
        let newTags = tags.slice(0);
        newTags.splice(i, 1);

        setTags( newTags );
    };

    const handleAddition = (tag) => {
        console.log("Addition:", tag);
        const newTags = [].concat(tags, tag);
        setTags( newTags );
    };

    const handleSuggestion = (() => {
        const url = `http://localhost:8000/api/ingredients/`;
        axios.get(url)
        .then((response) => {
            setSuggestions(response.data);
        })
        .catch((error) => {
            console.log(error);
        })
    });

    
    const [suggestions, setSuggestions] = useState(handleSuggestion);

    const handleSubmit = (e) => {
        e.preventDefault();

        const url = "http://localhost:8000/recipes/";
        console.log("Tags:", tags);

        axios.post(url, {
            'data': {'ingredients': tags.map((tag) => tag.name).join(",")}
        })
        .then(response => {
            setRecipeList(response.data.recipes)
        })
        .catch(e => {
            console.log("errors:", e)
        });
    };

    function recipeTitle() {
        if (recipeList.length !== 0) {
            return (
                <div className="recipe-list-title">Recipes(15): </div>
            )
        }
    }

    $(".Ingredients-button").click(function() {
        $('html, body').animate({
            scrollTop: $(".recipe-container").offset().top},
            'slow');
        });

    function resultsConditional() {
        if (recipeList.length !== 0) {
            return (
                <section className="results">
                    <Results setCurrentRecipe={setCurrentRecipe} recipeList={recipeList} />
                </section>
            )
        }
    }

    
    return (
        <div className="s">
            <form onSubmit={handleSubmit}>
                <ReactTags
                    tags={tags}
                    suggestions={suggestions}
                    handleSuggestion={handleSuggestion}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    placeholder="Add an ingredient..." 
                    maxSuggestionsLength={6} />
                <div className="btn">
                    <button className="Ingredients-button" type="submit">I'm Feeling Hungry</button>
                </div>
            </form>
            
            <div className ='recipe-container'>
                {recipeTitle()}
                {resultsConditional()}
                <section className='recipe'>
                    <RecipeDetails currentRecipe={currentRecipe} setCurrentRecipe={setCurrentRecipe} />
                </section>
            </div>
        </div>
    )
};




export default IngredientsSearch;
