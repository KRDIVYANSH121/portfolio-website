import { useAdmin } from './AdminContext';

export default function Editable({ 
  section, 
  field, 
  className, 
  multiline = false, 
  children,
  placeholder = ""
}) {
  const { isEditing, portfolioData, updateData } = useAdmin();

  if (!isEditing) {
    return <>{children}</>;
  }

  const value = portfolioData[section]?.[field] || "";
  
  const handleChange = (e) => {
    updateData(section, field, e.target.value);
  };

  const baseClasses = `bg-black/30 border border-accent/50 rounded p-1 w-full focus:outline-none focus:ring-1 focus:ring-accent ${className}`;

  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={handleChange}
        className={`${baseClasses} resize-none`}
        rows={4}
        placeholder={placeholder}
      />
    );
  }

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      className={baseClasses}
      placeholder={placeholder}
    />
  );
}
