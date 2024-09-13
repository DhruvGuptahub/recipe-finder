import React, { useState } from 'react'
import axios from 'axios'

function RecipeFinder() {
    const [query, setQuery] = useState('')
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_KEY = 'abfda5402f214aeab31fae262224f1c1'

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const searchRecipes = async () => {
        if (query.trim() === '') {
            alert('Please enter an ingredient or dish name')
            return
        }

        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${query}&number=10&apiKey=${API_KEY}`
            )
            setRecipes(response.data)
        }
        catch (error) {
            setError('Error fetching recipes. Please try again.')
        }

        setLoading(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        searchRecipes()
    }

    return (
        <div className='recipe-finder'>
            <h1>Recipe Finder</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleInputChange} placeholder='Search by ingredient or dish name' />
                <button type='submit'>Search</button>
            </form>

            {loading && <p>Loading Recipes...</p>}

            {error && <p>{error}</p>}

            <div className='recipes'>
                {recipes.map((recipe) => (
                    <div key={recipe.id} className='recipe-card'>
                        <img src={recipe.image} alt='recipe.title'></img>
                        <h3>{recipe.title}</h3>
                    </div>
                ))
                }
            </div>

        </div>
    )
}

export default RecipeFinder
