import { Button } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import AuthPage from './pages/AuthPage/AuthPage'
function App() {
  return (
    <>
      <Routes>
      <Route path='/' element={<AuthPage />} />

      <Route path='/' element={<HomePage />} />
      </Routes>
    </>
  )
}

export default App
