import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Landing from "./pages/Landing";
import Categories from "./pages/Categories";
import Recipes from "./pages/Recipes";
import KenyanChefsLanding from "./pages/landing-page";
import About from "./pages/AboutPage";
import Contact from "./pages/Contact";
// import { ChefsPage } from './pages/chefs/ChefsPage'
// import { LoginPage } from './pages/auth/LoginPage'
// import { SignupPage } from './pages/auth/SignupPage'

function App() {
  return (
    <div className="App min-h-screen bg-gray-50 font-body">
      <Header />
      <main className="pt-16">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/landing" element={<KenyanChefsLanding />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/chefs" element={<ChefsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;
