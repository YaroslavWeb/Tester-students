import React from "react"
import ReactDOM  from "react-dom"
import { HashRouter } from 'react-router-dom'

import App from "./renderer/App"

import "./styles/main.css"

ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>
, document.getElementById("root")
)    
