import { useState, useEffect } from 'react';
import API from '../api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Login({ setToken }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const url = isLogin ? '/auth/login' : '/auth/register';
            const payload = isLogin
                ? { email, password }
                : { name, phone, title: jobTitle, username, email, password };

            const res = await API.post(url, payload);

            if (!isLogin) {
                toast.success("Account created successfully. Please sign in.");
                setIsLogin(true);
                return;
            }

            localStorage.setItem("token", res.data.token);
            if (setToken) setToken(res.data.token);
            navigate("/dashboard");
            toast.success("Signed in successfully!");
        } catch (err) {
            toast.error(err.response?.data?.message || err.response?.data?.error || "An error occurred during authentication.");
        } finally {
            setLoading(false);
        }

    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/dashboard');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 w-full max-w-md my-8">

                <div className="text-center mb-8">
                    <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md mx-auto mb-4 text-xl">
                        JT
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                        {isLogin ? "Sign in to your account" : "Create an account"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-2">
                        {isLogin ? "Welcome back to JobTracker" : "Start tracking your opportunities today"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {!isLogin && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                                <input className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm" placeholder="John Doe" onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                                <input className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm" placeholder="+1 (555) 000-0000" onChange={(e) => setPhone(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                <input className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm" placeholder="Software Engineer" onChange={(e) => setJobTitle(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                                <input className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm" placeholder="johndoe123" onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                        </>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                            {isLogin ? "Email or Username" : "Email address"}
                        </label>
                        <input
                            type={isLogin ? "text" : "email"}
                            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm"
                            placeholder={isLogin ? "Email or Username" : "you@company.com"}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full p-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition text-slate-900 shadow-sm"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 text-white font-medium p-3 rounded-lg hover:bg-indigo-700 transition shadow-sm disabled:opacity-70 mt-4"
                    >
                        {loading ? "Processing..." : (isLogin ? "Sign in" : "Register")}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button
                        type="button"
                        className="text-sm text-indigo-600 hover:text-indigo-500 font-medium transition"
                        onClick={() => { setIsLogin(!isLogin); }}
                    >
                        {isLogin
                            ? "Don't have an account? Sign up"
                            : "Already have an account? Sign in"}
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Login;