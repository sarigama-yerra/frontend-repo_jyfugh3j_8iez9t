import { useState } from 'react'
import Header from './components/Header'
import MenuManager from './components/MenuManager'
import EmployeeManager from './components/EmployeeManager'

function App() {
  const [activeTab, setActiveTab] = useState('menu')

  return (
    <div className="min-h-screen bg-slate-50">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === 'menu' && <MenuManager />}
      {activeTab === 'employees' && <EmployeeManager />}

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500">
          Connected to your backend for live data. Prices, menu and employees are saved in your database.
        </div>
      </footer>
    </div>
  )
}

export default App
