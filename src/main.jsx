import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import { store } from "./redux/store";
import { Provider } from "react-redux";
// import { AuthProvider } from "./context/AuthProvider";

// const root = document.getElementById("root");
// var viewport_height = document.documentElement.clientHeight;
// root.style.height = viewport_height + "px"
// console.log('====================================');
// console.log(viewport_height);
// console.log('====================================');

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);
