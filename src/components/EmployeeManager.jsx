import { useEffect, useState } from 'react'
import { Plus, User2 } from 'lucide-react'

const roles = ['Chef', 'Waiter', 'Manager', 'Cashier', 'Cleaner', 'Host', 'Delivery', 'Other']

export default function EmployeeManager() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', role: 'Waiter', phone: '', email: '', hourly_rate: '' })

  const fetchEmployees = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/employees`)
      const data = await res.json()
      setEmployees(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEmployees() }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${baseUrl}/api/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, hourly_rate: form.hourly_rate ? parseFloat(form.hourly_rate) : null, active: true })
      })
      if (!res.ok) throw new Error('Failed')
      setForm({ name: '', role: 'Waiter', phone: '', email: '', hourly_rate: '' })
      fetchEmployees()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Employees</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="md:col-span-1 bg-white border border-slate-200 rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-slate-700 mb-2">Add Employee</h3>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full border rounded-md px-3 py-2 text-sm" required />
          <div className="grid grid-cols-2 gap-3">
            <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="border rounded-md px-3 py-2 text-sm">
              {roles.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
            <input value={form.hourly_rate} type="number" step="0.01" onChange={(e) => setForm({ ...form, hourly_rate: e.target.value })} placeholder="Hourly rate" className="w-full border rounded-md px-3 py-2 text-sm" />
          </div>
          <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="w-full border rounded-md px-3 py-2 text-sm" />
          <input value={form.email} type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full border rounded-md px-3 py-2 text-sm" />
          <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded-md">
            <Plus size={16} /> Add Employee
          </button>
        </form>

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
          {loading ? (
            <p className="text-slate-500">Loading...</p>
          ) : employees.length === 0 ? (
            <p className="text-slate-500">No employees yet</p>
          ) : (
            employees.map((emp) => (
              <div key={emp.id} className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-slate-800 flex items-center gap-2"><User2 size={16} className="text-slate-400" /> {emp.name}</h4>
                    <p className="text-sm text-slate-600">{emp.role}</p>
                    {emp.phone && <p className="text-xs text-slate-500 mt-1">{emp.phone}</p>}
                    {emp.email && <p className="text-xs text-slate-500">{emp.email}</p>}
                  </div>
                  <div className="text-right">
                    {emp.hourly_rate !== null && emp.hourly_rate !== undefined && (
                      <p className="text-blue-600 font-semibold">${emp.hourly_rate?.toFixed ? emp.hourly_rate.toFixed(2) : emp.hourly_rate}/hr</p>
                    )}
                    <span className={`inline-block mt-1 text-xs px-2 py-0.5 rounded ${emp.active ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{emp.active ? 'Active' : 'Inactive'}</span>
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
