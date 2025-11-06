import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './css/App.css'
import AppClientes from './components/AppClientes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <AppClientes />
      </div>
    </>
  )
}

export default App
