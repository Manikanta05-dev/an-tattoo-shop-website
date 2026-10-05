import { useState } from 'react';
import PageTransition from '@/components/ui/PageTransition';
import SectionReveal from '@/components/ui/SectionReveal';
import { useSEO } from '@/hooks/useSEO';
import { buildConsultationURL } from '@/lib/whatsapp';
import { createLeadRecord } from '@/lib/leadFactory';
import { useLeads } from '@/hooks/useLeads';
import { trackEvent } from '@/lib/analytics';
import {
  STUDIO_ADDRESS,
  STUDIO_PHONE,
  STUDIO_EMAIL,
  STUDIO_HOURS,
  WHATSAPP_NUMBER,
} from '@/data/siteConfig';

const STYLE_OPTIONS = [
  'Realism', 'Blackwork', 'Portrait', 'Tribal', 'Custom',
  'Cover-Up', 'Touch-Up', 'Not sure yet',
];

export default function Contact() {
  useSEO(
    'Contact & Book — AN Tattoo Shop',
    'Book a free tattoo consultation at AN Tattoo Shop in Kalyandurg, Andhra Pradesh.',
  );

  const { addLead } = useLeads();
  const [form, setForm] = useState({
    name: '', phone: '', tattooIdea: '', preferredDate: '', message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^\d{10,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number (10–15 digits)';
    if (!form.tattooIdea.trim()) e.tattooIdea = 'Please describe your tattoo idea';
    if (!form.preferredDate.trim()) e.preferredDate = 'Please select a preferred date';
    if (!form.message.trim()) e.message = 'Please add a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const record = createLeadRecord(form);
    addLead(record);
    trackEvent('consultation_form_submit');
    const url = buildConsultationURL(form);
    window.open(url, '_blank');
    setSubmitted(true);
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  }

  const inputCls =
    'w-full bg-white border border-[#ddd] text-[#1a1a1a] px-4 py-3 text-[14px] focus:outline-none focus:border-[#1a1a1a] transition-colors duration-200 placeholder:text-[#aaa]';

  return (
    <PageTransition>
      {/* ─── HERO ────────────────────────────────────── */}
      <section className="bg-[#f5f2ec] pt-24 pb-10 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto pt-8">
          <SectionReveal>
            <p className="text-[#888] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
              AN Tattoo Shop — Kalyandurg
            </p>
            <h1 className="font-display text-[clamp(2.8rem,7vw,6rem)] font-black text-[#1a1a1a] uppercase leading-[0.9] mb-6">
              Book a Free<br />Consultation
            </h1>
            <p className="text-[#555] text-[15px] leading-relaxed max-w-lg">
              No commitment. No charge. Just a conversation about your idea, your placement, and your price — over a coffee at the studio.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ─── MAIN CONTENT: Form + Info ───────────────── */}
      <section className="bg-[#f5f2ec] pb-20 px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* Left: Consultation Form */}
          <SectionReveal>
            <div className="bg-white p-8 md:p-10 border border-[#e0ddd8]">
              <h2 className="font-display text-2xl font-black text-[#1a1a1a] uppercase mb-8 tracking-tight">
                Send Us Your Details
              </h2>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h3 className="font-display text-xl font-bold text-[#1a1a1a] mb-2">Request Sent!</h3>
                  <p className="text-[#555] text-sm leading-relaxed">
                    Your consultation request has been sent via WhatsApp. We'll confirm your slot shortly.
                  </p>
                  <button
                    className="btn btn-secondary mt-8 px-8 py-3 text-[11px]"
                    onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', tattooIdea: '', preferredDate: '', message: '' }); }}
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text" name="name" value={form.name}
                      onChange={handleChange} placeholder="Anil Kumar"
                      className={inputCls}
                      aria-describedby={errors.name ? 'err-name' : undefined}
                    />
                    {errors.name && (
                      <span id="err-name" role="alert" className="text-red-500 text-[11px] mt-1 block">{errors.name}</span>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel" name="phone" value={form.phone}
                      onChange={handleChange} placeholder="9876543210"
                      className={inputCls}
                      aria-describedby={errors.phone ? 'err-phone' : undefined}
                    />
                    {errors.phone && (
                      <span id="err-phone" role="alert" className="text-red-500 text-[11px] mt-1 block">{errors.phone}</span>
                    )}
                  </div>

                  {/* Tattoo Style */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-1.5">
                      Tattoo Style / Idea *
                    </label>
                    <select
                      name="tattooIdea" value={form.tattooIdea}
                      onChange={handleChange}
                      className={inputCls}
                      aria-describedby={errors.tattooIdea ? 'err-idea' : undefined}
                    >
                      <option value="">Select a style...</option>
                      {STYLE_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.tattooIdea && (
                      <span id="err-idea" role="alert" className="text-red-500 text-[11px] mt-1 block">{errors.tattooIdea}</span>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-1.5">
                      Preferred Date *
                    </label>
                    <input
                      type="date" name="preferredDate" value={form.preferredDate}
                      onChange={handleChange}
                      className={inputCls}
                      aria-describedby={errors.preferredDate ? 'err-date' : undefined}
                    />
                    {errors.preferredDate && (
                      <span id="err-date" role="alert" className="text-red-500 text-[11px] mt-1 block">{errors.preferredDate}</span>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a1a1a] mb-1.5">
                      Describe Your Idea *
                    </label>
                    <textarea
                      name="message" value={form.message}
                      onChange={handleChange} rows={4}
                      placeholder="Tell us about your tattoo idea, size, placement, any references..."
                      className={`${inputCls} resize-none`}
                      aria-describedby={errors.message ? 'err-msg' : undefined}
                    />
                    {errors.message && (
                      <span id="err-msg" role="alert" className="text-red-500 text-[11px] mt-1 block">{errors.message}</span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-secondary w-full py-4 min-h-[52px] mt-2 text-[12px]"
                  >
                    Send via WhatsApp
                  </button>
                  <p className="text-[#aaa] text-[11px] text-center">
                    Submitting opens WhatsApp with your details pre-filled. No spam, ever.
                  </p>
                </form>
              )}
            </div>
          </SectionReveal>

          {/* Right: Contact Info */}
          <SectionReveal>
            <div className="space-y-10">
              {/* WhatsApp CTA */}
              <div className="bg-[#1a1a1a] p-8 text-white">
                <p className="text-[#e8b84b] text-[11px] font-bold tracking-[0.2em] uppercase mb-3">
                  Prefer to message directly?
                </p>
                <h3 className="font-display text-2xl font-black uppercase mb-4">
                  Skip the form.<br />Chat with us now.
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Message us on WhatsApp and we'll set up a consultation. We respond fast, typically within an hour during studio hours.
                </p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { source: 'contact_page' })}
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white font-black text-[12px] tracking-[0.15em] uppercase px-8 py-4 hover:bg-green-500 transition-colors duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>

              {/* Studio Info */}
              <div className="space-y-6">
                <h3 className="font-display text-xl font-black text-[#1a1a1a] uppercase">Studio Info</h3>
                <div className="space-y-4 text-[14px]">
                  <div className="flex gap-4">
                    <span className="text-[#1a1a1a] font-bold w-5 flex-shrink-0 mt-0.5">📍</span>
                    <div>
                      <p className="font-bold text-[#1a1a1a] text-[11px] tracking-[0.15em] uppercase mb-1">Address</p>
                      <p className="text-[#555]">{STUDIO_ADDRESS}</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#1a1a1a] font-bold w-5 flex-shrink-0 mt-0.5">📞</span>
                    <div>
                      <p className="font-bold text-[#1a1a1a] text-[11px] tracking-[0.15em] uppercase mb-1">Phone</p>
                      <a href={`tel:${STUDIO_PHONE}`} className="text-[#555] hover:text-[#1a1a1a] transition-colors">
                        {STUDIO_PHONE}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#1a1a1a] font-bold w-5 flex-shrink-0 mt-0.5">✉️</span>
                    <div>
                      <p className="font-bold text-[#1a1a1a] text-[11px] tracking-[0.15em] uppercase mb-1">Email</p>
                      <a href={`mailto:${STUDIO_EMAIL}`} className="text-[#555] hover:text-[#1a1a1a] transition-colors">
                        {STUDIO_EMAIL}
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-[#1a1a1a] font-bold w-5 flex-shrink-0 mt-0.5">🕐</span>
                    <div>
                      <p className="font-bold text-[#1a1a1a] text-[11px] tracking-[0.15em] uppercase mb-1">Hours</p>
                      <p className="text-[#555]">{STUDIO_HOURS}</p>
                      <p className="text-[#aaa] text-[12px]">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps embed */}
              <div className="border border-[#e0ddd8] overflow-hidden">
                <iframe
                  title="AN Tattoo Shop location — Kalyandurg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30518.12!2d77.1050!3d14.5595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5a4c4c2a61e57%3A0xb96e8a3b3e3e3e3e!2sKalyandurg%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin"
                  width="100%"
                  height="280"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  );
}
