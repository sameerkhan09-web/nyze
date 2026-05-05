import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login Failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 cyber-grid">
      <div className="w-full max-w-md space-y-8 glass-card p-10 relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>
        
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 shadow-[0_0_20px_rgba(0,242,255,0.1)]">
             <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">Login</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Email</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="neon-input w-full pl-12 group-focus-within:border-primary transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="neon-input w-full pl-12 group-focus-within:border-primary transition-all"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" virtual-scroll-index="0" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors">Forgot Details?</Link>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-black py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(0,242,255,0.2)] hover:shadow-[0_0_50px_rgba(0,242,255,0.4)] hover:scale-[1.02] flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-white/5 space-y-4">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
             Don't have an account?{' '}
             <Link to="/register" className="text-primary hover:underline">Sign Up</Link>
           </p>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

export default Login;
