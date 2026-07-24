import './storageShim.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import PriceBoard from './PriceBoard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PriceBoard />
  </StrictMode>,
)
