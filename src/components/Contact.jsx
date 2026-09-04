import { useAdmin } from './AdminContext';
import Editable from './Editable';
import { Mail, Send, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa6';

export default function Contact() {
  const { portfolioData, isEditing } = useAdmin();
  const { contact } = portfolioData;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! This is a demo form.');
    e.target.reset();
  };

  return (
    <section id="contact" className="py-24 px-4 bg-bg">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">
          Get In Touch
        </h2>
        <p className="text-lg text-muted mb-12 max-w-2xl mx-auto">
          Whether you have a question or just want to say hi, I'll try my best to get back to you!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info & Socials */}
          <div className="text-left space-y-6">
            {!isEditing ? (
              <>
                <a href={`mailto:${contact.email}`} className="group inline-flex items-center gap-4 text-xl text-text hover:text-accent transition-colors">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 shrink-0 group-hover:border-accent/50 transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="truncate">{contact.email}</span>
                </a>

                <a href={`tel:${contact.phone}`} className="group inline-flex items-center gap-4 text-xl text-text hover:text-accent transition-colors">
                  <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 shrink-0 group-hover:border-accent/50 transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <span>{contact.phone}</span>
                </a>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href={contact.github} target="_blank" rel="noreferrer" title="GitHub" className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 text-muted hover:text-white hover:border-white/50 transition-all hover:-translate-y-1">
                    <FaGithub className="w-5 h-5" />
                  </a>
                  <a href={contact.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 text-muted hover:text-[#0077b5] hover:border-[#0077b5]/50 transition-all hover:-translate-y-1">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                  <a href={contact.instagram} target="_blank" rel="noreferrer" title="Instagram" className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 text-muted hover:text-[#E1306C] hover:border-[#E1306C]/50 transition-all hover:-translate-y-1">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                  <a href={contact.youtube} target="_blank" rel="noreferrer" title="YouTube" className="w-12 h-12 rounded-full bg-card flex items-center justify-center border border-white/5 text-muted hover:text-[#FF0000] hover:border-[#FF0000]/50 transition-all hover:-translate-y-1">
                    <FaYoutube className="w-5 h-5" />
                  </a>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-4 text-sm bg-card p-4 rounded-xl border border-accent/20">
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><Mail size={14}/> Email</label>
                  <Editable section="contact" field="email" />
                </div>
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><Phone size={14}/> Phone</label>
                  <Editable section="contact" field="phone" />
                </div>
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><FaGithub size={14}/> GitHub URL</label>
                  <Editable section="contact" field="github" />
                </div>
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><FaLinkedin size={14}/> LinkedIn URL</label>
                  <Editable section="contact" field="linkedin" />
                </div>
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><FaInstagram size={14}/> Instagram URL</label>
                  <Editable section="contact" field="instagram" />
                </div>
                <div className="flex flex-col">
                  <label className="text-accent mb-1 flex items-center gap-2"><FaYoutube size={14}/> YouTube URL</label>
                  <Editable section="contact" field="youtube" />
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-muted mb-1">Name</label>
              <input type="text" id="name" required className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="John Doe" disabled={isEditing} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-muted mb-1">Email</label>
              <input type="email" id="email" required className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors" placeholder="john@example.com" disabled={isEditing} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-muted mb-1">Message</label>
              <textarea id="message" required rows="4" className="w-full bg-card border border-white/10 rounded-lg px-4 py-3 text-text focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors resize-none" placeholder="Hello..." disabled={isEditing}></textarea>
            </div>
            <button type="submit" disabled={isEditing} className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-accent text-bg font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50">
              Send Message
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
