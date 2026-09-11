import React from 'react';
import { 
  Users, 
  Headphones, 
  Receipt, 
  FileSignature, 
  MessageSquare, 
  BarChart3, 
  Mic, 
  Briefcase,
  Plus
} from 'lucide-react';

export const ZohoOneAppRail = ({ activeProduct, setActiveProduct, onOpenModal }) => {
  const apps = [
    { id: 'crm', name: 'CRM', icon: Users, color: 'bg-[#E42528]', textColor: 'text-white' },
    { id: 'voice', name: 'Voice AI', icon: Mic, color: 'bg-gradient-to-tr from-rose-500 to-pink-600', textColor: 'text-white', badge: 'NEW' },
    { id: 'books', name: 'Books', icon: Receipt, color: 'bg-[#0074E4]', textColor: 'text-white' },
    { id: 'desk', name: 'Desk', icon: Headphones, color: 'bg-[#00A859]', textColor: 'text-white' },
    { id: 'sign', name: 'Sign', icon: FileSignature, color: 'bg-[#00B4D8]', textColor: 'text-white' },
    { id: 'analytics', name: 'Analytics', icon: BarChart3, color: 'bg-[#FFB900]', textColor: 'text-slate-900' },
  ];

  return (
    <aside className="w-16 bg-[#081324] border-r border-[#172e50] flex flex-col items-center py-3 select-none shrink-0 h-full">
      {/* App Icons List */}
      <div className="flex flex-col items-center gap-3 w-full">
        {apps.map((app) => {
          const Icon = app.icon;
          const isActive = activeProduct === app.id;
          return (
            <button
              key={app.id}
              onClick={() => {
                if (app.id === 'crm') {
                  setActiveProduct('crm');
                } else {
                  onOpenModal(app.id);
                }
              }}
              title={`Zoho ${app.name}`}
              className={`group flex flex-col items-center justify-center w-12 py-1.5 rounded-xl transition-all relative ${
                isActive ? 'bg-[#132644] ring-1 ring-[#0074E4]' : 'hover:bg-[#10223b]'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${app.color} ${app.textColor} flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-300 mt-1 truncate max-w-[48px]">
                {app.name}
              </span>
              {app.badge && (
                <span className="absolute -top-1 -right-1 px-1 py-0.2 rounded text-[8px] font-bold bg-[#E42528] text-white">
                  {app.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-auto flex flex-col items-center gap-2">
        <button 
          title="Add Custom Zoho Creator Module"
          className="w-8 h-8 rounded-lg bg-[#132742] hover:bg-[#1a3357] text-slate-400 hover:text-white flex items-center justify-center border border-[#1f3a5f] transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </aside>
  );
};
