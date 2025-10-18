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

  // Handle both component and JSX element icons
  const IconComponent = typeof icon === 'function' ? icon : null;
  const iconElement = typeof icon === 'object' ? icon : null;

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
        {(IconComponent || iconElement) && (
          <div className="bg-white/20 rounded-lg p-3">
            {IconComponent ? <IconComponent className="h-8 w-8" /> : iconElement}
          </div>
        )}
      </div>
    </div>
  );
}
