import { useState, useEffect } from 'react';
import Chat from './components/Chat';
import ComponentBrowser from './components/ComponentBrowser';

function App() {
  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Load components on mount
  useEffect(() => {
    fetch('/api/components')
      .then(res => res.json())
      .then(data => {
        setComponents(data.grouped || {});
      })
      .catch(err => console.error('Failed to load components:', err));
  }, []);

  const handleComponentSelect = (component) => {
    setSelectedComponent(component);
    // Auto-fill chat with component query
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Component Browser Sidebar */}
      <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 overflow-hidden border-r border-gray-200 bg-white`}>
        <ComponentBrowser
          components={components}
          onSelect={handleComponentSelect}
          onClose={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <Chat
          selectedComponent={selectedComponent}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
      </div>
    </div>
  );
}

export default App;
