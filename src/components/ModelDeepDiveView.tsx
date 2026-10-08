import React, { useState } from 'react';
import { ValuationSandboxParams, ValuationMethodologyResult } from '../types/valuation';
import { BENCHMARK_VALUATION_MULTIPLES } from '../data/projectData';
import { Layers, Database, Calculator, Compass, CheckCircle2 } from 'lucide-react';

interface ModelDeepDiveViewProps {
  params: ValuationSandboxParams;
  methodologies: ValuationMethodologyResult[];
}

export const ModelDeepDiveView: React.FC<ModelDeepDiveViewProps> = ({
  params,
  methodologies
}) => {
  const [selectedModel, setSelectedModel] = useState<'ASSET' | 'SOTP' | 'MULTIPLES' | 'VC_IMPLIED'>('ASSET');

  const modelMap = {
    ASSET: methodologies.find((m) => m.code === 'ASSET')!,
    SOTP: methodologies.find((m) => m.code === 'SOTP')!,
    MULTIPLES: methodologies.find((m) => m.code === 'MULTIPLES')!,
    VC_IMPLIED: methodologies.find((m) => m.code === 'VC_IMPLIED')!
  };

  const activeModel = modelMap[selectedModel];

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">四大专业估值模型深度拆解与对标</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          穿透历史资产重置成本、分部估值(SOTP)、国际可比公司乘数及VC回报反推法
        </p>
      </div>

      {/* Model Selection Tabs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { id: 'ASSET', label: '1. 资产与重置成本法', icon: Database, desc: '防守安全垫与研发工时折算' },
          { id: 'SOTP', label: '2. 分部估值法 (SOTP)', icon: Layers, desc: '前店+基座+SaaS期权独立拆解' },
          { id: 'MULTIPLES', label: '3. 市场可比倍数法', icon: Calculator, desc: '对标Odoo/SaaS/AI原生并购' },
          { id: 'VC_IMPLIED', label: '4. 融资诉求隐含法', icon: Compass, desc: '融资额与稀释倒推定价与IRR' }
        ].map((tab) => {
          const Icon = tab.icon;
          const isSelected = selectedModel === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedModel(tab.id as any)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span className="text-xs sm:text-sm font-bold">{tab.label}</span>
              </div>
              <p className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                {tab.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Model Detail Panel */}
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        {/* Top Header of Active Model */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="text-xs text-indigo-600 font-semibold tracking-wide">
              {activeModel.primaryMetric}
            </div>
            <h3 className="text-xl font-bold text-slate-900 mt-0.5">{activeModel.name}</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">{activeModel.applicability}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shrink-0 text-right">
            <div className="text-xs text-slate-500">该模型测算投前估值区间</div>
            <div className="text-2xl font-extrabold font-mono text-indigo-700 mt-0.5 tabular-nums">
              {(activeModel.preMoneyBaseWan / 10000).toFixed(2)} 亿元
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">
              [{(activeModel.preMoneyMinWan / 10000).toFixed(2)} 亿 ~ {(activeModel.preMoneyMaxWan / 10000).toFixed(2)} 亿]
            </div>
          </div>
        </div>

        {/* Content Specific to Model */}
        {selectedModel === 'ASSET' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">测算逻辑与公式</h4>
                <div className="bg-slate-50 p-4 rounded-lg font-mono text-xs text-slate-800 space-y-2 border border-slate-200">
                  <div className="text-slate-500">// 估值计算公式</div>
                  <div>投前估值 = 承认历史资产净值 + BodhiECP基座重置成本</div>
                  <div className="pt-2 text-indigo-700">
                    承认历史资产 = 40,200万 × {params.historicalAssetDiscountPct}% × (1 - {params.ipRiskDiscountPct}%) = {((40200 * (params.historicalAssetDiscountPct / 100) * (1 - params.ipRiskDiscountPct / 100))).toFixed(0)} 万元
                  </div>
                  <div className="text-indigo-700">
                    开源基座重置 = {params.bodhiPlatformAssetWan} 万元 (约15人年Senior架构研发工时)
                  </div>
                  <div className="pt-2 border-t border-slate-200 font-bold text-slate-900">
                    合计基准估值 = {(activeModel.preMoneyBaseWan / 10000).toFixed(2)} 亿元
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">核心假设与投资人评估</h4>
                <ul className="text-xs sm:text-sm text-slate-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>历史沉淀验证非虚：</strong>五大平台累计投入4.02亿元，虽因行业周期终止，但底层架构代码、工业品库、剧院高并发锁座、医疗日历等核心资产具备重置保护性。</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>知识产权安全折价已扣除：</strong>模型审慎扣除{params.ipRiskDiscountPct}%未决IP准备金，确保即便存在部分委托协议争议，企业核心资产底线依然稳固。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {selectedModel === 'SOTP' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">分部估值各板块权重与商业逻辑</h4>
              <p className="text-xs text-slate-600">
                eMVP-Lab兼具“开源基础设施”、“五大赛道前店资产包”、“SMB一体化SaaS新业务”与“FDE服务”，单一估值法极易失真。SOTP分部估值能精准穿透各板块现值：
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">1. 开源底座与API</div>
                  <div className="text-lg font-bold font-mono text-indigo-700 mt-1">
                    {(params.bodhiPlatformAssetWan * 1.1).toFixed(0)} 万元
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">BodhiECP中台、CRM、商城、移动端四位一体</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">2. 五大赛道前店资产</div>
                  <div className="text-lg font-bold font-mono text-indigo-700 mt-1">
                    {(40200 * (params.historicalAssetDiscountPct / 100) * (1 - params.ipRiskDiscountPct / 100) * 0.85).toFixed(0)} 万元
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">五大垂直行业成熟系统转让与联合投标现金流现值</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">3. SMB一体化SaaS期权</div>
                  <div className="text-lg font-bold font-mono text-indigo-700 mt-1">
                    {(params.arrTargetYear1Wan * (params.arrMultiple * 0.75)).toFixed(0)} 万元
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">中国5500万中小企业电商卖货+免费财务流量变现期权</div>
                </div>
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-xs text-slate-500 font-semibold">4. AI Skill与审计层</div>
                  <div className="text-lg font-bold font-mono text-indigo-700 mt-1">
                    1200 万元
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">FDE专属AI重写工具链与独立AI防幻觉审计层专有技术</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedModel === 'MULTIPLES' && (
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900">市场倍数基准与全球标的对比 (Benchmark Universe)</h4>
              <p className="text-xs text-slate-600">
                当前企业处于Pre-ARR迈向ARR 500万的关键拐点，结合海外与国内企服软件估值乘数测算：
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse border border-slate-200">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700">
                      <th className="p-2.5 font-semibold">标的 / 细分行业</th>
                      <th className="p-2.5 font-semibold">资本市场</th>
                      <th className="p-2.5 font-semibold">营收规模</th>
                      <th className="p-2.5 font-semibold">企业估值 / 市值</th>
                      <th className="p-2.5 font-semibold">估值乘数</th>
                      <th className="p-2.5 font-semibold">对eMVP-Lab的对标启示</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {BENCHMARK_VALUATION_MULTIPLES.map((b, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold text-slate-900">{b.name}</td>
                        <td className="p-2.5 text-slate-600">{b.market}</td>
                        <td className="p-2.5 font-mono text-slate-700">{b.revenueARR}</td>
                        <td className="p-2.5 font-mono text-slate-700">{b.valuation}</td>
                        <td className="p-2.5 font-mono font-bold text-indigo-700">{b.multiple}</td>
                        <td className="p-2.5 text-slate-600 leading-tight">{b.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {selectedModel === 'VC_IMPLIED' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">融资诉求与股权稀释结构</h4>
                <div className="bg-slate-50 p-4 rounded-lg text-xs space-y-2.5 border border-slate-200">
                  <div className="flex justify-between">
                    <span className="text-slate-600">BP拟融资金额:</span>
                    <span className="font-mono font-bold text-slate-900">{params.fundraisingAskWan} 万元 (1000万~3000万区间)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">拟出让股权比例:</span>
                    <span className="font-mono font-bold text-slate-900">{params.equityOfferedPct}% (10%~15%区间)</span>
                  </div>
                  <div className="flex justify-between text-indigo-700 font-semibold border-t border-slate-200 pt-2">
                    <span>隐含投后估值 (Post-Money):</span>
                    <span className="font-mono">{(activeModel.postMoneyBaseWan / 10000).toFixed(2)} 亿元</span>
                  </div>
                  <div className="flex justify-between text-indigo-700 font-semibold">
                    <span>隐含投前估值 (Pre-Money):</span>
                    <span className="font-mono">{(activeModel.preMoneyBaseWan / 10000).toFixed(2)} 亿元</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-900">投资人退出回报与资本约束</h4>
                <div className="bg-slate-50 p-4 rounded-lg text-xs space-y-2.5 border border-slate-200">
                  <p className="text-slate-600 leading-relaxed">
                    若投资机构在当前<strong>投前 {(activeModel.preMoneyBaseWan / 10000).toFixed(2)} 亿元</strong>进入：
                  </p>
                  <div className="flex justify-between">
                    <span className="text-slate-600">18个月A轮估值目标 (2.5亿):</span>
                    <span className="font-mono font-bold text-emerald-700">约 2.3x 回报 (IRR ~52%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">24个月战略并购目标 (4.0亿):</span>
                    <span className="font-mono font-bold text-emerald-700">约 3.6x 回报 (IRR ~90%)</span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 text-slate-500 text-[11px]">
                    * 估值评级：该融资诉求隐含估值处于行业基准中等偏上，对创始团队在12个月内完成前店回款与ARR 500万有极高执行要求。
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
