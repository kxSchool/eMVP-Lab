import { useState, useMemo } from 'react';
import { INITIAL_SANDBOX_PARAMS } from './data/projectData';
import { calculateValuationResults } from './utils/valuationCalculators';
import { TopBar } from './components/TopBar';
import { ExecutiveSummaryView } from './components/ExecutiveSummaryView';
import { ValuationSandbox } from './components/ValuationSandbox';
import { ModelDeepDiveView } from './components/ModelDeepDiveView';
import { TrackAnalysisView } from './components/TrackAnalysisView';
import { RiskOpportunityView } from './components/RiskOpportunityView';
import { NegotiationStrategyView } from './components/NegotiationStrategyView';
import { ReportExportModal } from './components/ReportExportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [params, setParams] = useState(INITIAL_SANDBOX_PARAMS);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const valuationData = useMemo(() => {
    return calculateValuationResults(params);
  }, [params]);

  const handleResetParams = () => {
    setParams(INITIAL_SANDBOX_PARAMS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white">
      {/* Top Bar adheres to 3-zone contract */}
      <TopBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        onResetParams={handleResetParams}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {activeTab === 'summary' && (
          <ExecutiveSummaryView
            params={params}
            methodologies={valuationData.methodologies}
            fairRange={valuationData.fairValuationRange}
            onNavigateToSandbox={() => setActiveTab('sandbox')}
            onNavigateToTracks={() => setActiveTab('tracks')}
          />
        )}

        {activeTab === 'sandbox' && (
          <ValuationSandbox
            params={params}
            setParams={setParams}
            sotpItems={valuationData.sotpItems}
            fairRange={valuationData.fairValuationRange}
            onReset={handleResetParams}
          />
        )}

        {activeTab === 'models' && (
          <ModelDeepDiveView
            params={params}
            methodologies={valuationData.methodologies}
          />
        )}

        {activeTab === 'tracks' && <TrackAnalysisView />}

        {activeTab === 'swot' && <RiskOpportunityView />}

        {activeTab === 'strategy' && (
          <NegotiationStrategyView
            params={params}
            fairRange={valuationData.fairValuationRange}
          />
        )}
      </main>

      {/* Printable/Exportable Investment Memorandum Modal */}
      <ReportExportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        params={params}
        methodologies={valuationData.methodologies}
        fairRange={valuationData.fairValuationRange}
      />

      {/* Clean, disciplined Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span>上海宏思达信息技术有限公司 (eMVP-Lab)</span>
            <span>·</span>
            <a href="http://www.kxschool.com" target="_blank" rel="noreferrer" className="hover:text-slate-800 underline">www.kxschool.com</a>
            <span>·</span>
            <a href="https://www.weibo.com/u/1421107701" target="_blank" rel="noreferrer" className="text-rose-600 hover:text-rose-800 font-medium">新浪微博</a>
            <span>·</span>
            <a href="https://x.com/kxSchoolCN" target="_blank" rel="noreferrer" className="text-slate-800 hover:text-black font-medium">X / Twitter (@kxSchoolCN)</a>
          </div>
          <div>
            基于公司融资商业计划书与行业公开对标数据 · 估值模型仅供投资决策与商务谈判参考
          </div>
        </div>
      </footer>
    </div>
  );
}
