import { ProjectTrack, ValuationSandboxParams } from '../types/valuation';

export const COMPANY_PROFILE = {
  companyName: '上海宏思达信息技术有限公司',
  brandName: 'eMVP-Lab',
  officialWebsite: 'www.kxschool.com',
  githubUrl: 'github.com/kxSchool/BodhiECP',
  giteeUrl: 'gitee.com/kxschool',
  channels: {
    weibo: {
      name: '新浪微博 (国内主阵地)',
      url: 'https://www.weibo.com/u/1421107701',
      handle: 'kxSchool 官方微博',
      role: '面向国内5500万中小企业主、企服从业者、政企合作方及开源用户的业务动态发布与企业经营思维布道'
    },
    twitter: {
      name: 'X / Twitter (海外与开源生态阵地)',
      url: 'https://x.com/kxSchoolCN',
      handle: '@kxSchoolCN',
      role: '面向全球开源开发者、跨国AI/Agent创投、海外华人商业社区及Odoo生态对比的技术理念输出与全球声量建设'
    }
  },
  foundedHistory: '创始人自1997年攻读计算机专业，20+年开发运营积累，4年传统500强ERP，10年企业电商，2015年自研BodhiECP开源平台',
  coreBaseArchitecture: 'BodhiECP Platform (MIT License) - 轻量级 CodeIgniter MVC、网站中台(admin)、服务商后台(crm)、PC网站(www)、移动H5(m)',
  targetMarket: '中国5500万中小企业 (SMB)，从电商卖货第一痛点切入',
  threeAssets: [
    {
      title: '开源基座 (BodhiECP Platform)',
      desc: '组织、权限、流程、单据、数据、配置、API一体化底座，MIT许可证完全开放，具备快速二次开发能力。'
    },
    {
      title: 'AI重写Skill',
      desc: 'FDE现场理解业务后，借助专用AI技能快速重写、生成、部署企业软件，杜绝“对话框生成不可用代码/变成砖头”。'
    },
    {
      title: 'FDE持续部署服务 (Forward Deployed Engineer)',
      desc: '工程师深度驻场陪伴，理解业务全生命周期，随企业成长动态叠加采购、分销、财务、OA等模块，将LTV无限延展。'
    }
  ],
  dualEngine: {
    frontStore: '前店销售五条赛道成熟项目（授权、联合投标、白标OEM），预期12个月回款150万~500万，为研发供血并降低次轮融资依赖。',
    backFactory: '后厂集中约600万研发预算，构建eMVP-Lab中小企业一体化数字系统v1.0（财务免费开源引流 + 电商进销存私有化订阅 + 独立AI审计层）。'
  },
  financingTarget: {
    amountMinWan: 1000,
    amountMaxWan: 3000,
    equityPctMin: 10,
    equityPctMax: 15,
    round: 'Pre-A / 战略融资'
  }
};

export const HISTORICAL_TRACKS: ProjectTrack[] = [
  {
    id: 'wyg',
    name: '办公楼租赁及物业管理平台',
    domainUrl: 'wyg.kxschool.com',
    clientType: '传统房地产企业委托',
    investmentAmountWan: 1000,
    operationalYears: 3,
    description: '涵盖楼宇房源管理、合同签订、租金账单生成、物业缴费、报修巡检及资产报表。',
    coreCapabilities: ['资产台账与租赁生命周期', '自动计费与账单催缴', '物业工单与多角色权限'],
    currentStatus: '因资方主业地产下行终止运营，源码与架构完整',
    ipRiskFactor: 'medium',
    ipAuditNotes: '委托开发模式，需确权合同中源码二次销售授权或白标衍生权。',
    monetizationEstimateWan: { min: 50, max: 100 }
  },
  {
    id: 'wcpl',
    name: '五金汽配MRO集采供应链平台',
    domainUrl: 'wcpl.kxschool.com',
    clientType: '传统房地产+五金汽配城企业',
    investmentAmountWan: 3000,
    operationalYears: 5,
    description: '涵盖多级SKU编码、供应商集采招投标、阶梯报价、现货库存同步及物流中转。',
    coreCapabilities: ['十万级工业品MRO物料库', 'B2B集采撮合与账期清算', '多级仓储配送链路'],
    currentStatus: '运营5年积累海量工业品数据结构与供应链业务逻辑',
    ipRiskFactor: 'medium',
    ipAuditNotes: 'MRO工业品标准库与B2B采购模型具备极高行业转让价值。',
    monetizationEstimateWan: { min: 50, max: 100 }
  },
  {
    id: 'wryb',
    name: '一站式创业孵化服务平台',
    domainUrl: 'wryb.kxschool.com',
    clientType: '传统企业中介公司',
    investmentAmountWan: 200,
    operationalYears: 2,
    description: '工商注册代办、政策申报匹配、入孵企业档案管理、园区资源协同中台。',
    coreCapabilities: ['企业全生命周期政务流', '服务商工单接单与佣金分润', '轻量CRM与商机分配'],
    currentStatus: '系统小巧精悍，适配各级科技园、众创空间与招商代办机构',
    ipRiskFactor: 'low',
    ipAuditNotes: '投资额较小，代码二次商业化阻力小，可直接做政企联合标。',
    monetizationEstimateWan: { min: 15, max: 25 }
  },
  {
    id: 'wpm',
    name: '演剧院全景选座购票系统',
    domainUrl: 'wpm.kxschool.com',
    clientType: '大型传统房地产企业（文旅板块）',
    investmentAmountWan: 30000, // 3亿元
    operationalYears: 6.5,
    description: '超高并发剧场3D全景选座、多演出场次票务分销、电子闸机验票与分账对账系统。',
    coreCapabilities: ['高并发动态锁座引擎', '全景视角座席渲染', '票务结算与防伪核销'],
    currentStatus: '累计托付投资达3亿元，运营6年半，验证了大型文体娱乐核心业务处理',
    ipRiskFactor: 'high',
    ipAuditNotes: '涉及大额历史出资，必须严格厘清源码专有性条款与知识产权割接协议。',
    monetizationEstimateWan: { min: 60, max: 100 }
  },
  {
    id: 'wxr',
    name: '心理咨询在线诊所',
    domainUrl: 'wxr.kxschool.com',
    clientType: '传统医疗健康投资企业',
    investmentAmountWan: 6000, // 6000万
    operationalYears: 3.5,
    description: '涵盖咨询师入驻审核、预约排期日程、加密视频面询通道、在线量表测评及电子病历档案。',
    coreCapabilities: ['敏感个人健康信息安全合规架构', '日历预约与计时计费闭环', '量表自动评分与AI辅助分析'],
    currentStatus: '运营3年多，验证私域医疗大健康场景的严密隐私与支付清算',
    ipRiskFactor: 'medium',
    ipAuditNotes: '医疗合规与隐私保护模块价值突出，适用于社区康养与心理平台重用。',
    monetizationEstimateWan: { min: 20, max: 35 }
  },
  {
    id: 'scaffold',
    name: '脚手架租赁记账库管系统 (早期基石)',
    domainUrl: '线下核心实证',
    clientType: '工程设备租赁龙头企业',
    investmentAmountWan: 500,
    operationalYears: 4,
    description: '管理几千万建筑资产的租赁流转、磨损折旧、计日计件对账与应收款闭环追讨。',
    coreCapabilities: ['复杂非标租赁计费模型', '进销存库管与资产损耗追踪', '工程对账单多维导出'],
    currentStatus: '客户持续高度好评，奠定了进销存+财务底座的实战严谨度',
    ipRiskFactor: 'low',
    ipAuditNotes: '完全自研进销存内核，成为BodhiECP进销存模块的重要原型。',
    monetizationEstimateWan: { min: 10, max: 20 }
  }
];

export const BENCHMARK_VALUATION_MULTIPLES = [
  {
    name: 'Odoo (全球开源ERP领导者)',
    market: '欧洲 / 全球 (PE参股)',
    revenueARR: '€6.5亿 (~51亿人民币)',
    valuation: '€70亿 (~550亿人民币)',
    multiple: '10.8x EV/ARR',
    notes: '开源底座+商业版App订阅，年增长>40%，证明了开源企业软件的高估值天花板'
  },
  {
    name: 'Intuit QuickBooks (小微财务SaaS)',
    market: '美股 (NASDAQ: INTU)',
    revenueARR: '$160亿+ 收入',
    valuation: '$1800亿+ 市值',
    multiple: '11.2x P/S',
    notes: '美国小微企业财务垄断，80%市占率，证实免费/极低门槛财务切入的巨型商业价值'
  },
  {
    name: '微盟 / 有赞 (中国电商SaaS)',
    market: '港股 (02013.HK / 08083.HK)',
    revenueARR: '15亿 ~ 20亿人民币',
    valuation: '15亿 ~ 35亿人民币',
    multiple: '0.8x ~ 1.8x P/S',
    notes: '重前端电商营销，缺少后端进销存与真实财务打通，存量流失率较高，估值承压'
  },
  {
    name: '用友 / 金蝶 (中国ERP巨头)',
    market: 'A股 / 港股',
    revenueARR: '80亿 ~ 100亿人民币',
    valuation: '250亿 ~ 400亿人民币',
    multiple: '2.5x ~ 4.2x P/S',
    notes: '存量License转型云服务，客单价高但难以免费开源破坏自身利益链条'
  },
  {
    name: '2026 AI-Native 企业软件融资格局',
    market: '全球VC中位数',
    revenueARR: '早期ARR 500万~2000万',
    valuation: '种子/A轮中位',
    multiple: '14.0x ~ 25.0x ARR',
    notes: '具备真实落地Agent和工作流重构能力的垂直企业软件享有极高AI原生溢价'
  }
];

export const INITIAL_SANDBOX_PARAMS: ValuationSandboxParams = {
  fundraisingAskWan: 1500, // 计划融1500万
  equityOfferedPct: 12.5, // 计划出让12.5%
  historicalAssetDiscountPct: 15.0, // 4.02亿历史投入按15%承认
  bodhiPlatformAssetWan: 1500, // BodhiECP基座研发重置成本估值1500万
  arrTargetYear1Wan: 500, // 第一年ARR目标500万 (高利润SMB 30家 + 微利100家)
  arrMultiple: 12.0, // 中位ARR倍数12x
  frontStoreCashflowWan: 300, // 前店项目销售回款预期300万
  fdeServiceMarginPct: 70, // 毛利率70%
  discountRatePct: 20.0, // 早期企业WACC风险折现率20%
  ipRiskDiscountPct: 18.0 // 知识产权确权风险折价18%
};
