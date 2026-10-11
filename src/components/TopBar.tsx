import React from 'react';
import { FileText, RefreshCw } from 'lucide-react';

interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenReportModal: () => void;
  onResetParams: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenReportModal,
  onResetParams
}) => {
  const navItems = [
    { id: 'summary', label: '估值结论' },
    { id: 'sandbox', label: '动态沙盘' },
    { id: 'models', label: '四大模型' },
    { id: 'tracks', label: '五大赛道' },
    { id: 'swot', label: '溢价与风险' },
    { id: 'strategy', label: '投资策略' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <span 
            onClick={() => setActiveTab('summary')}
            className="text-lg font-bold tracking-tight text-slate-900 cursor-pointer"
          >
            Gemini估值决策平台
          </span>
          <span className="hidden sm:inline text-xs text-slate-400 font-mono">
            kxschool.com
          </span>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap rounded-md ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onResetParams}
            title="重置为商业计划书基准参数"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={onOpenReportModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>生成投资备忘录</span>
          </button>
        </div>
      </div>
      
      {/* Mobile nav scrollbar */}
      <div className="md:hidden flex overflow-x-auto px-4 py-2 bg-slate-50 border-t border-slate-200 gap-1 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-2.5 py-1 rounded whitespace-nowrap font-medium ${
              activeTab === item.id ? 'bg-slate-900 text-white' : 'text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
};
