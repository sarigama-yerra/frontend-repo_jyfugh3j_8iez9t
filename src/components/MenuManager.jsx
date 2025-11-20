import { useEffect, useState } from 'react'
import { Plus, Tag, Filter } from 'lucide-react'

const categories = ['Starters', 'Mains', 'Desserts', 'Beverages', 'Sides', 'Specials']

export default function MenuManager() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', category: 'Mains', price: '' })
  const [filter, setFilter] = useState('All')

  const fetchItems = async () => {
    setLoading(true)
    try {
      const url = filter === 'All' ? `${baseUrl}/api/menu` : `${baseUrl}/api/menu?category=${encodeURIComponent(filter)}`
      const res = await fetch(url)
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/api/menu`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, price: parseFloat(form.price), available: true })
      })
      if (!res.ok) throw new Error('Failed')
      setForm({ name: '', description: '', category: 'Mains', price: '' })
      fetchItems()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Menu</h2>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-slate-500" />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded-md text-sm px-2 py-1">
            <option>All</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-1 bg-white border border-slate-200 rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-slate-700 mb-2">Add Item</h3>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" className="w-full border rounded-md px-3 py-2 text-sm" required />
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full border rounded-md px-3 py-2 text-sm" rows={3} />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border rounded-md px-3 py-2 text-sm">
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className="relative">
              <Tag size={14} className="absolute left-2 top-3 text-slate-400" />
              <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" className="w-full border rounded-md pl-8 pr-3 py-2 text-sm" required />
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md">
            <Plus size={16} /> Add Item
          </button>
        </form>

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : items.length === 0 ? (
            <p className="text-slate-500">No items yet</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800">{item.name}</h4>
                    <p className="text-sm text-slate-600">{item.description}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-600 font-semibold">${item.price?.toFixed ? item.price.toFixed(2) : item.price}</p>
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${item.available ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{item.available ? 'Available' : 'Unavailable'}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
