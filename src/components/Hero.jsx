import { useAdmin } from './AdminContext';
import Editable from './Editable';
import { ArrowRight, FileText } from 'lucide-react';

export default function Hero() {
  const { portfolioData, isEditing } = useAdmin();
  const { hero } = portfolioData;

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="text-center max-w-3xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-bold text-text mb-6 flex flex-wrap justify-center gap-2 items-center">
          Hi, I'm <span className="text-accent inline-block min-w-[200px]"><Editable section="hero" field="name"><span className="text-accent">{hero.name}</span></Editable></span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-muted mb-8 max-w-[400px] mx-auto">
          <Editable section="hero" field="title">{hero.title}</Editable>
        </h2>
        <div className="text-lg md:text-xl text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
          <Editable section="hero" field="pitch" multiline>{hero.pitch}</Editable>
        </div>
        
        {isEditing && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
             <div className="flex flex-col text-sm text-left">
               <label className="text-accent mb-1">Resume URL:</label>
               <Editable section="hero" field="resumeUrl" className="min-w-[250px]" />
             </div>
             <div className="flex flex-col text-sm text-left">
               <label className="text-accent mb-1">Contact URL:</label>
               <Editable section="hero" field="contactUrl" className="min-w-[250px]" />
             </div>
          </div>
        )}

        {!isEditing && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={hero.contactUrl}
              className="flex items-center gap-2 px-8 py-3 bg-accent text-bg font-semibold rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
            >
              Get in Touch
              <ArrowRight size={18} />
            </a>
            <a
              href={hero.resumeUrl}
              className="flex items-center gap-2 px-8 py-3 bg-card border border-white/10 text-text font-semibold rounded-lg hover:bg-white/5 transition-colors w-full sm:w-auto justify-center"
            >
              <FileText size={18} />
              View Resume
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
