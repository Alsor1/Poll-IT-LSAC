import "./App.css";

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importare resurse
import NavbarComponent from "./components/navbar/navbar";
import Home from "./pages/home";

function App() {
  return (
    <>
      <NavbarComponent />
      <Home />
    </>
  );
}

export default App;
