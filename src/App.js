import React, { useState } from 'react';  
import './App.css';

function App() {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const searchRecipes = async () => {
    setLoading(true);
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
    const data = await response.json();
    setRecipes(data.meals || []);
    setLoading(false);
    setSearched(true);
  };
  
return(
<div className="App">
  <div className="header-section">
    <h1>🍳 Recipe Finder</h1>
    <div className="search-area">
      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Search for a recipe..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn btn-danger btn-lg" onClick={searchRecipes}>Search</button>
      </div>
    </div>
    {loading && <p className="text-white mt-3">Searching...</p>}
    {!loading && searched && recipes.length === 0 && <p className="text-white mt-3">No recipes found.</p>}
  </div>

  <div className="container mt-4">
    <div className="row">
      {recipes.map((recipe) => (
        <div className="col-md-3 mb-3" key={recipe.idMeal}>
      <div className="card" style={{ maxWidth: '18rem' }}>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="card-img-top" />
        <div className="card-body">
          <h3 className="card-title">{recipe.strMeal}</h3>
        </div>
      </div>
      </div>
      ))}
    </div>
  </div>
</div>
)
};

export default App;
