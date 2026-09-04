import { useAdmin } from './AdminContext';
import { Briefcase } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ExperienceIcon = ({ icon }) => {
  const [error, setError] = useState(false);
  
  if (icon && !error) {
    return (
      <img 
        src={icon} 
        alt="Company logo" 
        className="w-full h-full object-contain p-0.5 rounded-full bg-white"
        onError={() => setError(true)}
      />
    );
  }
  return <Briefcase className="w-3 h-3 text-accent" />;
};

export default function Experience() {
  const { portfolioData, isEditing, updateData } = useAdmin();
  const { experience } = portfolioData;

  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    if (isEditing) {
      setJsonText(JSON.stringify(experience, null, 2));
    }
  }, [isEditing, experience]);

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      updateData('experience', null, parsed);
    } catch(err) {
      // invalid json while typing
    }
  }

  return (
    <section id="experience" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-16 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          Experience
        </h2>
        
        {isEditing ? (
          <div className="w-full">
            <p className="text-accent mb-2 text-sm">Edit Experience JSON Data:</p>
            <textarea 
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full h-[500px] bg-black/50 border border-accent/50 rounded p-4 font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
        ) : (
          <div className="space-y-12">
            {experience.map((job, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline line */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="hidden md:block w-5/12"></div>
                  
                  {/* Timeline dot / Logo */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-bg border-2 border-accent -translate-x-1/2 flex items-center justify-center mt-1 md:mt-0 z-10 overflow-hidden"
                  >
                    <ExperienceIcon icon={job.icon} />
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="w-full md:w-5/12 bg-card border border-white/5 p-6 rounded-2xl relative hover:border-white/10 transition-colors"
                  >
                    <span className="text-accent font-mono text-sm mb-2 block">{job.dates}</span>
                    <h3 className="text-xl font-bold text-text">{job.role}</h3>
                    <h4 className="text-lg text-muted mb-4">{job.company}</h4>
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="text-muted text-sm flex gap-2">
                          <span className="text-accent mt-1 text-xs">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
