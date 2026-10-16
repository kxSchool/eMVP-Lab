import React from 'react';
import { ValuationSandboxParams, ValuationMethodologyResult } from '../data/valuation';
import { ArrowUpRight, ShieldCheck, TrendingUp, AlertTriangle, Cpu, Layers } from 'lucide-react';

interface ExecutiveSummaryViewProps {
  params: ValuationSandboxParams;
  methodologies: ValuationMethodologyResult[];
  fairRange: {
    conservativeWan: number;
    benchmarkWan: number;
    optimisticWan: number;
    impliedPostMoneyWan: number;
    impliedPreMoneyWan: number;
    targetExitMoicRange: string;
    targetExitIrrRange: string;
  };
  onNavigateToSandbox: () => void;
  onNavigateToTracks: () => void;
}

export const ExecutiveSummaryView: React.FC<ExecutiveSummaryViewProps> = ({
  params,
  methodologies,
  fairRange,
  onNavigateToSandbox,
  onNavigateToTracks
}) => {
  return (
    <div className="space-y-8">
      {/* Top Banner / Hero Metric */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-700/50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-medium tracking-wide">
              <span>上海宏思达信息技术有限公司 (eMVP-Lab)</span>
              <span>·</span>
              <span>kxschool.com</span>
              <span>·</span>
              <span>Pre-A 轮估值投资分析</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white text-balance">
              eMVP-Lab 项目综合估值评级与决策建议
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              基于4.02亿元历史托付投资折算、开源BodhiECP平台重置成本、前店后厂现金流自造血及SaaS/AI原生倍数进行综合穿透。
            </p>
          </div>

          {/* Core Valuation Callout */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 shrink-0 min-w-[280px]">
            <div className="text-xs text-indigo-200 font-medium mb-1">
              机构建议投前公允估值中枢
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">
              {(fairRange.benchmarkWan / 10000).toFixed(2)} 亿元
            </div>
            <div className="mt-2 text-xs text-slate-300 flex items-center justify-between border-t border-white/15 pt-2">
              <span>保守下限: {(fairRange.conservativeWan / 10000).toFixed(2)} 亿</span>
              <span>乐观弹性: {(fairRange.optimisticWan / 10000).toFixed(2)} 亿</span>
            </div>
          </div>
        </div>

        {/* 4 Core Quantitative Benchmarks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-700/70">
          <div>
            <div className="text-xs text-slate-400">历史项目累计托付投资</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-white mt-1 tabular-nums">
              4.02 亿元
            </div>
            <div className="text-xs text-slate-400 mt-0.5">5大垂直行业 / 运营超19年</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">融资诉求隐含投前估值</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-indigo-300 mt-1 tabular-nums">
              {(fairRange.impliedPreMoneyWan / 10000).toFixed(2)} 亿元
            </div>
            <div className="text-xs text-slate-400 mt-0.5">融 {params.fundraisingAskWan}万 / 稀释 {params.equityOfferedPct}%</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">前店12个月预期回款</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-emerald-400 mt-1 tabular-nums">
              {params.frontStoreCashflowWan} 万元
            </div>
            <div className="text-xs text-slate-400 mt-0.5">成熟赛道授权与联合投标</div>
          </div>
          <div>
            <div className="text-xs text-slate-400">投资人24M预期回报 (MOIC)</div>
            <div className="text-lg sm:text-xl font-bold font-mono text-amber-300 mt-1 tabular-nums">
              {fairRange.targetExitMoicRange}
            </div>
            <div className="text-xs text-slate-400 mt-0.5">年化 IRR {fairRange.targetExitIrrRange}</div>
          </div>
        </div>
      </div>

      {/* Valuation Band Comparison Chart */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">四大估值模型投前区间横向比对 (Pre-Money)</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              对比历史资产法、分部估值(SOTP)、市场倍数法与BP融资诉求隐含定价
            </p>
          </div>
          <button
            onClick={onNavigateToSandbox}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
          >
            <span>调节沙盘关键参数</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-6 space-y-5">
          {methodologies.map((m) => {
            // max reference value for horizontal bar scaling: 35000 (3.5亿)
            const maxScale = 35000;
            const leftPct = Math.min(100, Math.max(0, (m.preMoneyMinWan / maxScale) * 100));
            const widthPct = Math.min(100 - leftPct, Math.max(4, ((m.preMoneyMaxWan - m.preMoneyMinWan) / maxScale) * 100));
            const basePct = Math.min(98, Math.max(2, (m.preMoneyBaseWan / maxScale) * 100));

            return (
              <div key={m.code} className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-between text-xs">
                  <div className="font-semibold text-slate-800 flex items-center gap-2">
                    <span>{m.name}</span>
                    <span className="text-slate-400 font-normal">·</span>
                    <span className="text-slate-500 font-mono">{m.primaryMetric}</span>
                  </div>
                  <div className="font-mono text-slate-700 tabular-nums">
                    区间: {(m.preMoneyMinWan / 10000).toFixed(2)}亿 ~ {(m.preMoneyMaxWan / 10000).toFixed(2)}亿
                    <span className="font-semibold text-indigo-700 ml-2">
                      基准: {(m.preMoneyBaseWan / 10000).toFixed(2)} 亿元
                    </span>
                  </div>
                </div>

                {/* Progress Band */}
                <div className="h-6 bg-slate-100 rounded-md relative overflow-hidden flex items-center">
                  {/* Min to Max Range Band */}
                  <div
                    className="absolute h-4 rounded bg-indigo-100 border border-indigo-200"
                    style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
                  />
                  {/* Center Base Point Marker */}
                  <div
                    className="absolute h-5 w-1.5 bg-indigo-700 rounded-sm shadow-xs -ml-0.5 z-10"
                    style={{ left: `${basePct}%` }}
                    title={`基准中值: ${(m.preMoneyBaseWan / 10000).toFixed(2)} 亿元`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-indigo-100 border border-indigo-200 inline-block" />
              <span>测算估值区间 (Min - Max)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-3 bg-indigo-700 rounded-sm inline-block" />
              <span>基准公允中值 (Base)</span>
            </span>
          </div>
          <div>坐标轴上限标尺: 3.5 亿元人民币</div>
        </div>
      </div>

      {/* Official Media & Community Channels Section */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>官方主阵地与宣传传播矩阵 (Marketing & Community Reach)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              以国内新浪微博为SMB业务主阵地，以海外X (Twitter)为开源与技术叙事窗口，双轮驱动压降客户获取成本 (CAC)
            </p>
          </div>
          <div className="text-xs font-mono text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-100 self-start sm:self-auto">
            全域自媒体公域漏斗
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Weibo Card */}
          <a
            href="https://www.weibo.com/u/1421107701"
            target="_blank"
            rel="noreferrer"
            className="group p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
                  <span className="text-xs font-bold text-slate-900">国内主阵地 · 新浪微博</span>
                </div>
                <span className="text-[11px] text-indigo-600 group-hover:underline flex items-center gap-0.5">
                  <span>访问微博</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="text-xs font-mono text-slate-700">
                https://www.weibo.com/u/1421107701
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>宣传定位：</strong>面向中国5500万中小微企业主、企服SaaS从业者及产业园区合作方，高频发布企业数字化经营思维、从卖货出发的系统重构案例与BodhiECP开源平台动态。
              </p>
            </div>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/60 mt-2">
              <strong>估值加乘：</strong>构建高粘性本土企业家受众池，绕开昂贵搜索引擎竞价，显著缩短商机转化周期。
            </div>
          </a>

          {/* Twitter / X Card */}
          <a
            href="https://x.com/kxSchoolCN"
            target="_blank"
            rel="noreferrer"
            className="group p-4 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900 inline-block" />
                  <span className="text-xs font-bold text-slate-900">海外主阵地 · X (Twitter)</span>
                </div>
                <span className="text-[11px] text-indigo-600 group-hover:underline flex items-center gap-0.5">
                  <span>访问 @kxSchoolCN</span>
                  <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
              <div className="text-xs font-mono text-slate-700">
                https://x.com/kxSchoolCN (@kxSchoolCN)
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                <strong>宣传定位：</strong>面向全球开源软件社区、跨国AI/Agent研究者、海外华人创投资本及Odoo生态开发者，输出“中国大电商环境培育的开源企业系统”技术哲学与代码进展。
              </p>
            </div>
            <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-200/60 mt-2">
              <strong>估值加乘：</strong>提升国际开源影响力，对标Odoo全球70亿欧元叙事空间，为美元基金与跨国战略并购铺路。
            </div>
          </a>
        </div>
      </div>

      {/* 4 Core Strategic Pillar Analyses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pillar 1: Asset Floor */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3>1. 安全底线支撑：沉淀资产重置成本确立估值下限</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            公司核心资产并非单纯PPT创意，而是由房地产、MRO集采、文娱等传统集团在过去十余年托付累计<strong>4.02亿元</strong>真金白银投资并运营超过19年的实战平台（如3亿投资的演剧院购票、6000万投资的在线心理诊所等）。
          </p>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-1 border border-slate-100">
            <div className="flex justify-between">
              <span>历史4.02亿资产认可度 (按{params.historicalAssetDiscountPct}%):</span>
              <span className="font-mono font-semibold">约 {((40200 * params.historicalAssetDiscountPct) / 100).toFixed(0)} 万元</span>
            </div>
            <div className="flex justify-between">
              <span>开源BodhiECP基座重置成本估值:</span>
              <span className="font-mono font-semibold">{params.bodhiPlatformAssetWan} 万元</span>
            </div>
            <div className="flex justify-between text-emerald-700 font-medium pt-1 border-t border-slate-200">
              <span>防守型安全垫估值下限:</span>
              <span className="font-mono font-bold">约 {(fairRange.conservativeWan / 10000).toFixed(2)} 亿元</span>
            </div>
          </div>
        </div>

        {/* Pillar 2: Front Store Cashflow */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <h3>2. 自造血与抗周期：前店后厂对冲二轮融资断粮风险</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            与传统烧钱型纯SaaS不同，eMVP-Lab具备<strong>前店销售五大赛道成熟系统</strong>的造血能力。针对文体局、产业园、城投等政企客户，通过项目授权（50~100万/套）或联合投标，首年可回款150~500万元，直接覆盖后厂约600万研发支出的大半。
          </p>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-1 border border-slate-100">
            <div className="flex justify-between">
              <span>前店预期12个月签约项目:</span>
              <span className="font-mono font-semibold">3 ~ 5 个政企标杆项目</span>
            </div>
            <div className="flex justify-between">
              <span>后厂v1.0一体化研发年成本:</span>
              <span className="font-mono font-semibold">约 600 万元</span>
            </div>
            <div className="flex justify-between text-indigo-700 font-medium pt-1 border-t border-slate-200">
              <span>经营现金流断粮风险:</span>
              <span className="font-semibold">低 (前店回款对冲率 30%~80%)</span>
            </div>
          </div>
        </div>

        {/* Pillar 3: Product Differentiation */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3>3. 差异化护城河：不做Odoo，切入中国SMB卖货第一痛点</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            欧美软件Odoo（估值70亿欧）从“管货/进销存”切入，而中国5500万中小微企业第一痛点是<strong>“建品牌网站卖货”</strong>。eMVP-Lab以免费开源财务为流量入口，以电商门户+进销存私有化订阅变现，避开用友金蝶正面竞争。
          </p>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-1 border border-slate-100">
            <div className="flex justify-between">
              <span>获客入口策略:</span>
              <span className="font-semibold text-slate-800">免费开源财务软件 (打破金蝶用友封锁)</span>
            </div>
            <div className="flex justify-between">
              <span>核心收费引擎:</span>
              <span className="font-semibold text-slate-800">私有化部署电商+进销存 (高客单订阅)</span>
            </div>
            <div className="flex justify-between text-blue-700 font-medium pt-1 border-t border-slate-200">
              <span>首期高客单SMB目标:</span>
              <span className="font-mono font-bold">30 家 (年均15万元, ARR 450万)</span>
            </div>
          </div>
        </div>

        {/* Pillar 4: AI & FDE Moat */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
          <div className="flex items-center gap-2 text-slate-900 font-bold">
            <Cpu className="w-5 h-5 text-purple-600" />
            <h3>4. AI全能顾问 + 独立AI审计层 + FDE服务架构</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            摒弃“聊天机器人写不可用代码”的伪AI模式，由<strong>FDE现场工程师</strong>运用AI重写Skill，深入企业定制软件矩阵；同时设立与经营大脑物理隔离的<strong>独立AI审计层</strong>，防范AI幻觉与合规风险，赋予极高AI Native溢价乘数。
          </p>
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-700 space-y-1 border border-slate-100">
            <div className="flex justify-between">
              <span>交付架构:</span>
              <span className="font-semibold text-slate-800">FDE深度驻场 + AI重写Skill (非一次性买断)</span>
            </div>
            <div className="flex justify-between">
              <span>风控护城河:</span>
              <span className="font-semibold text-slate-800">独立AI审计层 (财税/合规可追溯可导出)</span>
            </div>
            <div className="flex justify-between text-purple-700 font-medium pt-1 border-t border-slate-200">
              <span>LTV与毛利模型:</span>
              <span className="font-semibold">模块增购扩展 + 70%以上毛利率</span>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Investment Warning & Due Diligence Requirements */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-amber-900">
              投资尽职调查关键红线与折价考量 (Due Diligence Caveats)
            </h4>
            <div className="text-xs sm:text-sm text-amber-800 space-y-1.5 leading-relaxed">
              <p>
                <strong>1. 知识产权 (IP) 割接审核：</strong> 计划书第2.4节坦承五大项目系委托开发，源码著作权依合同约定。投资协议必须设立“历史赛道源码确权及独占/免责商业化授权割接”先决条件，避免潜在法律纠纷。
              </p>
              <p>
                <strong>2. 技术底座现代度重构：</strong> BodhiECP平台基于PHP CodeIgniter架构（2015年编写），需重点考核技术团队在后厂研发中向云原生API与现代Python/Node AI服务化重构的研发效率与重构预算。
              </p>
              <p>
                <strong>3. 估值谈判中枢落地建议：</strong> 创始人BP诉求融资1,000万~3,000万出让10%~15%（隐含投前0.57亿~2.7亿元）。建议机构以<strong>投前 7,500万 ~ 1.05亿元</strong>为谈判中枢，采用<strong>里程碑分批交割 (Tranches)</strong>，首期注资1,000万，待前店回款与一体化v1.0上线后再解锁后续份额。
              </p>
            </div>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onNavigateToTracks}
                className="text-xs font-semibold text-amber-900 hover:text-amber-950 underline underline-offset-2 cursor-pointer"
              >
                查看五大赛道4.02亿资产详细清单 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
