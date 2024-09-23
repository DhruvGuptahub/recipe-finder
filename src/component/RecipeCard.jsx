import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function RecipeCard({ recipe }) {

    const [isFavorite, setIsFavorite] = useState(false)

    const toggleFavorite = () => {
        try {
            const favoriteData = {
                id: recipe.id,      // Only store necessary data
                title: recipe.title
            };

            // Store in localStorage or perform other actions
            localStorage.setItem('favoriteRecipe', JSON.stringify(favoriteData));

            // Toggle the favorite state
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error handling favorites:', error);
        }
    };



    return (
        <div className='recipe-card'>
            <img src={recipe.image} alt={recipe.title}></img>
            <h3>{recipe.title}</h3>
            <Link to={`/recipe/${recipe.id}`}>View Details</Link>
            <button onClick={toggleFavorite}>{isFavorite ? 'Remove from Favorite' : 'Save to Favorite'}</button>
        </div>
    )
}

export default RecipeCard
