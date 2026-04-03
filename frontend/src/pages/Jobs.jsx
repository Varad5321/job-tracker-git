import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    title: '', company: '', location: '', salary: '', status: 'open', description: ''
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.message || err.message || 'Unable to fetch jobs.');
      setJobs([]);
    }
  };

  const deleteJob = async (id) => {
    try {
      if(!window.confirm("Are you sure you want to delete this opportunity?")) return;
      await API.delete(`/jobs/${id}`);
      toast.success("Opportunity removed.");
      fetchJobs();
    } catch (err) {
      toast.error('Unable to delete job.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, salary: Number(form.salary) || '' }; 
      if (editingId) {
        await API.put(`/jobs/${editingId}`, payload);
        toast.success("Job configured successfully!");
        setEditingId(null);
      } else {
        await API.post('/jobs', payload);
        toast.success("New Opportunity logged!");
      }
      setForm({ title: '', company: '', location: '', salary: '', status: 'open', description: '' });
      fetchJobs();
    } catch (err) {
      toast.error(err.response?.data?.error || err.response?.data?.message || err.message || 'Unable to save job.');
    }
  };

  return (
    <div className="space-y-6">
        
        {/* ADD/EDIT JOB FORM */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-200">
          <div className="mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-semibold tracking-tight">
              {editingId ? "Configure Job Details" : "Log a New Opportunity"}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Job Title</label>
                <input className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="e.g. Senior Software Engineer" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Company</label>
                <input className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Company Name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required />
            </div>
            <div>
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Location</label>
                <input className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Remote, New York, etc." value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Salary</label>
                    <input type="number" className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Amount" value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Status</label>
                    <select className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <option value="open">Open</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>
            <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">Description / Notes</label>
                <input className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" placeholder="Key responsibilities or interview notes..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-2 pt-2 flex flex-col md:flex-row items-center justify-end gap-4">
                <div className="flex gap-3 w-full md:w-auto">
                    {editingId && (
                        <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', company: '', location: '', salary: '', status: 'open', description: '' }); }} className="flex-1 md:flex-none bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-5 py-2 rounded-lg font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition">Cancel</button>
                    )}
                    <button type="submit" className="flex-1 md:flex-none bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium text-sm shadow-sm hover:bg-indigo-700 transition">
                        {editingId ? "Save Changes" : "Submit Entry"}
                    </button>
                </div>
            </div>
          </form>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-[400px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
                </div>
                <input type="text" placeholder="Search opportunities..." className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg w-full md:w-auto">
                <button onClick={() => setFilter('all')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition ${filter === 'all' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>All</button>
                <button onClick={() => setFilter('open')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition ${filter === 'open' ? 'bg-white dark:bg-slate-700 shadow-sm text-green-600 dark:text-green-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Open</button>
                <button onClick={() => setFilter('closed')} className={`flex-1 md:flex-none px-4 py-1.5 text-sm font-medium rounded-md transition ${filter === 'closed' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`}>Closed</button>
            </div>
        </div>

        {/* JOB LISTINGS */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden text-slate-900 dark:text-slate-100 transition-colors duration-200">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold tracking-wide">
                        <tr>
                            <th scope="col" className="px-6 py-4">Role & Company</th>
                            <th scope="col" className="px-6 py-4">Location</th>
                            <th scope="col" className="px-6 py-4">Compensation</th>
                            <th scope="col" className="px-6 py-4">Status</th>
                            <th scope="col" className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {jobs
                            .filter(job => {
                            const matchesStatus = filter === 'all' || job.status === filter;
                            const term = search.toLowerCase();
                            const matchesSearch = (job.title || '').toLowerCase().includes(term) || (job.company || '').toLowerCase().includes(term) || (job.location || '').toLowerCase().includes(term) || (job.description || '').toLowerCase().includes(term);
                            return matchesStatus && matchesSearch;
                            })
                            .map((job) => (
                            <tr key={job._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-slate-900 dark:text-white">{job.title}</div>
                                    <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{job.company}</div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{job.location || "—"}</td>
                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                                    {job.salary ? `₹${Number(job.salary).toLocaleString('en-IN')}` : "—"}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'open' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800' : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}`}>
                                        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button onClick={() => { setForm(job); setEditingId(job._id); }} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 font-medium mr-4 transition">Edit</button>
                                    <button onClick={() => deleteJob(job._id)} className="text-red-500 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium transition">Remove</button>
                                </td>
                            </tr>
                        ))}
                        {jobs.length === 0 && (
                            <tr>
                                <td colSpan="5" className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                                    No opportunities logged yet. Start by adding one above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>

    </div>
  );
}

export default Jobs;
