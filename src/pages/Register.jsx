import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, User as UserIcon, Terminal } from 'lucide-react';
import useAuthStore from '../store/useAuthStore';
import { toast } from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password });
      toast.success('Verification Code Sent');
      navigate('/verify-email', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration Failed');
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 cyber-grid">
      <div className="w-full max-w-md space-y-8 glass-card p-10 relative overflow-hidden">
        {/* Top Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>
        
        <div className="text-center space-y-4">
          <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto border border-secondary/20 shadow-[0_0_20px_rgba(188,19,254,0.1)]">
             <Terminal className="w-8 h-8 text-secondary" />
          </div>
          <h1 className="text-4xl font-black italic text-white uppercase tracking-tighter">Sign Up</h1>
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Your Name</label>
              <div className="relative group">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="neon-input w-full pl-12 group-focus-within:border-secondary transition-all"
                />
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-secondary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Email Address</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="neon-input w-full pl-12 group-focus-within:border-secondary transition-all"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-secondary transition-colors" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-secondary uppercase tracking-[0.3em] ml-2">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="neon-input w-full pl-12 group-focus-within:border-secondary transition-all"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-secondary transition-colors" />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-5 rounded-2xl font-black italic uppercase tracking-[0.2em] transition-all shadow-[0_0_30px_rgba(188,19,254,0.2)] hover:shadow-[0_0_50px_rgba(188,19,254,0.4)] hover:scale-[1.02] flex items-center justify-center space-x-3 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>Sign Up Now</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 border-t border-white/5 space-y-4">
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
             Already have an account?{' '}
             <Link to="/login" className="text-secondary hover:underline">Log In</Link>
           </p>
        </div>
      </div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

export default Register;
