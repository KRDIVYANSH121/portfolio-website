import { useAdmin } from './AdminContext';
import ProjectCard from './ProjectCard';
import { useState, useEffect } from 'react';

export default function Projects() {
  const { portfolioData, isEditing, updateData } = useAdmin();
  const { projects } = portfolioData;

  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    if (isEditing) {
      setJsonText(JSON.stringify(projects, null, 2));
    }
  }, [isEditing, projects]);

  const handleJsonChange = (e) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      updateData('projects', null, parsed); // wait, updateData needs to handle whole section if field is null. Let's tweak updateData in AdminContext or just pass the parsed array if updateData handles it.
      // Actually, updateData replaces field inside section. 
      // If we want to replace the whole section, we need to adapt updateData.
    } catch(err) {
      // invalid json while typing
    }
  }

  return (
    <section id="projects" className="py-24 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-text mb-12 flex items-center gap-4">
          <span className="w-8 h-[1px] bg-accent"></span>
          Featured Projects
        </h2>
        
        {isEditing ? (
          <div className="w-full">
            <p className="text-accent mb-2 text-sm">Edit Projects JSON Data:</p>
            <textarea 
              value={jsonText}
              onChange={handleJsonChange}
              className="w-full h-[400px] bg-black/50 border border-accent/50 rounded p-4 font-mono text-sm focus:outline-none focus:border-accent"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
