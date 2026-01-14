function SourceCard({ source }) {
  // Extract component name from path (e.g., "components/atoms/button.md" -> "Button")
  const getDisplayName = (filename) => {
    if (!filename) return 'Unknown';

    const parts = filename.split('/');
    const file = parts[parts.length - 1];
    const name = file.replace('.md', '');

    // Capitalize and format (e.g., "input-field" -> "Input Field")
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Get category badge (atoms, molecules, organisms)
  const getCategory = (filename) => {
    if (!filename) return null;
    if (filename.includes('/atoms/')) return 'Atom';
    if (filename.includes('/molecules/')) return 'Molecule';
    if (filename.includes('/organisms/')) return 'Organism';
    if (filename.includes('/foundations/')) return 'Foundation';
    if (filename.includes('/patterns/')) return 'Pattern';
    return null;
  };

  const displayName = source.name || getDisplayName(source.filename);
  const category = getCategory(source.filename);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-neptune/10 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-neptune" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <p className="text-sm font-semibold text-cosmos">
              {displayName}
            </p>
            {category && (
              <span className="text-xs px-2 py-0.5 bg-neptune/20 text-neptune rounded-full font-medium">
                {category}
              </span>
            )}
          </div>
          <p className="text-xs text-granite/70 truncate font-mono">
            {source.filename}
          </p>
          {source.quote && (
            <p className="text-xs text-granite mt-2 line-clamp-2 italic border-l-2 border-neptune/30 pl-2">
              "{source.quote}"
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SourceCard;
