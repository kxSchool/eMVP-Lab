import React from 'react';
import { ValuationSandboxParams, SOTPBreakdownItem } from '../data/valuation';
import { Sliders, RotateCcw } from 'lucide-react';

interface ValuationSandboxProps {
  params: ValuationSandboxParams;
  setParams: React.Dispatch<React.SetStateAction<ValuationSandboxParams>>;
  sotpItems: SOTPBreakdownItem[];
  fairRange: {
    conservativeWan: number;
    benchmarkWan: number;
    optimisticWan: number;
    impliedPostMoneyWan: number;
    impliedPreMoneyWan: number;
    targetExitMoicRange: string;
    targetExitIrrRange: string;
  };
  onReset: () => void;
}

export const ValuationSandbox: React.FC<ValuationSandboxProps> = ({
  params,
  setParams,
  sotpItems,
  fairRange,
  onReset
}) => {
  const handleChange = (key: keyof ValuationSandboxParams, val: number) => {
    setParams((prev) => ({ ...prev, [key]: val }));
  };

  // Sensitivity Analysis Grid Data
  const askSteps = [1000, 1500, 2000, 2500, 3000];
  const equitySteps = [10, 12.5, 15, 18, 20];

  return (
    <div className="space-y-8">
      {/* Sandbox Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900">动态估值沙盘与参数灵敏度模拟</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            实时模拟调节融资额、股权出让、历史资产承认度、ARR乘数与IP风险因子，测算投前估值中枢
          </p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>恢复BP基准参数</span>
        </button>
      </div>

      {/* Grid: Left Controls (Sliders), Right Real-Time Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-xl border border-slate-200 shadow-xs">
          <h3 className="text-sm font-bold text-slate-900 flex items-center justify-between">
            <span>核心财务与商务假设控制台</span>
            <span className="text-xs font-normal text-slate-400">实时联动所有模型</span>
          </h3>

          <div className="space-y-5">
            {/* Slider 1: 融资金额 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">拟融资金额 (人民币)</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.fundraisingAskWan} 万元 ({(params.fundraisingAskWan / 100).toFixed(1)} 百万)
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="3000"
                step="100"
                value={params.fundraisingAskWan}
                onChange={(e) => handleChange('fundraisingAskWan', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>500万 (小额起步)</span>
                <span>1500万 (中额基准)</span>
                <span>3000万 (大额加速)</span>
              </div>
            </div>

            {/* Slider 2: 出让股权比例 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">出让股权比例</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.equityOfferedPct}%
                </span>
              </div>
              <input
                type="range"
                min="8"
                max="25"
                step="0.5"
                value={params.equityOfferedPct}
                onChange={(e) => handleChange('equityOfferedPct', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>8% (轻度稀释)</span>
                <span>12.5% (BP计划中值)</span>
                <span>25% (深度稀释)</span>
              </div>
            </div>

            {/* Slider 3: 历史4.02亿资产认可度 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">历史4.02亿托付投资折算承认度</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.historicalAssetDiscountPct}% (折合 {((40200 * params.historicalAssetDiscountPct) / 100).toFixed(0)}万)
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                step="1"
                value={params.historicalAssetDiscountPct}
                onChange={(e) => handleChange('historicalAssetDiscountPct', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>5% (严苛折价)</span>
                <span>15% (基准认可)</span>
                <span>30% (高额赋能)</span>
              </div>
            </div>

            {/* Slider 4: BodhiECP开源平台重置估值 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">BodhiECP 开源底座研发重置价值</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.bodhiPlatformAssetWan} 万元
                </span>
              </div>
              <input
                type="range"
                min="800"
                max="3000"
                step="100"
                value={params.bodhiPlatformAssetWan}
                onChange={(e) => handleChange('bodhiPlatformAssetWan', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>800万 (~8人年重写)</span>
                <span>1500万 (15人年 senior)</span>
                <span>3000万 (完整企业生态)</span>
              </div>
            </div>

            {/* Slider 5: 12个月ARR目标 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">12个月一体化系统 ARR 预期</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.arrTargetYear1Wan} 万元
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={params.arrTargetYear1Wan}
                onChange={(e) => handleChange('arrTargetYear1Wan', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>200万 (保守15家)</span>
                <span>500万 (BP规划目标)</span>
                <span>1000万 (超预期放量)</span>
              </div>
            </div>

            {/* Slider 6: ARR估值乘数 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">SaaS / AI-Native ARR 估值乘数</span>
                <span className="font-mono text-indigo-600 font-bold tabular-nums">
                  {params.arrMultiple}x
                </span>
              </div>
              <input
                type="range"
                min="6"
                max="25"
                step="1"
                value={params.arrMultiple}
                onChange={(e) => handleChange('arrMultiple', Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>6x (国内SaaS常规)</span>
                <span>12x (SaaS中位)</span>
                <span>21x (AI原生高增速)</span>
              </div>
            </div>

            {/* Slider 7: IP确权与重构风险扣减准备金 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-800">知识产权(IP)未决与重构风险准备扣减率</span>
                <span className="font-mono text-amber-600 font-bold tabular-nums">
                  {params.ipRiskDiscountPct}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="1"
                value={params.ipRiskDiscountPct}
                onChange={(e) => handleChange('ipRiskDiscountPct', Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>5% (合同全部割接)</span>
                <span>18% (基准审慎风险)</span>
                <span>35% (委托开发争议大)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-Time Valuation Output Column (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white p-6 rounded-xl space-y-5 shadow-lg border border-slate-800">
            <h3 className="text-xs font-semibold text-indigo-300 tracking-wider">
              沙盘当前测算即时结果
            </h3>

            {/* Implied Pre-money from Ask */}
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="text-xs text-slate-400">融资诉求隐含投前估值 (Pre-Money)</div>
              <div className="text-3xl font-extrabold font-mono text-white tabular-nums">
                {(fairRange.impliedPreMoneyWan / 10000).toFixed(2)} 亿元
              </div>
              <div className="text-xs text-slate-400">
                投后估值: {(fairRange.impliedPostMoneyWan / 10000).toFixed(2)} 亿元 · 每1%股权价值: {(fairRange.impliedPostMoneyWan / 100).toFixed(1)} 万元
              </div>
            </div>

            {/* Synthesized Fair Value Center */}
            <div className="space-y-1 border-b border-slate-800 pb-4">
              <div className="text-xs text-slate-400">多模型综合公允投前估值中枢</div>
              <div className="text-2xl font-bold font-mono text-indigo-300 tabular-nums">
                {(fairRange.benchmarkWan / 10000).toFixed(2)} 亿元
              </div>
              <div className="text-xs text-slate-400">
                公允区间: [{(fairRange.conservativeWan / 10000).toFixed(2)} 亿 ~ {(fairRange.optimisticWan / 10000).toFixed(2)} 亿]
              </div>
            </div>

            {/* Exit Multiples & IRR */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">24个月退出回报 (MOIC)</div>
                <div className="text-lg font-bold font-mono text-amber-300 mt-0.5 tabular-nums">
                  {fairRange.targetExitMoicRange}
                </div>
              </div>
              <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700/60">
                <div className="text-[11px] text-slate-400">年化复合收益 (IRR)</div>
                <div className="text-lg font-bold font-mono text-emerald-300 mt-0.5 tabular-nums">
                  {fairRange.targetExitIrrRange}
                </div>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-tight pt-1">
              * 回报假设：企业在24个月内达成A轮融资或企服巨头战略并购，退出估值达 2.5亿 ~ 4.0亿元。
            </div>
          </div>

          {/* SOTP Breakdown Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 tracking-wider">
              分部估值 (SOTP) 拆解构成
            </h4>
            <div className="space-y-2">
              {sotpItems.map((item, idx) => (
                <div key={idx} className="text-xs border-b border-slate-100 pb-2 last:border-0">
                  <div className="flex justify-between items-center font-medium">
                    <span className={item.valueWan < 0 ? 'text-amber-700' : 'text-slate-800'}>
                      {item.component}
                    </span>
                    <span className={`font-mono tabular-nums font-semibold ${item.valueWan < 0 ? 'text-amber-700' : 'text-indigo-600'}`}>
                      {item.valueWan > 0 ? `+${item.valueWan}` : item.valueWan} 万元
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{item.basis}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sensitivity Matrix Table */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900">
            融资额 vs 稀释比例 隐含投前估值矩阵 (Pre-Money Sensitivity Matrix)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            单胞数值单位：亿元人民币（绿色高亮区间代表与项目公允估值中枢 0.8亿~1.3亿元 最为契合的商务谈判甜蜜区）
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <th className="p-3 font-semibold">融资金额 \ 出让比例</th>
                {equitySteps.map((eq) => (
                  <th key={eq} className="p-3 font-semibold text-right font-mono">
                    {eq}% 股权
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {askSteps.map((ask) => (
                <tr key={ask} className="hover:bg-slate-50/80">
                  <td className="p-3 font-semibold text-slate-800 font-mono">
                    融 {ask} 万元
                  </td>
                  {equitySteps.map((eq) => {
                    const post = ask / (eq / 100);
                    const pre = post - ask;
                    const preYi = pre / 10000;
                    const isSweetSpot = preYi >= 0.75 && preYi <= 1.4;
                    const isCurrent = ask === params.fundraisingAskWan && eq === params.equityOfferedPct;

                    return (
                      <td
                        key={eq}
                        className={`p-3 text-right font-mono font-medium tabular-nums ${
                          isCurrent
                            ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-600'
                            : isSweetSpot
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : 'text-slate-700'
                        }`}
                      >
                        {preYi.toFixed(2)} 亿
                        {isCurrent && <span className="block text-[10px] text-indigo-100 font-sans">当前</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
