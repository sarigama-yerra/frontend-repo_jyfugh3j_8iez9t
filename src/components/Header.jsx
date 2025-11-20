import { useState } from 'react'
import { Menu as MenuIcon, UtensilsCrossed, Users } from 'lucide-react'

export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'menu', label: 'Menu', icon: UtensilsCrossed },
    { key: 'employees', label: 'Employees', icon: Users },
  ]

  return (
    <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 text-white grid place-items-center shadow">
            <MenuIcon size={18} />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 leading-none">Restaurant Manager</h1>
            <p className="text-xs text-slate-500 leading-none mt-1">Simple control panel for your restaurant</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map((t) => {
            const Icon = t.icon
            const active = activeTab === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors border ${
                  active
                    ? 'bg-blue-600 text-white border-blue-600 shadow'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                }`}
              >
                <Icon size={16} />
                {t.label}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
