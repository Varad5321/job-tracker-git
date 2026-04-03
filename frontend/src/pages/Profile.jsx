import React, { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';

function Profile({ user, setUser }) {
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [title, setTitle] = useState(user?.title || '');
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [pwdLoading, setPwdLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setTitle(user.title || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await API.put('/auth/profile', { name, phone, title });
            if (setUser) setUser(res.data);
            toast.success("Profile updated successfully!");
        } catch(err) {
            toast.error(err.response?.data?.error || "Error updating profile.");
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        try {
            setPwdLoading(true);
            await API.put('/auth/password', { currentPassword, newPassword });
            toast.success("Password safely updated!");
            setCurrentPassword('');
            setNewPassword('');
        } catch(err) {
            toast.error(err.response?.data?.error || "Error updating password.");
        } finally {
            setPwdLoading(false);
        }
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <form onSubmit={handleUpdate} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-200">
                <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your account profile and preferences.</p>
                </div>
                
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Email Address (Read-only)</label>
                            <input
                                className="w-full p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 outline-none cursor-not-allowed"
                                value={user?.email || ''}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Full Name</label>
                            <input
                                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Phone Number</label>
                            <input
                                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="+1 (555) 555-5555"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Job Title</label>
                            <input
                                className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                                placeholder="Software Engineer"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
                        <button type="submit" disabled={loading} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 font-medium text-sm transition shadow-sm disabled:opacity-70">
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </div>
            </form>

            <form onSubmit={handlePasswordUpdate} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm text-slate-900 dark:text-slate-100 transition-colors duration-200">
                <div className="mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <h2 className="text-2xl font-bold tracking-tight">Security</h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Ensure your account is protected with a secure password.</p>
                </div>
                
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Current Password</label>
                        <input
                            type="password"
                            className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">New Password</label>
                        <input
                            type="password"
                            className="w-full p-2.5 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                            placeholder="••••••••"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mt-6">
                        <button type="submit" disabled={pwdLoading} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg hover:bg-indigo-700 font-medium text-sm transition shadow-sm disabled:opacity-70">
                            {pwdLoading ? "Updating..." : "Update Password"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Profile;