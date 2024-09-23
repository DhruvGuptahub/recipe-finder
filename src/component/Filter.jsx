import React from 'react'

function Filter({ onFilterChange }) {
    return (
        <div className="filters">
            <select onChange={(e) => onFilterChange('cuisine', e.target.value)}>
                <option value=''>All Cuisines</option>
                <option value='italian'>Italian</option>
                <option value='mexican'>Mexican</option>
            </select>
            <select onChange={(e) => onFilterChange('diet', e.target.value)}>
                <option value="">All Diets</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten-Free</option>
            </select>
        </div>
    )
}

export default Filter
