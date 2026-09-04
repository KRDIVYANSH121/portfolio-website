import { useState, useRef } from 'react';
import { clsx } from 'clsx';

export default function ProjectCard({ project }) {
  const [flipped, setFlipped] = useState(false);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (flipped || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y / rect.height) - 0.5) * -18;
    const rotateY = ((x / rect.width) - 0.5) * 18;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg)`);
  };

  const handleMouseLeave = () => {
    if (!flipped) {
      setTransform('rotateX(0deg) rotateY(0deg)');
    }
  };

  const handleClick = () => {
    const nextFlipped = !flipped;
    setFlipped(nextFlipped);
    if (nextFlipped) {
      setTransform('rotateY(180deg)');
    } else {
      setTransform('rotateX(0deg) rotateY(0deg)');
    }
  };

  return (
    <div className="perspective-1200 w-full max-w-[280px] h-[360px] mx-auto group">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={clsx(
          "relative w-full h-full preserve-3d cursor-pointer transition-transform duration-150 ease-out",
          flipped && "duration-600 ease-[cubic-bezier(0.2,0.9,0.3,1.2)]"
        )}
        style={{ transform }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 rounded-xl backface-hidden flex flex-col justify-between p-5 bg-card border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,200,0.15),transparent_60%)] before:pointer-events-none">
          <div className="w-full h-[130px] rounded-lg bg-gradient-to-br from-[#22252e] to-[#2c3038] flex items-center justify-center text-muted text-xs tracking-wide bg-cover bg-center" style={project.image ? { backgroundImage: `url(${project.image})` } : {}}>
            {!project.image && "PROJECT PREVIEW"}
          </div>
          <div>
            <h3 className="mt-4 mb-1 text-text text-lg font-semibold">{project.title}</h3>
            <p className="text-muted text-sm m-0">Click to flip for details</p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              {project.tech.map((t) => (
                <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-[rgba(110,231,200,0.12)] text-accent border border-[rgba(110,231,200,0.25)]">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 rounded-xl backface-hidden flex flex-col justify-between p-5 bg-card border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden [transform:rotateY(180deg)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_30%_20%,rgba(110,231,200,0.15),transparent_60%)] before:pointer-events-none">
          <div>
            <h3 className="mt-4 mb-1 text-text text-lg font-semibold">{project.title}</h3>
            <p className="text-muted text-sm leading-relaxed m-0">{project.description}</p>
          </div>
          <div className="flex gap-2.5 mt-3.5">
            <a href={project.repoUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 text-center py-2 rounded-lg text-xs no-underline border border-white/15 text-text hover:bg-white/5 transition-colors">
              Code
            </a>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 text-center py-2 rounded-lg text-xs no-underline border border-accent bg-accent text-bg font-semibold hover:opacity-90 transition-opacity">
              Live
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
