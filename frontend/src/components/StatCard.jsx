import { isValidElement, createElement } from 'react';

export default function StatCard({ title, value, subtitle, icon, trend, trendLabel, color = 'indigo' }) {
  const colorClasses = {
    indigo: 'from-indigo-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    amber: 'from-amber-500 to-orange-600',
    orange: 'from-orange-500 to-amber-600',
    purple: 'from-purple-500 to-fuchsia-600',
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-cyan-600',
  };

  // Render icon: handle both React elements (JSX) and component types
  const renderIcon = () => {
    if (!icon) return null;
    
    // If it's already a React element (JSX), render it directly
    if (isValidElement(icon)) {
      return icon;
    }
    
    // Otherwise, treat it as a component and instantiate it
    return createElement(icon, { className: 'h-8 w-8' });
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color] || colorClasses.indigo} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
          {trend && (
            <div className="mt-2 inline-flex items-center text-sm">
              <span className="font-semibold">{trend}</span>
              {trendLabel && <span className="ml-1 text-white/70">{trendLabel}</span>}
            </div>
          )}
        </div>
        {icon && (
          <div className="bg-white/20 rounded-lg p-3">
            {renderIcon()}
          </div>
        )}
      </div>
    </div>
  );
}
