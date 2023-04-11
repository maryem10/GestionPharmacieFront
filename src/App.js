import './App.css';
import Header from'./Header.js';
import Footer from './Footer'
import VilleList from "./Components/Pages/VilleList";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
      <ChakraProvider>
        <Header/>,
        <Footer/>
      </ChakraProvider>

  /*    <BrowserRouter>
      <div>
          <nav>
          <Link to="/ville" className="nav-item">About Little Lemon</Link>

      </nav>

          <Routes>
              <Route path="/ville" element={<VilleList />}></Route>
          </Routes>

      </div>
      </BrowserRouter>*/
  );
}

export default App;