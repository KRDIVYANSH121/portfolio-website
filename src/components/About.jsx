import { useAdmin } from './AdminContext';
import Editable from './Editable';

export default function About() {
  const { portfolioData, isEditing } = useAdmin();
  const { about } = portfolioData;

  return (
    <section id="about" className="py-24 px-4 bg-card/50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          About Me
        </h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <div className="text-lg text-muted leading-relaxed">
              <Editable section="about" field="bio" multiline>{about.bio}</Editable>
            </div>
            {isEditing && (
              <div className="mt-4 flex flex-col text-sm text-left">
                <label className="text-accent mb-1">Image URL:</label>
                <Editable section="about" field="image" />
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3 max-w-[300px]">
            <div className="relative aspect-square rounded-2xl overflow-hidden border-2 border-white/10">
              <img 
                src={about.image} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-accent/10 mix-blend-overlay pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
