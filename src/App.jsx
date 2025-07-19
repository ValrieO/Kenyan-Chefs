import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Landing from "./pages/Landing";
import Categories from "./pages/Categories";
import Recipes from "./pages/Recipes";
import About from "./pages/AboutPage";
import Contact from "./pages/Contact";
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 font-body">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
