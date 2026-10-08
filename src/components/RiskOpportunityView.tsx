import React from 'react';
import { ShieldCheck, AlertTriangle, Sparkles, AlertOctagon, CheckCircle2, TrendingUp } from 'lucide-react';

export const RiskOpportunityView: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900">估值溢价驱动因子与核心折价风险 (SWOT & Risk Audit)</h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          全方位平衡评估推动估值上行的核心竞争护城河与压制估值的法律及技术折价要素
        </p>
      </div>

      {/* Grid: 2 Columns (Premiums vs Risks) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Valuation Premiums / Moats */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-indigo-900 font-bold text-base pb-2 border-b border-indigo-100">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h3>估值溢价因子 (Valuation Premium Drivers)</h3>
          </div>

          <div className="space-y-4">
            {/* Premium 1 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1. 结构性优势：传统软件巨头被三重利益链锁死</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                用友、金蝶、微盟受制于<strong>收入结构（License和高昂年费）、组织利益（庞大销售代理提成）与存量客户关系</strong>三重锁死，绝不敢自我革命把财务免费开源。eMVP-Lab没有历史包袱，能以免费财务开源直捣黄龙。
              </p>
              <div className="pl-6 text-[11px] text-indigo-700 font-medium">
                估值加成：商业模式颠覆性溢价 (+15% ~ +25%)
              </div>
            </div>

            {/* Premium 2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>2. 基因优势：切入中国SMB“卖货为先”第一刚需</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                欧美Odoo以“管货/进销存”为起点，而在中国极度发达的多平台电商生态下，中小微企业的第一诉求是<strong>“先搭网站卖货”</strong>，其次才是订单调度、进销存与记账。创始人深耕企业电商近20年，精准占据卖货入口。
              </p>
              <div className="pl-6 text-[11px] text-indigo-700 font-medium">
                估值加成：高TAM市场定位溢价 (+20%)
              </div>
            </div>

            {/* Premium 3 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>3. 独立AI审计层：解决企业不敢信任AI的硬性痛点</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                企业财税对准确率要求100%，绝不允许LLM幻觉。eMVP-Lab设立与经营大脑物理隔离的独立审计层，提供可追溯、可审计规则引擎，让SMB首次具备合规使用AI的能力。
              </p>
              <div className="pl-6 text-[11px] text-indigo-700 font-medium">
                估值加成：AI Native安全架构溢价 (+15%)
              </div>
            </div>

            {/* Premium 4 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>4. 前店后厂造血：首年150万~500万现金回款安全垫</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                五大赛道成熟系统转让与联合投标，为后厂约600万研发提供强劲自我供血，摆脱依赖下一轮融资续命的VC黑洞陷阱。
              </p>
              <div className="pl-6 text-[11px] text-indigo-700 font-medium">
                估值加成：下行周期生存韧性溢价 (+10%)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Valuation Discounts & Risks */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-base pb-2 border-b border-amber-100">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h3>估值折价风险因子 (Valuation Discount Caveats)</h3>
          </div>

          <div className="space-y-4">
            {/* Risk 1 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>1. 知识产权 (IP) 确权未决风险 (核心折价因子)</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                计划书明确五大系统系受委托开发。历史投资方虽因行业周期中止运营，但原合同中关于源码著作权共有、买断或排他性条款若未出具法律割接确认函，会面临潜在追索风险。
              </p>
              <div className="pl-6 text-[11px] text-rose-700 font-medium">
                模型折价扣除：-15% ~ -25% (必须作为投资交割前置条件)
              </div>
            </div>

            {/* Risk 2 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>2. 技术架构现代化与历史债务重构成本</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                BodhiECP开源平台基于轻量级PHP CodeIgniter编写（2015年成型）。尽管具备高并发，但在现代云原生、微服务、Python AI Agent生态下，需要后厂研发投入重构API中台。
              </p>
              <div className="pl-6 text-[11px] text-amber-700 font-medium">
                模型折价扣除：研发重置准备金约 600 万元
              </div>
            </div>

            {/* Risk 3 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>3. Pre-ARR 阶段向标准产品跨越的客户落地周期</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                目前一体化系统v1.0尚未上线，商业计划书中首期30家高利润客户（年费15万）与100家微利客户（年费5000元）的转化率需要经过真实市场销售验证。
              </p>
              <div className="pl-6 text-[11px] text-amber-700 font-medium">
                模型折价扣除：早期执行不确定性折现率设定为 20%
              </div>
            </div>

            {/* Risk 4 */}
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
                <span>4. FDE 模式的高素质现场工程师扩张瓶颈</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">
                FDE现场陪伴模式虽然极高粘性、极高客单价，但工程师既要懂业务又要熟练使用AI重写Skill，人才培养周期较长，可能影响后期爆发式规模化裂变。
              </p>
              <div className="pl-6 text-[11px] text-amber-700 font-medium">
                应对建议：加紧提炼标准行业Skill组件与自动化部署引擎
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Synthesis Summary Bar */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
            <span>估值折溢价综合权衡定论</span>
          </div>
          <p className="text-xs text-slate-600">
            在扣除约18%的IP审慎折价与历史架构技术债务后，项目的真实业务沉淀与抗风险自造血能力，依然可稳固支撑<strong>投前 7,500万 ~ 1.05亿元</strong>的合理公允区间。
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">风险评级:</span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded">
            B+ (中等可控 / 资产重置边际高)
          </span>
        </div>
      </div>
    </div>
  );
};
