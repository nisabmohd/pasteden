import { Paste } from "./Paste";
import { View } from "./View";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import { createContext, useState, useEffect } from "react";
import {Login} from './Login'
import {Signup} from './Signup'
import { User } from "./User";

export const AppContext = createContext(null)
function App() {
  const [auth, setAuth] = useState(null)
  const contextValue = {
    auth, setAuth
  }
  useEffect(() => {
    const user = localStorage.getItem('auth')
    if (!user) return;
    setAuth(JSON.parse(user))
  }, [])

  return (
    <BrowserRouter>
      <AppContext.Provider value={contextValue} >
        <Navbar />
        <div className="App bg-dark" style={{}}>
          <Routes>
            <Route exact path="/" element={<Paste />} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/user/:uid" element={<User/>} />
            <Route path="/:id" element={<View />} />
          </Routes>
        </div>
        <Footer />
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
