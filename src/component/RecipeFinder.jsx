import React, { useState } from 'react'
import axios from 'axios'
import RecipeCard from './RecipeCard'
import Filters from './Filter'
import '../App.css'

function RecipeFinder() {
    const [query, setQuery] = useState('')
    const [recipes, setRecipes] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [filters, setFilters] = useState({ cuisine: '', diet: '' })

    const API_KEY = 'abfda5402f214aeab31fae262224f1c1'

    const handleInputChange = (e) => {
        setQuery(e.target.value)
    }

    const handleFilterChange = (filterName, value) => {
        setFilters(prevFilters => ({ ...prevFilters, [filterName]: value }))
    }

    const fetchRecipes = async () => {
        if (query.trim() === '') {
            alert('Please enter an ingredient or dish name')
            return
        }

        const cuisine = Filters.cuisine ? `&cuisine=${Filters.cuisine}` : ''
        const diet = Filters.diet ? `&diet=${Filters.diet}` : ''

        setLoading(true)
        setError(null)

        try {
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query
                }${cuisine}${diet}&number=10&apiKey=${API_KEY}`
            )
            setRecipes(response.data.results)
        }
        catch (err) {
            setError('Error fetching recipes. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        fetchRecipes()
    }

    return (
        <div className='recipe-finder'>
            <h1>Recipe Finder</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" value={query} onChange={handleInputChange} placeholder='Search by ingredient or dish name' />
                <button type='submit'>Search</button>
            </form>
            <Filters onFilterChange={handleFilterChange} />

            {loading && <div className='loading'>Loading...</div>}

            {error && <p>{error}</p>}

            <div className='recipes'>
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                ))
                }
            </div>

        </div>
    )
}

export default RecipeFinder
