import { useAdmin } from './AdminContext';
import { GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Education() {
  const { portfolioData, isEditing, updateData } = useAdmin();
  const { education } = portfolioData;

  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    if (isEditing) {
      setJsonText(JSON.stringify(education, null, 2));
    }
  }, [isEditing, education]);

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      updateData('education', null, parsed);
    } catch(err) {
      // invalid json while typing
    }
  }

  return (
    <section id="education" className="py-24 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          Education
        </h2>
        
        {isEditing ? (
          <div className="w-full">
            <p className="text-accent mb-2 text-sm">Edit Education JSON Data:</p>
            <textarea 
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full h-[200px] bg-black/50 border border-accent/50 rounded p-4 font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
        ) : (
          <div className="space-y-6">
            {education.map((edu, index) => (
              <div key={index} className="bg-card border border-white/5 p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[rgba(110,231,200,0.1)] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text">{edu.degree}</h3>
                    <h4 className="text-lg text-muted">{edu.institution}</h4>
                    <p className="text-sm text-muted/70 mt-2">Coursework: {edu.coursework}</p>
                  </div>
                </div>
                <div className="text-accent font-mono text-sm shrink-0 md:text-right">
                  {edu.dates}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
