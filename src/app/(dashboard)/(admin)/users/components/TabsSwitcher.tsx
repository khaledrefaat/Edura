export interface Tab {
  value: UserRole;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function TabsSwitcher({
  tabs,
  value,
  onChange,
}: {
  tabs: Tab[];
  value: UserRole;
  onChange: (value: UserRole) => void;
}) {
  return (
    <div className="flex gap-2 rounded-xl bg-muted p-1">
      {tabs.map(({ value: tabValue, label, icon: Icon }) => (
        <button
          key={tabValue}
          type="button"
          onClick={() => onChange(tabValue)}
          className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
            tabValue === value
              ? 'bg-white text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon className="w-4 h-4" />
          {label}
        </button>
      ))}
    </div>
  );
}
