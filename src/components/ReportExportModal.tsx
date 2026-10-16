import React, { useState } from 'react';
import { ValuationSandboxParams, ValuationMethodologyResult } from '../data/valuation';
import { X, Copy, Check, Printer } from 'lucide-react';

interface ReportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
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
}

export const ReportExportModal: React.FC<ReportExportModalProps> = ({
  isOpen,
  onClose,
  params,
  methodologies,
  fairRange
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopyText = () => {
    const reportText = `【eMVP-Lab (上海宏思达) 项目投资价值与估值分析备忘录】
标的名称：上海宏思达信息技术有限公司 (品牌：eMVP-Lab，官网：www.kxschool.com)
开源代码基座：BodhiECP (gitee.com/kxschool | github.com/kxSchool/BodhiECP)
官方宣传阵地：国内新浪微博 (https://www.weibo.com/u/1421107701) | 海外X平台 (https://x.com/kxSchoolCN)
融资金额诉求：${params.fundraisingAskWan} 万元人民币
出让股权比例：${params.equityOfferedPct}%

一、核心估值结论
1. 综合投前公允估值中枢：${(fairRange.benchmarkWan / 10000).toFixed(2)} 亿元人民币
2. 公允估值防御区间：${(fairRange.conservativeWan / 10000).toFixed(2)} 亿元 ~ ${(fairRange.optimisticWan / 10000).toFixed(2)} 亿元
3. 融资诉求隐含投前估值：${(fairRange.impliedPreMoneyWan / 10000).toFixed(2)} 亿元 (投后 ${(fairRange.impliedPostMoneyWan / 10000).toFixed(2)} 亿元)
4. 投资人预期24个月退出回报 (MOIC)：${fairRange.targetExitMoicRange} (年化 IRR ${fairRange.targetExitIrrRange})

二、四大估值方法测算
1. 历史资产与重置成本法：基准投前 ${(methodologies[0].preMoneyBaseWan / 10000).toFixed(2)} 亿元
2. 分部估值法 (SOTP)：基准投前 ${(methodologies[1].preMoneyBaseWan / 10000).toFixed(2)} 亿元
3. 市场可比倍数法：基准投前 ${(methodologies[2].preMoneyBaseWan / 10000).toFixed(2)} 亿元
4. 融资诉求隐含法：基准投前 ${(methodologies[3].preMoneyBaseWan / 10000).toFixed(2)} 亿元

三、核心投资逻辑与安全垫
- 底线安全垫：历史5大垂直平台托付累计投资4.02亿元，运营超19年，技术代码与业务模型沉淀厚重。
- 前店自造血：前店成熟项目授权与联合投标，12个月预计回款150-500万，直接覆盖后厂约600万研发支出大半。
- 差异化定位：不与Odoo欧美进销存正面硬碰，切中中国5500万SMB“卖货第一痛点”，以免费财务开源引流。
- AI落地模型：FDE现场陪伴 + AI重写Skill + 独立AI审计层防幻觉，具备高LTV与AI Native溢价。
- 全域公域获客矩阵：国内微博（直触SMB决策者降低获客成本）+ 海外X/Twitter（链接全球开源开发者与AI/Agent叙事）。

四、关键风险提示与尽调先决条件 (CPs)
1. 必须签署历史委托开发合同知识产权割接协议，消除潜在IP纠纷风险。
2. 建议采用里程碑分批交割 (Tranches): 首期40%(IP确权完成)，二期35%(前店回款150万)，三期25%(签约高客单标杆)。
3. 协助团队推进基于PHP CodeIgniter架构的微服务与云原生API服务化重构。`;

    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              eMVP-Lab 项目投资价值与估值备忘录
            </h3>
            <p className="text-xs text-slate-500">专业投行与风险投资机构内部决策评审格式</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已复制研报' : '复制文本'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>打印 / 另存为PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-800 text-xs sm:text-sm">
          {/* Metadata Block */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <span className="text-slate-400 block text-[11px]">标的名称</span>
              <span className="font-semibold text-slate-900">上海宏思达 (eMVP-Lab)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">官方网站 / 开源基座</span>
              <span className="font-semibold text-slate-900">kxschool.com / BodhiECP</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">拟融资金额</span>
              <span className="font-mono font-bold text-indigo-700">{params.fundraisingAskWan} 万元</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">拟出让股权比例</span>
              <span className="font-mono font-bold text-indigo-700">{params.equityOfferedPct}%</span>
            </div>
          </div>

          {/* Social & Channel Verification Banner */}
          <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-800">官方宣传主阵地：</span>
              <a
                href="https://www.weibo.com/u/1421107701"
                target="_blank"
                rel="noreferrer"
                className="text-rose-600 hover:underline font-medium flex items-center gap-1"
              >
                <span>微博 @kxschool</span>
              </a>
              <span className="text-slate-300">|</span>
              <a
                href="https://x.com/kxSchoolCN"
                target="_blank"
                rel="noreferrer"
                className="text-slate-900 hover:underline font-medium flex items-center gap-1"
              >
                <span>X / Twitter @kxSchoolCN</span>
              </a>
            </div>
            <span className="text-[11px] text-indigo-700">公域低成本拓客通道</span>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1">
              一、估值分析结论与定价区间建议
            </h4>
            <div className="space-y-1.5 leading-relaxed text-slate-700">
              <p>
                <strong>1. 建议投前谈判中枢：</strong> 建议投资机构以<strong>投前 {(fairRange.benchmarkWan / 10000).toFixed(2)} 亿元人民币 (投后 {((fairRange.benchmarkWan + params.fundraisingAskWan) / 10000).toFixed(2)} 亿元)</strong> 为核心谈判基准。
              </p>
              <p>
                <strong>2. 公允防御区间：</strong> [{(fairRange.conservativeWan / 10000).toFixed(2)} 亿元 ~ {(fairRange.optimisticWan / 10000).toFixed(2)} 亿元]。其中资产重置底线约 {(fairRange.conservativeWan / 10000).toFixed(2)} 亿元，提供充足下行保护。
              </p>
              <p>
                <strong>3. 投资人退出测算：</strong> 若企业按计划在24个月达成A轮或战略并购退出（退出估值目标 2.5亿~4.0亿元），预期实现<strong>{fairRange.targetExitMoicRange}</strong>回报倍数，年化 IRR 达<strong>{fairRange.targetExitIrrRange}</strong>。
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1">
              二、四大专业估值模型测算明细表
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="p-2 border border-slate-200">估值方法</th>
                    <th className="p-2 border border-slate-200 text-right">投前估值区间</th>
                    <th className="p-2 border border-slate-200 text-right">基准投前</th>
                    <th className="p-2 border border-slate-200">核心评价与适用阶段</th>
                  </tr>
                </thead>
                <tbody>
                  {methodologies.map((m, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2 border border-slate-200 font-semibold">{m.name}</td>
                      <td className="p-2 border border-slate-200 text-right font-mono tabular-nums">
                        {(m.preMoneyMinWan / 10000).toFixed(2)}亿 ~ {(m.preMoneyMaxWan / 10000).toFixed(2)}亿
                      </td>
                      <td className="p-2 border border-slate-200 text-right font-mono font-bold text-indigo-700 tabular-nums">
                        {(m.preMoneyBaseWan / 10000).toFixed(2)} 亿元
                      </td>
                      <td className="p-2 border border-slate-200 text-slate-600">{m.applicability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-slate-900 border-b border-slate-200 pb-1">
              三、关键投资亮点与风险防范
            </h4>
            <ul className="space-y-1.5 list-disc pl-5 text-slate-700 leading-relaxed">
              <li><strong>资产底座实证：</strong>传统企业累计托付投资4.02亿元，运营超19年，涵盖地产、工业品MRO、创孵、文娱票务及医疗大健康，积累深厚业务模型。</li>
              <li><strong>自造血抗寒冬：</strong>前店成熟赛道项目授权及联合投标，首年可贡献150-500万现金回款，大幅降低外部融资依赖度。</li>
              <li><strong>差异化赛道卡位：</strong>以中国中小企业第一痛点“建品牌站卖货”为突破口，以免费财务开源引流，突破用友金蝶微盟的商业模式封锁。</li>
              <li><strong>关键风控建议：</strong>在投资交割前，务必出具五大委托开发平台知识产权无纠纷割接证明；建议采用三期里程碑分阶段注资，锁定投资确定性。</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 rounded-b-2xl">
          <div className="text-[11px] text-slate-400">
            内部研究资料 · 基于公开商业计划书与kxschool.com数据分析
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
          >
            完成审阅
          </button>
        </div>
      </div>
    </div>
  );
};
