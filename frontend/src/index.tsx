// EXTERNAL
import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@mui/material/styles"; 
import { Provider } from "react-redux";
import "firebase/auth";

// INTERNAL
import { Home, Library, SignIn, SignUp, Search, Faq} from "./components/index"
import { theme } from "./Theme/themes";
import "./styles.css"
import { store } from "./redux/store";
import {firebaseConfig} from "./firebaseConfig";
import { FirebaseAppProvider } from "reactfire";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path = "/" element={<Home title = {"Personal Library"}/>}/>
              <Route path = "/faq" element={<Faq/>}/>
              <Route path = "/search" element={<Search/>}/>
              <Route path = "/library" element={<Library/>}/>
              <Route path = "/signin" element={<SignIn/>}/>
              <Route path = "/signup" element={<SignUp/>}/>
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    </FirebaseAppProvider>
  </React.StrictMode>,
);