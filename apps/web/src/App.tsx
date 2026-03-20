import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Docs from './pages/Docs'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </HashRouter>
  )
}
