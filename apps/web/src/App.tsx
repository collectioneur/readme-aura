import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'

export default function App() {
  return (
    <BrowserRouter basename="/readme-aura">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </BrowserRouter>
  )
}
