import { ValuationSandboxParams, ValuationMethodologyResult, SOTPBreakdownItem } from '../data/valuation';
import { HISTORICAL_TRACKS } from '../data/projectData';

export function calculateValuationResults(params: ValuationSandboxParams) {
  // 1. 资产与历史投入法 (Asset-Based Replacement Cost)
  const totalHistoricalInvestmentWan = HISTORICAL_TRACKS.reduce(
    (sum, t) => sum + t.investmentAmountWan,
    0
  ); // 40,700 万元 (~4.07亿元)

  const ipFactor = (100 - params.ipRiskDiscountPct) / 100;
  const recognizedHistoricalAssetsWan =
    totalHistoricalInvestmentWan *
    (params.historicalAssetDiscountPct / 100) *
    ipFactor;

  const assetPreMoneyBase = recognizedHistoricalAssetsWan + params.bodhiPlatformAssetWan;
  const assetPreMoneyMin = assetPreMoneyBase * 0.75;
  const assetPreMoneyMax = assetPreMoneyBase * 1.35;

  // 2. 市场倍数法 (Comparable Multiples - ARR + Front Store Cashflow)
  // 前店项目转让/授权按 2.5x ~ 4.0x
  const frontStoreValuationBase = params.frontStoreCashflowWan * 3.2;
  // SaaS ARR 按可调倍数
  const saasValuationBase = params.arrTargetYear1Wan * params.arrMultiple;
  const multiplesPreMoneyBase = frontStoreValuationBase + saasValuationBase;
  const multiplesPreMoneyMin = multiplesPreMoneyBase * 0.7;
  const multiplesPreMoneyMax = multiplesPreMoneyBase * 1.4;

  // 3. 分部估值法 (SOTP - Sum of the Parts)
  const sotpBasePlatform = params.bodhiPlatformAssetWan * 1.1; // 开源基座+API矩阵
  const sotpTracksKnowhow = recognizedHistoricalAssetsWan * 0.85; // 5大赛道Know-how现值
  const sotpSaasOption = params.arrTargetYear1Wan * (params.arrMultiple * 0.75); // SMB一体化产品期权现值
  const sotpAiSkillEngine = 1200; // FDE + AI重写Skill工具链专有资产
  const sotpRiskDeduction = (sotpBasePlatform + sotpTracksKnowhow + sotpSaasOption + sotpAiSkillEngine) * (params.ipRiskDiscountPct / 100 * 0.6);

  const sotpTotalBase = Math.max(3000, (sotpBasePlatform + sotpTracksKnowhow + sotpSaasOption + sotpAiSkillEngine) - sotpRiskDeduction);
  const sotpMin = sotpTotalBase * 0.8;
  const sotpMax = sotpTotalBase * 1.3;

  const sotpItems: SOTPBreakdownItem[] = [
    {
      component: 'BodhiECP 开源平台与技术基座',
      valueWan: Math.round(sotpBasePlatform),
      percentage: Math.round((sotpBasePlatform / (sotpTotalBase + sotpRiskDeduction)) * 100),
      description: 'MIT协议开源基座，涵盖组织权限、单据引擎、统一配置与高并发MVC框架',
      basis: '按15人年高级全栈重构重置工时评估'
    },
    {
      component: '五大垂直赛道Know-how与前店资产包',
      valueWan: Math.round(sotpTracksKnowhow),
      percentage: Math.round((sotpTracksKnowhow / (sotpTotalBase + sotpRiskDeduction)) * 100),
      description: '4.02亿托付投入沉淀的物业、MRO、孵化、票务、心理平台成熟业务逻辑与前店变现能力',
      basis: '历史4.02亿投入按折扣率及IP安全边际折现'
    },
    {
      component: 'SMB 一体化经营 SaaS 预期价值',
      valueWan: Math.round(sotpSaasOption),
      percentage: Math.round((sotpSaasOption / (sotpTotalBase + sotpRiskDeduction)) * 100),
      description: '从电商卖货切入，集成财务(免费)+进销存+订单成本的年度订阅预期现金流',
      basis: `${params.arrTargetYear1Wan}万目标ARR × 概率加权倍数`
    },
    {
      component: 'FDE 专属工具链与 AI 重写 Skill',
      valueWan: Math.round(sotpAiSkillEngine),
      percentage: Math.round((sotpAiSkillEngine / (sotpTotalBase + sotpRiskDeduction)) * 100),
      description: '解决企业软件“变成砖头”的现场重写能力与独立AI审计层风控引擎',
      basis: '核心技术专利/专有技术与人效放大器溢价'
    },
    {
      component: '【扣除项】IP权属不确定性与重构风险准备金',
      valueWan: -Math.round(sotpRiskDeduction),
      percentage: -Math.round((sotpRiskDeduction / (sotpTotalBase + sotpRiskDeduction)) * 100),
      description: '部分委托开发合同著作权尚未完全割接、CodeIgniter向微服务演进的重构成本准备',
      basis: `按未决资产池 ${params.ipRiskDiscountPct}% 风险系数扣减`
    }
  ];

  // 4. 融资反推法 (VC Method - Implied Valuation)
  const impliedPostMoney = Math.round(params.fundraisingAskWan / (params.equityOfferedPct / 100));
  const impliedPreMoney = Math.round(impliedPostMoney - params.fundraisingAskWan);

  // 退出回报与IRR测算 (假设2年后A轮/并购估值达 2.5亿元至4.0亿元)
  const targetExitValuationMinWan = 25000;
  const targetExitValuationMaxWan = 40000;
  const investorShareValueExitMinWan = targetExitValuationMinWan * (params.equityOfferedPct / 100);
  const investorShareValueExitMaxWan = targetExitValuationMaxWan * (params.equityOfferedPct / 100);
  const moicMin = (investorShareValueExitMinWan / params.fundraisingAskWan);
  const moicMax = (investorShareValueExitMaxWan / params.fundraisingAskWan);
  const irrMin = (Math.pow(moicMin, 1 / 2) - 1) * 100;
  const irrMax = (Math.pow(moicMax, 1 / 2) - 1) * 100;

  // 汇总四大方法
  const methodologies: ValuationMethodologyResult[] = [
    {
      name: '历史资产与重置成本法 (Asset-Based)',
      code: 'ASSET',
      preMoneyMinWan: Math.round(assetPreMoneyMin),
      preMoneyBaseWan: Math.round(assetPreMoneyBase),
      preMoneyMaxWan: Math.round(assetPreMoneyMax),
      postMoneyBaseWan: Math.round(assetPreMoneyBase + params.fundraisingAskWan),
      primaryMetric: `历史投入 ${params.historicalAssetDiscountPct}% 折扣 + 基座重置成本`,
      keyAssumptions: [
        `历史4.02亿托付投资按 ${params.historicalAssetDiscountPct}% 资产承认度`,
        `扣除 ${params.ipRiskDiscountPct}% 委托开发IP确权风险准备金`,
        `BodhiECP基座研发重置价值 ${params.bodhiPlatformAssetWan} 万元`
      ],
      applicability: '最适合作为本轮投资的“资产安全底线”（清算与重置安全垫）。',
      confidence: 'high'
    },
    {
      name: '分部估值法 (Sum-of-the-Parts SOTP)',
      code: 'SOTP',
      preMoneyMinWan: Math.round(sotpMin),
      preMoneyBaseWan: Math.round(sotpTotalBase),
      preMoneyMaxWan: Math.round(sotpMax),
      postMoneyBaseWan: Math.round(sotpTotalBase + params.fundraisingAskWan),
      primaryMetric: '基座资产 + 5大赛道包 + SaaS期权 + AI工具链',
      keyAssumptions: [
        '前店资产与后厂研发分板块独立穿透估值',
        `SaaS业务赋予 ${params.arrMultiple * 0.75}x 概率加权估值`,
        '明确计入扣除项以对冲商业化延迟与合规风险'
      ],
      applicability: '最贴合项目“前店+后厂+开源+FDE”混合业务形态的客观估值法。',
      confidence: 'high'
    },
    {
      name: '市场可比交易与倍数法 (Market Multiples)',
      code: 'MULTIPLES',
      preMoneyMinWan: Math.round(multiplesPreMoneyMin),
      preMoneyBaseWan: Math.round(multiplesPreMoneyBase),
      preMoneyMaxWan: Math.round(multiplesPreMoneyMax),
      postMoneyBaseWan: Math.round(multiplesPreMoneyBase + params.fundraisingAskWan),
      primaryMetric: `前店回款 3.2x + 12M ARR ${params.arrMultiple}x`,
      keyAssumptions: [
        `前店实现回款 ${params.frontStoreCashflowWan} 万元 (按3.2x倍数)`,
        `12个月实现 ARR ${params.arrTargetYear1Wan} 万元 (按${params.arrMultiple}x倍数)`,
        '参考Odoo (10.8x) 与2026年AI原生软件并购中位基准 (11.5x)'
      ],
      applicability: '适合在产品上线、ARR指标实现爬坡后的机构定增与A轮融资参考。',
      confidence: 'medium'
    },
    {
      name: '融资诉求隐含估值法 (VC Implied Method)',
      code: 'VC_IMPLIED',
      preMoneyMinWan: Math.round(impliedPreMoney * 0.85),
      preMoneyBaseWan: impliedPreMoney,
      preMoneyMaxWan: Math.round(impliedPreMoney * 1.2),
      postMoneyBaseWan: impliedPostMoney,
      primaryMetric: `融 ${params.fundraisingAskWan}万 / 占股 ${params.equityOfferedPct}%`,
      keyAssumptions: [
        `基于商业计划书本轮融资 ${params.fundraisingAskWan} 万元诉求`,
        `出让股权比例 ${params.equityOfferedPct}% 倒推企业投前与投后定价`,
        '需验证未来24个月能否支撑投资人2.5-4.0亿退出估值与3x+回报'
      ],
      applicability: '体现创始人融资意愿与资本稀释容忍度的关键商务参照系。',
      confidence: 'moderate'
    }
  ];

  // 综合公允估值区间加权计算 (资产法 35% + SOTP 35% + 市场倍数法 20% + VC诉求 10%)
  const weightedPreMoneyBase = Math.round(
    assetPreMoneyBase * 0.35 +
    sotpTotalBase * 0.35 +
    multiplesPreMoneyBase * 0.20 +
    impliedPreMoney * 0.10
  );

  const fairValuationRange = {
    conservativeWan: Math.round(Math.min(assetPreMoneyMin, sotpMin)),
    benchmarkWan: weightedPreMoneyBase,
    optimisticWan: Math.round(Math.max(sotpMax, multiplesPreMoneyMax)),
    impliedPostMoneyWan: impliedPostMoney,
    impliedPreMoneyWan: impliedPreMoney,
    targetExitMoicRange: `${moicMin.toFixed(1)}x ~ ${moicMax.toFixed(1)}x`,
    targetExitIrrRange: `${irrMin.toFixed(0)}% ~ ${irrMax.toFixed(0)}%`
  };

  return {
    methodologies,
    sotpItems,
    fairValuationRange,
    totalHistoricalInvestmentWan,
    recognizedHistoricalAssetsWan
  };
}
