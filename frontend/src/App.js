import "./App.css";

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importare resurse
import NavbarComponent from "./components/navbar/navbar";
import Home from "./pages/home";




function App() {
  return (
    <div className="background">
      <NavbarComponent />
      <Home />
      

    </div>
  );
}

export default App;
