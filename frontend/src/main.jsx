import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FilteredValuesState from '../context/FilteredValuesContext.jsx'

createRoot(document.getElementById('root')).render(
  <FilteredValuesState>
    <StrictMode>
      <App />
    </StrictMode>
  </FilteredValuesState>,
)
