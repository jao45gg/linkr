import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Layout from "./Layout.jsx";
import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>
      <App />
      <h1>Olá, mundo!</h1>
    </Layout>
  </React.StrictMode>
);
