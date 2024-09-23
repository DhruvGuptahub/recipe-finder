import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import RecipeFinder from './component/RecipeFinder';
import RecipeDetails from './component/RecipeDetails';
import RecipeCard from './component/RecipeCard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={RecipeFinder} />
        <Route path='/recipe/:id' Component={RecipeDetails} />
        <Route path="/favorites" element={<RecipeCard />} />
      </Routes>
    </Router>
  );
}

export default App;
