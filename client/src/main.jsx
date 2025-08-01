import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDom from "react-dom/client"
import App from './App.jsx'
import "./index.css"
import React from 'react';
import  {store,persistor} from "./redux/store.js"
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </Provider>,
)

