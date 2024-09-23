import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import '../App.css'



function RecipeDetails() {
    const { id } = useParams()
    const [recipe, setRecipe] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_KEY = 'abfda5402f214aeab31fae262224f1c1'

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            if (!id) return

            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
                );
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe details.');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (err) {
                setError(err.message || 'An error occurred.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipeDetails()
    }, [id])

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!recipe) return <p>No recipe details available.</p>;



    return (
        <div className='recipe-details'>
            <h1>{recipe.title}</h1>
            <img src={recipe.image} alt={recipe.title} />

            <h2>Ingredients</h2>
            <ul>
                {recipe.extendedIngredients?.map((ingredients) => (
                    <li key={ingredients.id}>{ingredients.original}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <div
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
            ></div>
            <Link to='/'>Back to Recipe Finder</Link>
        </div>
    )
}

export default RecipeDetails
