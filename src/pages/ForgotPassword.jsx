import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ChevronLeft, Terminal } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/auth/forgot-password', { email });
      toast.success('Reset code sent to your email');
      navigate('/reset-password', { state: { email } });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 cyber-grid">
      <div className="max-w-md w-full glass-card p-10 space-y-8 relative overflow-hidden border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>
        
        <Link to="/login" className="flex items-center space-x-2 text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors group w-fit">
           <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
           <span>Back to Login</span>
        </Link>

        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Forgot Details?</h2>
          <div className="flex items-center justify-center space-x-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
             <Terminal className="w-3 h-3" />
             <span>Initialize recovery protocol</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Email Address</label>
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

          <button
            type="submit"
            disabled={loading}
            className="neon-button-primary w-full py-5 uppercase italic tracking-[0.3em] group"
          >
            {loading ? (
              <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
            ) : (
              <>
                <span>Send Reset Code</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
