import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store'
import { Provider } from 'react-redux'
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


createRoot(document.getElementById('root')).render(
     <Provider store={store}>
       <App />
       <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" transition: Slide />
    </Provider>
)
