import './App.css';
import Header from './Components/Layout/Header.js';
import Footer from './Components/Layout/Footer'
import {VilleLists, VilleForm}  from "./Components/Pages/VilleList";




import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route,Link} from "react-router-dom";

import { ChakraProvider } from '@chakra-ui/react';
import WithSubnavigation from "./Components/Layout/navBar";


function App() {
  return (
      <div>
        {/*<Header/>*/}
          <ChakraProvider>
            <WithSubnavigation/>
          </ChakraProvider>
      <BrowserRouter>
          <div>

              <Routes>
                  <Route path="/ville" element={<VilleLists />}></Route>
                  <Route path="/creationVille" element={<VilleForm />} />
                  {/*<Route path="/zone" element={<ZoneList/>} />*/}
                  {/*<Route path="/create-zone" element={<ZoneForm />} />*/}
                  {/*<Route path="/zoneByCity" element={<ZoneByCity />} />*/}

              </Routes>

          </div>
      </BrowserRouter>

      <ChakraProvider>
        <Footer/>
      </ChakraProvider>


      </div>
  );
}

export default App;