import { useState } from 'react';

function ComponentBrowser({ components, onSelect, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = {
    all: 'All Components',
    atoms: 'Atoms',
    molecules: 'Molecules',
    organisms: 'Organisms'
  };

  const allComponents = Object.entries(components).flatMap(([category, items]) =>
    items.map(item => ({ ...item, category }))
  );

  const filteredComponents = allComponents.filter(comp => {
    const matchesSearch = comp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comp.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || comp.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'stable': return 'bg-green-100 text-green-800';
      case 'beta': return 'bg-yellow-100 text-yellow-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'deprecated': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-cosmos">Components</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded"
            title="Hide sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search */}
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search components..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neptune focus:border-transparent"
        />

        {/* Category Tabs */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${
                activeCategory === key
                  ? 'bg-neptune text-white'
                  : 'bg-gray-100 text-granite hover:bg-gray-200'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Component List */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredComponents.length === 0 ? (
          <div className="text-center text-granite text-sm py-8">
            No components found
          </div>
        ) : (
          <div className="space-y-2">
            {filteredComponents.map((component, idx) => (
              <button
                key={idx}
                onClick={() => onSelect(component)}
                className="w-full text-left p-3 bg-white border border-gray-200 rounded-lg hover:border-neptune hover:shadow-sm transition-all group"
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-medium text-cosmos group-hover:text-neptune">
                    {component.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(component.status)}`}>
                    {component.status}
                  </span>
                </div>
                {component.description && (
                  <p className="text-sm text-granite line-clamp-2">
                    {component.description}
                  </p>
                )}
                {component.tags && component.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {component.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-xs text-slate bg-gray-100 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
        <p className="text-xs text-granite text-center">
          {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
        </p>
      </div>
    </div>
  );
}

export default ComponentBrowser;
