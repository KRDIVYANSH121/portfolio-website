import { useAdmin } from './AdminContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Skills() {
  const { portfolioData, isEditing, updateData } = useAdmin();
  const { skills } = portfolioData;

  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    if (isEditing) {
      setJsonText(JSON.stringify(skills, null, 2));
    }
  }, [isEditing, skills]);

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      updateData('skills', null, parsed);
    } catch(err) {
      // invalid json while typing
    }
  }

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          Skills & Technologies
        </h2>
        
        {isEditing ? (
          <div className="w-full">
            <p className="text-accent mb-2 text-sm">Edit Skills JSON Data:</p>
            <textarea 
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full h-[300px] bg-black/50 border border-accent/50 rounded p-4 font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                key={skillGroup.category} 
                className="bg-card border border-white/5 p-6 rounded-2xl"
              >
                <h3 className="text-xl font-semibold text-text mb-6 pb-4 border-b border-white/10">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((item, i) => (
                    <motion.span 
                      whileHover={{ scale: 1.05 }}
                      key={item}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-muted hover:text-accent hover:border-accent/50 transition-colors"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
