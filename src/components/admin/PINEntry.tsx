import { useState } from 'react';

interface PINEntryProps {
  onLogin: (pin: string) => boolean;
}

export default function PINEntry({ onLogin }: PINEntryProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ok = onLogin(pin);
    if (!ok) {
      setError('Incorrect PIN. Please try again.');
      setPin('');
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f2ec] flex items-center justify-center px-4">
      <div className="bg-white border border-[#e0ddd8] p-10 w-full max-w-sm text-center">
        <div className="font-display text-3xl font-black text-[#1a1a1a] uppercase mb-1">AN</div>
        <p className="text-[#888] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">Admin Access</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pin}
            onChange={(e) => { setPin(e.target.value); setError(''); }}
            placeholder="Enter PIN"
            className="w-full border border-[#ddd] px-4 py-3 text-center text-[#1a1a1a] text-lg tracking-[0.3em] focus:outline-none focus:border-[#1a1a1a] transition-colors"
            autoFocus
          />
          {error && (
            <p role="alert" className="text-red-500 text-[12px]">{error}</p>
          )}
          <button
            type="submit"
            className="btn btn-secondary w-full py-3 text-[11px]"
          >
            Enter
          </button>
        </form>
        <p className="text-[#bbb] text-[11px] mt-6">Restricted access — AN Tattoo Shop staff only</p>
      </div>
    </div>
  );
}
