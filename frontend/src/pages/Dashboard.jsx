import React, { useState, useEffect } from 'react';
import Sidebar from '../components/SidenavBar';
import Navbar from '../components/Navbar';
import Profile from './Profile';
import Jobs from './Jobs';
import API from '../api';
import { toast } from 'react-hot-toast';
import Analytics from '../components/Analytics';

function Dashboard({ setToken }) {
    const [page, setPage] = useState('jobs');
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/auth/profile');
                setUser(res.data);
            } catch (err) {
                toast.error(`Failed to load user profile: ${err.response?.data?.error || err.message}`);
            }
        };
        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        if (setToken) setToken(null);
        window.location.href = "/";
    };

    return (
        <div className={dark ? "dark" : ""}>
            <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200">

                <Sidebar setPage={setPage} page={page} user={user} />

                <div className="flex-1 flex flex-col h-screen overflow-hidden">
                    <div className="p-6 pb-2">
                        <Navbar handleLogout={handleLogout} dark={dark} setDark={setDark} />
                    </div>

                    <main className="flex-1 overflow-y-auto p-6 pt-4">
                        <div className="max-w-6xl mx-auto">
                            {page === 'jobs' && <Jobs />}
                            {page === 'profile' && <Profile user={user} setUser={setUser} />}
                            {page === 'analytics' && <Analytics />}
                        </div>
                    </main>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;