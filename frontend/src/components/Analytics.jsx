import { useState, useEffect } from 'react';
import API from '../api';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';

function Analytics() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await API.get('/jobs');
                setJobs(res.data);
            } catch (err) {
                console.error("Failed to fetch jobs for analytics", err);
            }
        };
        fetchJobs();
    }, []);

    const data = [
        { name: 'Open', value: jobs.filter(j => j.status === 'open').length },
        { name: 'Closed', value: jobs.filter(j => j.status === 'closed').length }
    ];

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col items-center">
            <div className="w-full mb-5 border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-lg font-semibold tracking-tight">Opportunity Analytics</h2>
            </div>

            <div className="flex justify-center w-full">
                <PieChart width={300} height={300}>
                    <Pie data={data} dataKey="value" outerRadius={100}>
                        <Cell fill="#4f46e5" />
                        <Cell fill="#94a3b8" />
                    </Pie>
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', color: '#0f172a' }} />
                </PieChart>
            </div>

            <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Open ({data[0].value})</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Closed ({data[1].value})</span>
                </div>
            </div>
        </div>
    );
}

export default Analytics;