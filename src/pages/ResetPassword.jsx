import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, ArrowRight, Terminal, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';

const ResetPassword = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error('Email missing. Go back to forgot password.');
    
    setLoading(true);
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword });
      toast.success('Password Reset Successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 cyber-grid">
      <div className="max-w-md w-full glass-card p-10 space-y-8 relative overflow-hidden border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>
        
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Reset Password</h2>
          <div className="flex items-center justify-center space-x-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
             <Terminal className="w-3 h-3" />
             <span>Overriding security credentials</span>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-2">
             Target Account: <span className="text-white">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
             <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">Verification Code</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="6-digit code"
                  className="neon-input w-full"
                />
             </div>

             <div className="space-y-2">
                <label className="text-[10px] font-black text-primary uppercase tracking-[0.3em] ml-2">New Password</label>
                <div className="relative group">
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                    className="neon-input w-full pl-12 group-focus-within:border-primary transition-all"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-5 h-5 group-focus-within:text-primary transition-colors" />
                </div>
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
                <span>Save New Credentials</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-3 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
           <ShieldCheck className="w-4 h-4" />
           <span>Secure Protocol Active</span>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
