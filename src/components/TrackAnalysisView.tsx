import React, { useState } from 'react';
import { HISTORICAL_TRACKS } from '../data/projectData';
import { ExternalLink, Building, ShoppingBag, Rocket, Film, HeartHandshake, Box, AlertCircle, CheckCircle2 } from 'lucide-react';

export const TrackAnalysisView: React.FC = () => {
  const [selectedTrackId, setSelectedTrackId] = useState<string>('all');

  const filteredTracks = selectedTrackId === 'all'
    ? HISTORICAL_TRACKS
    : HISTORICAL_TRACKS.filter((t) => t.id === selectedTrackId);

  const getTrackIcon = (id: string) => {
    switch (id) {
      case 'wyg': return Building;
      case 'wcpl': return ShoppingBag;
      case 'wryb': return Rocket;
      case 'wpm': return Film;
      case 'wxr': return HeartHandshake;
      default: return Box;
    }
  };

  const totalInvestmentWan = HISTORICAL_TRACKS.reduce((sum, t) => sum + t.investmentAmountWan, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            五大已验证历史赛道与4.02亿元托付资产穿透
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            累计运营超19年，涵盖地产、工业品MRO、创孵、文娱票务及医疗大健康实战系统
          </p>
        </div>
        <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 shrink-0">
          <div className="text-[11px] text-slate-500">已验证项目托付资金总盘</div>
          <div className="text-xl font-bold font-mono text-slate-900 tabular-nums">
            {(totalInvestmentWan / 10000).toFixed(2)} 亿元
          </div>
        </div>
      </div>

      {/* Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg max-w-full overflow-x-auto">
        <button
          onClick={() => setSelectedTrackId('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedTrackId === 'all'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          全部六大资产 ({HISTORICAL_TRACKS.length})
        </button>
        {HISTORICAL_TRACKS.map((t) => (
          <button
            key={t.id}
            onClick={() => setSelectedTrackId(t.id)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
              selectedTrackId === t.id
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {t.name.split('及')[0].split('-')[0].slice(0, 8)}
          </button>
        ))}
      </div>

      {/* Tracks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTracks.map((track) => {
          const Icon = getTrackIcon(track.id);
          const isHighIpRisk = track.ipRiskFactor === 'high';
          const isMediumIpRisk = track.ipRiskFactor === 'medium';

          return (
            <div
              key={track.id}
              className="bg-white rounded-xl border border-slate-200 p-5 space-y-4 hover:border-slate-300 transition-shadow shadow-xs flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header with Icon and Title */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {track.name}
                      </h3>
                      {track.domainUrl.includes('.') && (
                        <a
                          href={`http://${track.domainUrl}`}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-indigo-600 hover:underline flex items-center gap-0.5 mt-0.5"
                        >
                          <span>{track.domainUrl}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Investment & Operation Metrics */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">投资方出资</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {track.investmentAmountWan >= 10000
                        ? `${(track.investmentAmountWan / 10000).toFixed(1)} 亿元`
                        : `${track.investmentAmountWan} 万元`}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">真实运营周期</span>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      {track.operationalYears} 年
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 leading-relaxed">
                  {track.description}
                </p>

                {/* Core Capabilities */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-700 block">核心业务能力与技术资产:</span>
                  <div className="space-y-1">
                    {track.coreCapabilities.map((cap, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom: Monetization & IP Audit */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-700">
                  <span className="text-[11px] text-slate-500">前店单项目授权估值:</span>
                  <span className="font-mono font-bold text-emerald-600 tabular-nums">
                    {track.monetizationEstimateWan.min} ~ {track.monetizationEstimateWan.max} 万元
                  </span>
                </div>

                <div className="flex items-start gap-1.5 text-[11px] p-2 rounded bg-slate-50 border border-slate-100">
                  <AlertCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                    isHighIpRisk ? 'text-rose-500' : isMediumIpRisk ? 'text-amber-500' : 'text-emerald-500'
                  }`} />
                  <span className="text-slate-600 leading-tight">
                    {track.ipAuditNotes}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Synthesis Section: Why 4.02 Billion is a Strategic Weapon for SMB Platform */}
      <div className="bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-4">
        <h3 className="text-base font-bold text-white">
          深度剖析：这4.02亿元历史投入如何支撑eMVP-Lab的中小企业平台？
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
          <div>
            <h4 className="font-semibold text-indigo-300 mb-1">1. 业务逻辑与数据模型沉淀</h4>
            <p>
              大企业出巨资定制的系统，踩过了行业所有的极端场景（如票务的高并发锁座防超卖、MRO工业品的十万级复杂SKU与多级阶梯报价、工程租赁的动态计费）。这些复杂的单据、审批与结算模型被完整抽离，沉淀入BodhiECP的开源底座中。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300 mb-1">2. 前店现金流的真实弹药库</h4>
            <p>
              五大系统不是废纸，而是可以直接白标OEM、项目授权转让给政商软件公司（如城投、文体局、产业园、教育系统）。前店12个月销售3-5个项目即可回款150-500万元，极大地增强了自我造血能力。
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-indigo-300 mb-1">3. 绝非普通AI套壳团队</h4>
            <p>
              市面大量AI创业团队仅懂调用LLM API，根本不懂企业真正的财务借贷对账、进销存出入库锁库与复杂组织权限。eMVP-Lab团队经历过几千万乃至数亿元企业真实资金的洗礼，AI落地具备坚如磐石的工业级底盘。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
