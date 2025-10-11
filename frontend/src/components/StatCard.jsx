export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'indigo' }) {
  const colorClasses = {
    indigo: 'from-indigo-500 to-purple-600',
    green: 'from-green-500 to-emerald-600',
    amber: 'from-amber-500 to-orange-600',
    red: 'from-red-500 to-rose-600',
    blue: 'from-blue-500 to-cyan-600',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-white/80 text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold mb-2">{value}</p>
          {subtitle && <p className="text-white/70 text-sm">{subtitle}</p>}
          {trend && (
            <div className="mt-2 inline-flex items-center text-sm">
              <span className="font-semibold">{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="bg-white/20 rounded-lg p-3">
            <Icon className="h-8 w-8" />
          </div>
        )}
      </div>
    </div>
  );
}
