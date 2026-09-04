import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import { AdminProvider, useAdmin } from './components/AdminContext';
import { Save, LogOut, Lock } from 'lucide-react';

function AdminControls() {
  const { isEditing, setIsEditing, saveChanges, hasChanges } = useAdmin();

  if (!isEditing) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-card border border-accent/50 rounded-full px-6 py-3 shadow-2xl z-50 flex items-center gap-4">
      <span className="text-accent font-semibold text-sm mr-2">Admin Mode</span>
      <button 
        onClick={saveChanges}
        disabled={!hasChanges}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${hasChanges ? 'bg-accent text-bg hover:opacity-90' : 'bg-white/10 text-muted cursor-not-allowed'}`}
      >
        <Save size={16} />
        Save Changes
      </button>
      <button 
        onClick={() => setIsEditing(false)}
        className="flex items-center gap-2 px-4 py-2 bg-white/10 text-text rounded-full text-sm font-semibold hover:bg-white/20 transition-colors"
      >
        <LogOut size={16} />
        Exit
      </button>
    </div>
  );
}

function HiddenAdminTrigger() {
  const { isEditing, setIsEditing } = useAdmin();
  
  if (isEditing) return null;

  const handleTrigger = () => {
    const pwd = prompt('Enter admin password:');
    if (pwd === 'admin123') {
      setIsEditing(true);
    } else if (pwd !== null) {
      alert('Incorrect password');
    }
  };

  return (
    <button 
      onClick={handleTrigger}
      className="inline-flex items-center justify-center p-2 rounded-full opacity-5 hover:opacity-100 transition-opacity ml-2 outline-none focus:outline-none"
      title="Admin Login"
    >
      <Lock size={14} />
    </button>
  );
}

function App() {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-bg text-text font-sans">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Contact />
        </main>
        
        <footer className="py-8 text-center text-muted border-t border-white/5 flex items-center justify-center">
          <p>&copy; {new Date().getFullYear()} K R DIVYANSH. Built with React & Tailwind.</p>
          <HiddenAdminTrigger />
        </footer>
        
        <AdminControls />
      </div>
    </AdminProvider>
  );
}

export default App;
