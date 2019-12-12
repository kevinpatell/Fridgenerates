import React from 'react';
import $ from 'jquery';

const RandomRecipes = ( {randomHandler} ) => {

    $(".Ingredients-button").click(function() {
        $('html, body').animate({
            scrollTop: $(".recipe-container").offset().top},
            'slow');
        });

        return (
        <div className="Recipes-form">
            <button onClick={randomHandler} className="Ingredients-button" type='button'>Get Random Recipes</button>
        </div>
        );
    };


export default RandomRecipes;