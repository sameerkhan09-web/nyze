import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Mail, Terminal, Cpu } from 'lucide-react';
import { toast } from 'react-hot-toast';
import api from '../services/api';
import useAuthStore from '../store/useAuthStore';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useAuthStore((state) => state.setUser);
  
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/register');
    }
  }, [email, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      return toast.error('Please enter all 6 digits');
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/verify-otp', { email, otp: otpValue });
      toast.success('Email Verified Successfully');
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-6 cyber-grid">
      <div className="max-w-md w-full glass-card p-10 space-y-8 relative overflow-hidden border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="absolute top-0 left-0 w-full h-1 bg-neon-gradient"></div>
        
        <div className="text-center space-y-3">
          <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto text-primary animate-pulse">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black italic text-white uppercase tracking-tighter">Verify Account</h2>
          <div className="flex items-center justify-center space-x-2 text-primary font-black uppercase text-[10px] tracking-[0.2em]">
             <Terminal className="w-3 h-3" />
             <span>Neural link validation required</span>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest pt-2">
            Code sent to: <span className="text-white italic">{email}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="flex justify-between gap-2">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="w-12 h-16 bg-white/5 border-2 border-white/10 rounded-xl text-center text-2xl font-black text-primary focus:border-primary focus:bg-primary/5 outline-none transition-all"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>

          <div className="space-y-4">
             <button
               type="submit"
               disabled={loading}
               className="neon-button-primary w-full py-5 uppercase italic tracking-[0.3em] group"
             >
               {loading ? (
                 <div className="w-5 h-5 border-4 border-black/20 border-t-black rounded-full animate-spin mx-auto" />
               ) : (
                 <>
                   <span>Initialize Access</span>
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                 </>
               )}
             </button>
             
             <button 
               type="button"
               className="w-full text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-center space-x-2"
             >
                <Cpu className="w-3 h-3" />
                <span>Resend Validation Signal</span>
             </button>
          </div>
        </form>

        <div className="flex items-center justify-center space-x-3 text-[10px] font-black text-slate-800 uppercase tracking-[0.3em]">
           <ShieldCheck className="w-4 h-4" />
           <span>Secure Protocol Active</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
