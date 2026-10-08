import React from 'react';
import { ValuationSandboxParams } from '../types/valuation';
import { Briefcase, UserCheck, Milestone, DollarSign, Target, CheckCircle2 } from 'lucide-react';

interface NegotiationStrategyViewProps {
  params: ValuationSandboxParams;
  fairRange: {
    conservativeWan: number;
    benchmarkWan: number;
    optimisticWan: number;
    impliedPostMoneyWan: number;
    impliedPreMoneyWan: number;
    targetExitMoicRange: string;
    targetExitIrrRange: string;
  };
}

export const NegotiationStrategyView: React.FC<NegotiationStrategyViewProps> = ({
  params,
  fairRange
}) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">投融资商务博弈与分层落地策略</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          为投资机构设计结构化风控与里程碑机制，为创始人提供估值护城河答辩与分层融资方案
        </p>
      </div>

      {/* Two Column Strategy: Left for Investors, Right for Founders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Investor Playbook */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">投资机构决策指引 (Investor Playbook)</h3>
              <p className="text-xs text-slate-500">如何定价、设计条款与锁定安全边际</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-600" />
                <span>1. 建议谈判估值锚点：投前 7,500万 ~ 1.05亿元</span>
              </h4>
              <p className="text-xs text-slate-600 pl-6">
                BP提出的3000万大额方案若出让10%（隐含投前2.7亿）对Pre-ARR项目偏高；而小额方案500万~1500万出让12%~15%（隐含投前7,000万~1.1亿元）属于公允区间。
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <Milestone className="w-4 h-4 text-indigo-600" />
                <span>2. 强烈建议采用“三阶段里程碑分期交割 (Tranches)”</span>
              </h4>
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs space-y-2 pl-4">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-700 shrink-0">第一期 (40%):</span>
                  <span>投资意向确立，历史五大赛道委托开发合同IP确权法律意见书出具并完成无纠纷签署。</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-700 shrink-0">第二期 (35%):</span>
                  <span>前店实现首批150万元以上项目授权/联合投标回款，BodhiECP开源平台与免费财务原型交付。</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-indigo-700 shrink-0">第三期 (25%):</span>
                  <span>企业一体化v1.0签约3~5家年费15万高客单标杆客户，ARR达到年化200万以上跑道。</span>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-indigo-600" />
                <span>3. 核心交割先决条件 (CPs)</span>
              </h4>
              <ul className="text-xs text-slate-600 space-y-1 pl-6 list-disc">
                <li>创始人全职签署5年竞业禁止与全套知识产权归属协议。</li>
                <li>前店与后厂财务独立核算，确保研发专项资金专款专用。</li>
                <li>获得至少1个董事会席位或一票否决权（重大资产处置与次轮融资）。</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Founder Playbook */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
            <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">创始人融资防御指引 (Founder Playbook)</h3>
              <p className="text-xs text-slate-500">如何撑住1亿+估值叙事与选择融资节奏</p>
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>1. 回应投资人“没有规模化ARR”的答辩杀手锏</span>
              </h4>
              <p className="text-xs text-slate-600 pl-6">
                <strong>“我们不是从零写代码的PPT项目，我们是把过去大客户4.02亿砸出来的成熟代码和业务规则，降维赋能给5500万中小企业。”</strong> 前店自造血能力保证公司不依赖融资也能活，融资额决定的是速度而不是生死。
              </p>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>2. 分层融资弹性策略 (让资方做选择题，不做判断题)</span>
              </h4>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-800">小额方案</div>
                  <div className="font-mono text-indigo-600 font-bold mt-0.5">500~800万</div>
                  <div className="text-[10px] text-slate-400 mt-1">核心模块启动，前店回款补足</div>
                </div>
                <div className="p-2.5 bg-indigo-50/60 rounded-lg border border-indigo-200">
                  <div className="font-bold text-indigo-900">中额基准</div>
                  <div className="font-mono text-indigo-700 font-bold mt-0.5">1000~1500万</div>
                  <div className="text-[10px] text-indigo-600 mt-1">全模块平稳推进，12M做500万ARR</div>
                </div>
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                  <div className="font-bold text-slate-800">大额方案</div>
                  <div className="font-mono text-indigo-600 font-bold mt-0.5">2000~3000万</div>
                  <div className="text-[10px] text-slate-400 mt-1">极速占领市场，拉高竞争门槛</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>3. 提前清除DD地雷</span>
              </h4>
              <p className="text-xs text-slate-600 pl-6">
                在机构进场尽职调查前，请专业律所出具原5家委托方合同梳理备忘录，明确二次开发衍生版本归属上海宏思达，彻底消除资方对IP权属的最大疑虑。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Target Buyer & Acquisition Exit Matrix */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900">
          退出路径与战略买家画像分析 (Strategic M&A & Exit Horizons)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">买家类型 A：传统企服巨头 (用友/金蝶/微盟)</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>诉求动机：</strong> 传统巨头自身无法免费开源革自己的命。通过并购eMVP-Lab，可将其作为独立第二曲线，迅速切入5500万低客单与中端SMB卖货市场。
            </p>
            <div className="text-xs font-mono font-semibold text-indigo-700 pt-1 border-t border-slate-200">
              预计并购对价：1.5亿 ~ 3.5亿元
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">买家类型 B：通用大模型与AI独角兽</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>诉求动机：</strong> 模型厂商急需真实的ToB业务垂直场景落地（AI Agent）。eMVP-Lab沉淀的行业Know-how和真实单据规则库是极度稀缺的垂直落脚点。
            </p>
            <div className="text-xs font-mono font-semibold text-indigo-700 pt-1 border-t border-slate-200">
              预计并购对价：2.0亿 ~ 4.0亿元 (股权互换或现金)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="text-xs font-bold text-slate-800 block">买家类型 C：政商型大型软件分包商</span>
            <p className="text-xs text-slate-600 leading-relaxed">
              <strong>诉求动机：</strong> 拥有地方城投、园区、政府资源，但自身研发交付成本极高。直接收购或分拆采购eMVP-Lab成熟系统包，快速完成项目交付。
            </p>
            <div className="text-xs font-mono font-semibold text-indigo-700 pt-1 border-t border-slate-200">
              分拆出售/授权：8000万 ~ 1.2亿元
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
