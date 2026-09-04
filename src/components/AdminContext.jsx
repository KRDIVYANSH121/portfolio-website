import { createContext, useContext, useState, useEffect } from 'react';
import initialData from '../data/portfolioData.json';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [isEditing, setIsEditing] = useState(false);
  const [portfolioData, setPortfolioData] = useState(initialData);
  const [hasChanges, setHasChanges] = useState(false);

  // Re-sync if the file changes directly (HMR)
  useEffect(() => {
    if (!hasChanges) {
      setPortfolioData(initialData);
    }
  }, [initialData]);

  const updateData = (section, field, value) => {
    setPortfolioData(prev => {
      if (field === null) {
        return {
          ...prev,
          [section]: value
        };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
    setHasChanges(true);
  };

  const saveChanges = async () => {
    try {
      const res = await fetch('/api/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(portfolioData)
      });
      if (res.ok) {
        setHasChanges(false);
        setIsEditing(false);
        alert('Changes saved to portfolioData.json successfully!');
      } else {
        alert('Failed to save changes. Make sure you are running the local Vite dev server.');
      }
    } catch (err) {
      console.error(err);
      alert('Error saving changes.');
    }
  };

  const value = {
    isEditing,
    setIsEditing,
    portfolioData,
    updateData,
    saveChanges,
    hasChanges
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
