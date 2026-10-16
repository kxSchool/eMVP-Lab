export interface ProjectTrack {
  id: string;
  name: string;
  domainUrl: string;
  clientType: string;
  investmentAmountWan: number; // in 万元 RMB
  operationalYears: number;
  description: string;
  coreCapabilities: string[];
  currentStatus: string;
  ipRiskFactor: 'low' | 'medium' | 'high';
  ipAuditNotes: string;
  monetizationEstimateWan: {
    min: number;
    max: number;
  };
}

export interface ValuationSandboxParams {
  fundraisingAskWan: number; // 融资金额 (万元)
  equityOfferedPct: number; // 出让股权 (%)
  historicalAssetDiscountPct: number; // 历史4.02亿托付投资的承认折算率 (%)
  bodhiPlatformAssetWan: number; // BodhiECP基座研发重置价值 (万元)
  arrTargetYear1Wan: number; // 12个月ARR目标 (万元)
  arrMultiple: number; // ARR估值乘数 (倍)
  frontStoreCashflowWan: number; // 前店项目销售回款预期 (万元)
  fdeServiceMarginPct: number; // FDE服务综合毛利率 (%)
  discountRatePct: number; // 风险贴现率 (%)
  ipRiskDiscountPct: number; // IP确权未决折价比例 (%)
}

export interface ValuationMethodologyResult {
  name: string;
  code: string;
  preMoneyMinWan: number;
  preMoneyBaseWan: number;
  preMoneyMaxWan: number;
  postMoneyBaseWan: number;
  primaryMetric: string;
  keyAssumptions: string[];
  applicability: string;
  confidence: 'high' | 'medium' | 'moderate';
}

export interface SOTPBreakdownItem {
  component: string;
  valueWan: number;
  percentage: number;
  description: string;
  basis: string;
}
