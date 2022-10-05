import { Paste } from "./Paste";
import { View } from "./View";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { createContext } from "react";

const AppContext = createContext(null)
function App() {
  const contextValue={

  }
  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue} >
        <Navbar />
        <div className="App bg-dark" style={{}}>
          <Routes>
            <Route exact path="/" element={<Paste />} />
            <Route exact path="/user/:uid" element={<></>} />
            <Route exact path="/login" element={<></>} />
            <Route exact path="/signup" element={<></>} />
            <Route path="/:id" element={<View />} />
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
