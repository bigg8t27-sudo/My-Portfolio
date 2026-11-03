'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

const socials = [
  { label:'GitHub',   href:'https://github.com/alfredofori',    color:'255,255,255', icon:'GH' },
  { label:'LinkedIn', href:'https://linkedin.com/in/alfredofori', color:'10,102,194',  icon:'in' },
  { label:'Twitter',  href:'https://twitter.com/alfredofori',   color:'29,155,240',  icon:'X'  },
  { label:'Dribbble', href:'https://dribbble.com/alfredofori',  color:'234,76,137',  icon:'Dr' },
  { label:'IG',       href:'https://instagram.com/alfredofori', color:'228,64,95',   icon:'IG' },
];

const iv = { hidden:{opacity:0,y:40}, visible:{opacity:1,y:0,transition:{duration:0.7,ease:[0.22,1,0.36,1]}} };
const cv = { hidden:{}, visible:{ transition:{ staggerChildren:0.1 } } };

type FormState = { name:string; email:string; subject:string; message:string };
type Status = 'idle'|'sending'|'success'|'error';

const normalBorder  = 'rgba(255,255,255,0.08)';
const focusBorder   = 'rgba(59,130,246,0.7)';
const errorBorder   = 'rgba(239,68,68,0.6)';
const normalBg      = 'rgba(255,255,255,0.03)';

export default function ContactSection() {
  const [form,   setForm]   = useState<FormState>({ name:'', email:'', subject:'', message:'' });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<Status>('idle');

  const set = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
      setForm(f => ({...f, [k]: e.target.value}));

  const handleFocus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = focusBorder;
    e.currentTarget.style.boxShadow   = '0 0 0 3px rgba(59,130,246,0.08)';
  };

  // Fix: capture the current error value at call time, not lazily
  const handleBlur = (hasError: boolean) =>
    (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = hasError ? errorBorder : normalBorder;
      e.currentTarget.style.boxShadow   = 'none';
    };

  const fieldStyle = (err?: string) => ({
    borderColor: err ? errorBorder : normalBorder,
    background: normalBg,
  });

  const baseClass = "w-full border rounded-xl px-4 py-3 text-sm text-white/80 outline-none transition-all duration-200";

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.email.trim())   e.email   = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    return e;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        // Surface the server's error message if available
        setErrors({ message: data.error ?? 'Something went wrong. Please try again.' });
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.3),rgba(13,13,46,0.9) 30%,rgba(10,10,26,0.85) 70%,rgba(0,0,0,0.5))' }}/>
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to bottom,rgba(0,0,0,0.8),transparent)' }}/>

      <div className="max-w-6xl mx-auto relative">
        {/* header */}
        <motion.div className="flex flex-col items-center text-center mb-16"
          initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-80px' }} variants={cv}>
          <motion.div variants={iv} className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-blue-400" aria-hidden="true"/>
            <span className="text-xs tracking-[0.25em] uppercase text-blue-400">Get In Touch</span>
            <div className="w-8 h-px bg-blue-400" aria-hidden="true"/>
          </motion.div>
          <motion.h2 variants={iv}
            className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-4"
            style={{ fontFamily:'Syne, sans-serif' }}>
            <span className="text-white">LET&apos;S </span>
            <span className="gradient-text">CONNECT</span>
          </motion.h2>
          <motion.p variants={iv} className="text-white/50 max-w-xl">
            Have a project in mind? I typically respond within 24 hours.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">

          {/* Info panel */}
          <motion.div className="lg:col-span-2 flex flex-col gap-8"
            initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={cv}>
            <motion.div variants={iv} className="flex flex-col gap-4">

              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/233597580576?text=Hi%20Alfred%2C%20I%20found%20your%20portfolio%20and%20would%20love%20to%20discuss%20a%20project."
                target="_blank" rel="noopener noreferrer"
                whileHover={{ scale:1.03, x:4 }} whileTap={{ scale:0.97 }}
                aria-label="Chat on WhatsApp"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl glass border border-white/[0.08] hover:border-green-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(37,211,102,0.12)', border:'1px solid rgba(37,211,102,0.3)' }}
                  aria-hidden="true">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="rgba(37,211,102,0.9)" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-green-400 transition-colors">WhatsApp</div>
                  <div className="text-xs text-white/40">+233 597 580 576</div>
                </div>
              </motion.a>

              {/* Email */}
              <motion.a href="mailto:bigg8t27@gmail.com"
                whileHover={{ scale:1.03, x:4 }} whileTap={{ scale:0.97 }}
                aria-label="Send email to bigg8t27@gmail.com"
                className="flex items-center gap-4 px-5 py-4 rounded-2xl glass border border-white/[0.08] hover:border-blue-500/40 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:'rgba(59,130,246,0.12)', border:'1px solid rgba(59,130,246,0.3)' }}
                  aria-hidden="true">
                  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>
                  </svg>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">Email</div>
                  <div className="text-xs text-white/40">bigg8t27@gmail.com</div>
                </div>
              </motion.a>
            </motion.div>

            {/* Socials */}
            <motion.div variants={iv}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30 mb-4">Find Me Online</p>
              <div className="flex flex-wrap gap-3" role="list">
                {socials.map(s => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    whileHover={{ scale:1.15, y:-2 }} whileTap={{ scale:0.95 }}
                    aria-label={`Visit ${s.label} profile`}
                    role="listitem"
                    className="w-10 h-10 rounded-xl flex items-center justify-center glass border border-white/[0.08] text-xs font-bold transition-all duration-200"
                    style={{ color:`rgba(${s.color},0.7)` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor=`rgba(${s.color},0.5)`; e.currentTarget.style.color=`rgba(${s.color},1)`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,0.08)'; e.currentTarget.style.color=`rgba(${s.color},0.7)`; }}>
                    <span aria-hidden="true">{s.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Availability */}
            <motion.div variants={iv}
              className="flex items-center gap-3 px-4 py-3 rounded-xl glass border border-green-500/20"
              role="status" aria-live="polite">
              <div className="relative flex-shrink-0" aria-hidden="true">
                <div className="w-3 h-3 rounded-full bg-green-400"/>
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-400 animate-ping opacity-60"/>
              </div>
              <span className="text-sm text-white/60">
                Available for new projects ·{' '}
                <span className="text-green-400">Open to work</span>
              </span>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div className="lg:col-span-3"
            initial="hidden" whileInView="visible" viewport={{ once:true, margin:'-60px' }} variants={cv}>

            {status === 'success' ? (
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                transition={{ duration:0.6, ease:[0.22,1,0.36,1] }}
                role="alert"
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center rounded-3xl glass border border-green-500/25 p-10">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background:'rgba(16,185,129,0.15)', border:'1px solid rgba(16,185,129,0.4)' }}
                  aria-hidden="true">
                  <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily:'Syne, sans-serif' }}>Message Sent!</h3>
                <p className="text-white/50">Thanks for reaching out. I&apos;ll reply within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={submit} noValidate
                aria-label="Contact form"
                className="rounded-3xl p-7 md:p-9 glass border border-white/[0.08]">

                {status === 'error' && (
                  <div role="alert" className="mb-4 px-4 py-3 rounded-xl text-sm text-red-400"
                    style={{ background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.25)' }}>
                    {errors.message
                      ? errors.message
                      : <>Something went wrong. Please try emailing directly at{' '}
                          <a href="mailto:bigg8t27@gmail.com" className="underline">bigg8t27@gmail.com</a>
                        </>
                    }
                  </div>
                )}

                <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5" variants={cv}>
                  <motion.div variants={iv} className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs tracking-[0.15em] uppercase text-white/40">Your Name *</label>
                    <input id="name" name="name" type="text" autoComplete="name"
                      value={form.name} onChange={set('name')}
                      onFocus={handleFocus} onBlur={handleBlur(!!errors.name)}
                      aria-required="true" aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={!!errors.name}
                      className={baseClass} style={fieldStyle(errors.name)}/>
                    {errors.name && <span id="name-error" role="alert" className="text-xs text-red-400">{errors.name}</span>}
                  </motion.div>
                  <motion.div variants={iv} className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs tracking-[0.15em] uppercase text-white/40">Email Address *</label>
                    <input id="email" name="email" type="email" autoComplete="email"
                      value={form.email} onChange={set('email')}
                      onFocus={handleFocus} onBlur={handleBlur(!!errors.email)}
                      aria-required="true" aria-describedby={errors.email ? 'email-error' : undefined}
                      aria-invalid={!!errors.email}
                      className={baseClass} style={fieldStyle(errors.email)}/>
                    {errors.email && <span id="email-error" role="alert" className="text-xs text-red-400">{errors.email}</span>}
                  </motion.div>
                </motion.div>

                <motion.div className="flex flex-col gap-5" variants={cv}>
                  <motion.div variants={iv} className="flex flex-col gap-1.5">
                    <label htmlFor="subject" className="text-xs tracking-[0.15em] uppercase text-white/40">Subject *</label>
                    <input id="subject" name="subject" type="text" autoComplete="off"
                      value={form.subject} onChange={set('subject')}
                      onFocus={handleFocus} onBlur={handleBlur(!!errors.subject)}
                      aria-required="true" aria-describedby={errors.subject ? 'subject-error' : undefined}
                      aria-invalid={!!errors.subject}
                      className={baseClass} style={fieldStyle(errors.subject)}/>
                    {errors.subject && <span id="subject-error" role="alert" className="text-xs text-red-400">{errors.subject}</span>}
                  </motion.div>
                  <motion.div variants={iv} className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-xs tracking-[0.15em] uppercase text-white/40">Message * (min 10 chars)</label>
                    <textarea id="message" name="message" rows={5} autoComplete="off"
                      value={form.message} onChange={set('message')}
                      onFocus={handleFocus} onBlur={handleBlur(!!errors.message)}
                      aria-required="true" aria-describedby={errors.message ? 'message-error' : undefined}
                      aria-invalid={!!errors.message}
                      className={baseClass + ' resize-none'} style={fieldStyle(errors.message)}/>
                    {errors.message && <span id="message-error" role="alert" className="text-xs text-red-400">{errors.message}</span>}
                  </motion.div>
                </motion.div>

                <motion.button type="submit" variants={iv}
                  disabled={status === 'sending'}
                  whileHover={status !== 'sending' ? { scale:1.03, boxShadow:'0 0 30px rgba(59,130,246,0.35)' } : {}}
                  whileTap={status !== 'sending' ? { scale:0.97 } : {}}
                  aria-busy={status === 'sending'}
                  className="mt-6 w-full py-4 rounded-xl text-sm font-semibold tracking-widest uppercase text-white flex items-center justify-center gap-2 transition-opacity"
                  style={{ background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', opacity: status === 'sending' ? 0.7 : 1 }}>
                  {status === 'sending' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
                        <path d="M12 2a10 10 0 0110 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      </svg>
                      Sending&hellip;
                    </>
                  ) : 'Send Message'}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background:'linear-gradient(to top,rgba(0,0,0,0.8),transparent)' }} aria-hidden="true"/>
    </section>
  );
}
