import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import SearchPage from './components/MainComponents/SearchComponent/SearchComponent'
import SideBar from './components/SubComponents/SideBarComponent/SideBar'
import Home from './components/MainComponents/HomeComponent/Home'
import "./colors.css";

const App: React.FC = () => {

  return (
    <Router>
      <main className='app-wrapper'>
        {/* sidebar */}
        <SideBar />
        {/* routing of pages */}
        <Routes>
          {/* Redirected default route to /search for now */}
          <Route path="/" element={<Navigate to="/search" replace />} />
          <Route path="/discover" element={<Home />} />
          <Route path="/creators" element={<Home />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cookbooks" element={<Home />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App
