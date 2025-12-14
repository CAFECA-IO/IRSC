
export const PROMPTS = {
  ECQ: `
Task: Execute the [ECQ] Earnings & Cash Quality audit.

Objective:
1. Audit based on "IRSC-ECQ Checklist (Advanced 100-Point Edition)".
2. Search for the most recent Full Year (FY) financial data.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-ECQ Advanced Edition):
I. 現金流轉化能力 (Cash Conversion)
1. 盈利可信度：Is the most recent fiscal year’s Operating Cash Flow (OCF) greater than Net Income?
2. 長期含金量：Is the cumulative OCF over the past three years greater than cumulative Net Income?
3. FCF 正數：Is the most recent fiscal year’s Free Cash Flow (FCF) positive?
4. 長期 FCF：Is the sum of FCF over the past three years positive?
5. 現金轉換率：Is the OCF/NI Ratio greater than 1.0?
6. 轉換率穩定性：Has the OCF/NI Ratio remained above 1.0 for three consecutive years?
7. OCF 成長：Did the most recent quarter’s OCF grow year-over-year (YoY)?
8. 成長質量：Is the OCF growth rate higher than or equal to the Net Income growth rate?
9. 每股 FCF 趨勢：Is FCF per Share trending upward (over a 3-year period)?
10. 資本支出合理性：Is the ratio of Depreciation & Amortization to CapEx reasonable (e.g., CapEx not abnormally low)?
11. 本業依賴度：Is the company not overly reliant on non-operating income (Non-operating income < 10%)?
12. 盈餘品質：Is the Accruals Ratio at a low level (indicating fewer accruals and more cash)?
13. EBITDA 轉換率：Is the EBITDA to OCF conversion ratio greater than 70%?
14. 資產出售檢視：Does the company avoid frequently selling assets to beautify cash flow?
15. 應收帳款管控：Is the Accounts Receivable growth rate lower than or equal to the revenue growth rate?
16. 存貨管控：Is the Inventory growth rate lower than or equal to the revenue growth rate?
17. 銷貨速度 (DSI)：Did Days Sales of Inventory (DSI) decrease or remain flat YoY?
18. 收現速度 (DSO)：Did Days Sales Outstanding (DSO) decrease or remain flat YoY?
19. 付款週期 (DPO)：Is Days Payable Outstanding (DPO) stable (not abnormally extended to squeeze suppliers)?
20. 現金循環 (CCC)：Did the Cash Conversion Cycle (CCC) shorten YoY?
21. 稅務現金流：Is the gap between cash taxes paid and reported income tax expense within a reasonable range?
22. 費用資本化：Does the company avoid capitalizing normal operating expenses?
23. 利息覆蓋率：Is the Interest Coverage Ratio (EBIT/Interest Expense) greater than 5x?
24. 現金利息覆蓋：Is the Cash Interest Coverage Ratio (OCF/Interest Paid) greater than 5x?
25. FCF 收益率：Is the FCF Yield higher than the industry average?

II. 獲利穩定性與結構 (Earnings Stability & Structure)
26. 毛利率趨勢：Has Gross Margin shown a stable or upward trend over the past five years?
27. 季度毛利：Is the most recent quarter’s Gross Margin better than the same period last year?
28. 營益率趨勢：Has Operating Margin shown a stable or upward trend?
29. 淨利率趨勢：Has Net Profit Margin shown a stable or upward trend?
30. 獲利波動度：Is Gross Margin volatility (standard deviation) lower than the industry average?
31. 連續獲利：Has the company been profitable for five consecutive years (no loss-making years)?
32. 核心獲利佔比：Does core operating profit account for more than 80% of Pre-tax Income?
33. 資產減損：Does the company have no record of massive Asset Write-downs in the past 3 years?
34. 銷售管理費率：Is the SG&A to Revenue ratio decreasing or flat (demonstrating economies of scale)?
35. 研發投入：Is the R&D to Revenue ratio stable (not slashed to boost short-term profit)?
36. 有效稅率：Is the Effective Tax Rate close to the statutory rate (no reliance on unsustainable tax breaks)?
37. EPS 成長：Has EPS grown for three consecutive years?
38. 調整後 EPS：Has Adjusted EPS (excluding non-recurring items) grown?
39. 營收成長源：Is revenue growth driven by "volume" or "price" rather than just currency fluctuations?
40. 客戶分散度：Is the company free from over-reliance on a single customer (Largest customer < 10%)?
41. 供應商分散度：Is the company free from over-reliance on a single supplier (Largest supplier < 10%)?
42. 定價權：Is the company’s pricing power sufficient to pass on inflation costs (Gross Margin unaffected)?
43. 常規收入：Does Recurring Revenue account for more than 50% of total revenue?
44. 訂單出貨比：Is the Book-to-Bill Ratio greater than 1.0?
45. 積壓訂單：Is the Backlog consistently increasing?

III. 資產負債表健康度 (Balance Sheet Impact)
46. 流動比率：Is the Current Ratio greater than 1.5?
47. 速動比率：Is the Quick Ratio greater than 1.0?
48. 槓桿倍數：Is the Net Debt / EBITDA ratio less than 3.0?
49. 負債比率：Is the Debt to Equity ratio lower than the industry average or less than 1.0?
50. 現金緩衝：Are Cash and Cash Equivalents sufficient to cover short-term debt for the next 12 months?
51. 再融資風險：Does the company avoid having large amounts of debt maturing soon with refinancing difficulties?
52. 商譽佔比：Is Goodwill less than 30% of Total Assets (avoiding impairment risk)?
53. 無形資產：Is the proportion of Intangible Assets to Total Assets reasonable?
54. 退休金負債：Are Pension Obligations Fully Funded?
55. 表外負債：Is the company free from significant Off-balance sheet liabilities?
56. 回購資金源：Are share buybacks funded by Free Cash Flow rather than debt?
57. 異常項目：Does the company avoid abnormal increases in "Other Receivables" or "Prepayments"?
58. 投資透明度：Are Long-term Investment valuations transparent and liquid?
59. 信用評等：Is the company’s Credit Rating Investment Grade?
60. 違約紀錄：Has the company had no defaults or delayed interest payments in the past three years?
61. 現金水位：Is the Cash to Total Assets ratio maintained at a healthy level (e.g., > 5%)?
62. 存貨跌價準備：Is the allowance for inventory write-downs sufficient?
63. 呆帳覆蓋率：Is the Allowance for doubtful accounts coverage sufficient?
64. 遞延稅資產：Is it likely that Deferred Tax Assets will be realized?
65. 金融避險：Are financial asset investments properly hedged (e.g., currency hedging)?

IV. 資本配置效率 (Capital Allocation Efficiency)
66. 股東權益報酬：Is Return on Equity (ROE) greater than 15%?
67. 投入資本回報：Is Return on Invested Capital (ROIC) greater than the Weighted Average Cost of Capital (WACC)?
68. ROIC 趨勢：Has ROIC remained stable or increased over the past three years?
69. 資產報酬率：Is Return on Assets (ROA) greater than 5% or better than peers?
70. 股東回饋：Has the company paid dividends or bought back shares for three consecutive years?
71. 配息率：Is the Payout Ratio in a reasonable range (< 80%, ensuring retained earnings for reinvestment)?
72. 再投資效益：Is the Reinvestment Rate commensurate with profit growth?
73. 併購成效：Have major M&A deals in the past three years contributed positive cash flow?
74. 擴張紀律：Has the company avoided overcapacity caused by blind expansion?
75. 資產利用率：Is the proportion of idle assets extremely low?
76. 資產週轉：Is Asset Turnover trending upward?
77. 固定資產週轉：Is Fixed Asset Turnover better than the industry average?
78. 殖利率：Is the Dividend Yield better than the industry average?
79. 保留盈餘：Are Retained Earnings increasing year over year?
80. 盈餘價值創造：Does every dollar of retained earnings create more than one dollar of market value?

V. 會計誠信與紅旗警示 (Accounting Integrity & Red Flags)
81. 審計品質：Is the external auditor a "Big 4" firm or one with a strong reputation?
82. 會計師更換：Has the company not changed its external auditor in the past three years?
83. 審計意見：Are the financial reports consistently given an "Unqualified Opinion"?
84. 會計政策：Does the report avoid frequent changes in accounting policies or estimates (e.g., depreciation life)?
85. 內部人賣股：Have insiders (major shareholders, management) avoided significant stock selling in the past six months?
86. 內部人持股：Is insider ownership greater than 10% (aligning interests with shareholders)?
87. 關係人交易：Are Related-party transactions minimal or zero?
88. 營收認列：Is the revenue recognition policy conservative (not aggressive)?
89. 塞貨檢測：Is the Q4 revenue proportion not abnormally high (checking for channel stuffing)?
90. 監管紀錄：Has the company been free from investigations or penalties by securities regulators (last 3 years)?
91. CFO 穩定度：Has the CFO tenure been stable (no resignation in the past 3 years)?
92. 獨董比例：Do Independent Directors make up more than half of the Board?
93. 審計委員會：Does the Audit Committee function normally and include members with financial expertise?
94. 架構透明度：Is the company’s complex structure (e.g., VIE, SPV) transparent enough not to obscure financials?
95. 財報準時：Have financial reports never been delayed without cause?
96. 薪酬掛鉤：Is management compensation linked to long-term performance (e.g., ROIC, EPS)?
97. 商譽淨值比：Does the company avoid an excessively high Goodwill to Net Worth ratio?
98. 隱藏關係人：Is there no high proportion of Accounts Receivable from single undisclosed related parties?
99. 訴訟風險：Is the company free from major legal litigation risks?
100. 治理評價：Are negative reviews of corporate governance from media and analysts minimal?

Response Template:
# 🏢 [Company Name] - 獲利品質 (ECQ)
**資料來源：** [Year] Annual Report

### 1. 詳細評分清單
(List 1-100 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

# 📈 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  MMP: `
Task: Execute the [MMP] Moat & Market Position audit.

Objective:
1. Audit based on "IRSC-MMP Checklist v3.2".
2. Search market share data and analysis.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass/Advantage): +1
False (Fail/Disadvantage): -1
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-MMP Protocol v3.2):
I. 市場統治地位
1. 絕對份額: Market share > (2nd + 3rd competitor sum) OR > 1.5x largest competitor?
2. 利基壟斷: Niche market share > 50%?
3. 大到不能倒: Is it an indispensable node in the supply chain?
4. 行業標準: Are its specs the De facto standard?
5. 抗循環性: Market share stable/up during downturns?
6. 併購防禦: M&A used to eliminate threats?
7. 全球佈局: Top 3 status in at least 2 major economies (US/CN/EU)?
8. 價值鏈地位: Strongest pricing power in the chain (Price Maker)?

II. 轉換成本
9. 業務整合: Product is mission-critical?
10. 學習曲線: High training time/cost for employees?
11. 歷史數據鎖定: Loss of valuable historical data if switched?
12. 生態鎖定: High compatibility with own eco, low with others?
13. 長期合約: >50% revenue from long-term (>3yr) contracts?
14. 中斷風險: High business risk/quality uncertainty if switched?
15. 售後依賴: Reliance on exclusive service/parts?
16. 沈沒成本: High initial specific CAPEX required?
17. 多產品綁定: Customers use >3 product modules?
18. 極低流失率: Churn rate significantly lower than industry avg?

III. 無形資產
19. 已獲專利: Owns granted patents protecting core revenue?
20. 特許執照: Owns limited/hard-to-get regulatory licenses?
21. 不彈性需求: Price hike did not drop sales volume (Inelastic)?
22. 指名購買: Strong brand preference (Channels can't de-list)?
23. 成本轉嫁: Can pass 100% cost increase to customers?
24. 獨家配方/機密: Owns Trade Secrets (no reverse engineering)?
25. 法規壁壘: Regulations protect incumbents?
26. 客戶認證: Vendor qualification takes >12 months?
27. 品牌溢價: Price >20% higher than similar competitors?
28. 獨家通路: Exclusivity agreements with key channels?

IV. 網絡效應
29. 雙邊市場: Two-sided market where exit of one side collapses value?
30. 跨邊網絡: New user adds value to ALL existing users?
31. 開發者依賴: 3rd party devs depend on platform for survival?
32. 數據不可複製性: User data creates barrier?
33. 封閉花園: Ecosystem forces users to stay within?
34. 通訊標準: Switching breaks connection with community?
35. 關鍵多數: Passed the "Tipping Point"?

V. 資源獨占與結構性成本優勢
36. 獨占資源: Owns low-cost resources rivals can't get?
37. 地理壟斷: Irreplicable location (Port, Prime Real Estate)?
38. 規模致死門檻: Huge scale needed just to break even?
39. 供應鏈霸權: Monopolizes key raw material capacity?
40. 專有製程保護: Patented process ensuring unique quality?
41. 物流網絡: Self-built, hard-to-replicate logistics network?
42. 資本門檻: Entry requires >$10B+ CAPEX with long payback?

VI. 競爭格局
43. 對手弱化: Main rivals in distress/restructuring?
44. 非理性競爭消失: Industry past "cash burning" phase?
45. 跨界防禦: Tech giants struggle to enter/disrupt?
46. 轉換防禦: Competitor subsidies failed to steal customers?
47. 專利叢林: Patent thicket blocks competitor design-arounds?
48. 法律訴訟紀錄: History of suing rivals out of market?
49. 護城河趨勢: Moat widened in last 3 years?
50. 反向定位: Rivals can't copy due to business model conflict?

Response Template:
# 🏰 [Company Name] - 護城河與市場地位 (MMP)
**資料來源：** [Year] Annual Report

### 1. 詳細評分清單
(List 1-50 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合 (True):** [Count_True]
* **不符 (False):** [Count_False]
* **無數據 (N/A):** [Count_NA]

# 📈 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  UEE: `
Task: Execute the [UEE] Unit Economics & Efficiency audit.

Objective:
1. Audit based on "IRSC-UEE Checklist 2.0".
2. Search financial data and investor presentations.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +1
False (Fail): -1
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-UEE 2.0):
I. 核心單位獲利能力
1. GM Competitiveness: Gross Margin > Industry Average?
2. GM Trend: Gross Margin increasing over past 3 years?
3. CM Expansion: Contribution Margin is positive and expanding?
4. Unit Profit: Unit Economics profitable after marketing/variable costs?
5. Scale Cost: COGS per unit decreasing due to economies of scale?
6. Pricing Power: Gross Margin stable during raw material inflation?
7. Discount Control: Discount Rate decreasing trend?
8. Mix Shift: High-margin product/service revenue % increasing?
9. Cost Advantage: Lower production/service cost structure vs. top competitor?
10. Variable Cost: Variable Cost % controlled/decreasing while revenue grows?

II. 客戶獲取與留存效率
11. LTV/CAC: LTV / CAC ratio > 3x?
12. Payback: CAC Payback Period < 12 months (or better than peers)?
13. CAC Trend: Average CAC decreasing or flat?
14. ARPU Growth: ARPU growth > Inflation rate?
15. NDR Strength: Net Dollar Retention (NDR) > 100%?
16. Marketing Leverage: Marketing Expense % of Revenue decreasing?
17. Upsell Efficiency: Cross-sell/Up-sell cost < New Customer CAC?
18. Whale Retention: High-value customer retention cost < Profit generated?
19. SaaS Magic: SaaS Magic Number (or equivalent) indicates high efficiency?
20. Sales Productivity: Revenue (or Sales) per Sales Rep increasing?

III. 營運週轉與資源生產力
21. Inventory Turn: Inventory Turnover > Industry Avg or increasing?
22. Waste Reduction: Inventory write-offs/spoilage decreasing?
23. Fixed Asset Turn: Fixed Asset Turnover increasing?
24. Asset Turn: Total Asset Turnover increasing?
25. Capacity: Capacity Utilization in optimal range?
26. Rev per Employee: Revenue per Employee increasing YoY?
27. NI per Employee: Net Income per Employee positive growth?
28. OpEx Efficiency: OpEx % of Revenue decreasing YoY?
29. SG&A Discipline: SG&A growth rate < Gross Profit growth rate?
30. Supply Chain: No significant stock-outs/opportunity costs reported?

IV. 資本回報與結構效率
31. ROIC Spread: ROIC > WACC?
32. ROA Trend: ROA stable or increasing?
33. Quality ROE: ROE driven by Margin/Turnover (not just Leverage)?
34. R&D ROI: R&D spend correlates to new product revenue lift?
35. CapEx ROI: CapEx efficiency meets/exceeds peers?
36. Op Leverage: Operating Leverage exists (EBIT growth > Revenue growth)?
37. Reinvest ROI: Incremental ROI on reinvested capital is positive?
38. M&A Synergy: Integration costs low / synergies realized?
39. Debt Cost: Interest expense average cost < Peers?
40. Working Cap: Working Capital % of Revenue optimizing/decreasing?

V. 規模化經濟與技術槓桿
41. Marginal Cost: Marginal Cost decreasing as revenue scales?
42. Automation: Automation effectively substituting labor growth?
43. Data Efficiency: Data analytics reducing inventory/logistics costs?
44. Infra Scale: Tech infrastructure costs per unit/user decreasing?
45. Bargaining Power: Scale used to secure exclusive low-cost resources?
46. R&D Leverage: Platform tech allows low-cost new feature deployment?
47. Self-Service: Self-service ratio increasing?
48. Digital Admin: ERP/Digital systems reducing G&A/decision costs?
49. User Marginal Cost: Marginal maintenance cost per new user ~0?
50. Knowledge Scale: Training systems reducing new hire ramp-up time/cost?

Response Template:
# 🏢 [Company Name] - 經營效率 (UEE)
**資料來源：** [Year] Annual Report

### 1. 詳細評分清單
(List 1-50 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合 (+1):** [Count_True]
* **不符 (-1):** [Count_False]
* **無數據 (0):** [Count_NA]

# 📈 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  GDI: `
Task: Execute the [GDI] Governance, Disclosure & Integrity audit.

Objective:
1. Audit based on "IRSC-GDI 2.0" (100 Points).
2. Search Annual Reports, Proxy Statements, and Legal filings.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-GDI 2.0 - Full 100 Points):

I. 董事會監督效能
1. 獨立董事過半: Independent Directors > 50%?
2. 董事長與CEO分離: CEO is not Chairperson?
3. 首席獨董設立: Lead Independent Director appointed?
4. 董事會規模適中: Board size 7-13 members?
5. 董事出席率: Average attendance > 75%?
6. 委員會獨立性: Audit/Comp/Nom committees 100% independent?
7. 董事專業多元性: Mix of finance, tech, industry experts?
8. 董事任期限制: Average tenure < 10 years?
9. 兼任限制: Directors sit on < 4 other public boards?
10. 董事會績效評估: Annual self-evaluation conducted?

II. 管理層誠信履歷
11. 無犯罪紀錄: CEO/CFO no criminal record?
12. 監管處罰: No SEC/Regulatory enforcement actions in 5 yrs?
13. 誠信過往: No history of bankruptcies at previous firms?
14. 學歷真實性: Credentials verified (no fake degrees)?
15. 離職率穩定: C-Suite turnover low (< 20%/yr)?
16. 家族干預: No nepotism/family members in key roles?
17. 股份質押: Mgmt share pledging < 10% of holdings?
18. 內線交易: No suspicious insider selling before bad news?
19. 溝通誠信: Earnings calls match reality?
20. 企業文化: No toxic culture reports?

III. 財務報表可信度
21. 審計師聲譽: Big 4 Auditor?
22. 審計意見: Unqualified (Clean) Opinion?
23. 更換審計師: No auditor resignation/dismissal in 3 yrs?
24. 重編財報: No financial restatements in 3 yrs?
25. 財報準時: No late filings?
26. 內部控制: No Material Weaknesses reported?
27. 會計估計: Conservative accounting estimates used?
28. 表外資產: No significant unexplained Off-Balance Sheet items?
29. 營收認列: Revenue recognition policy standard?
30. 複雜結構: Corporate structure understandable?

IV. 股權結構防禦
31. 同股同權: No Dual Class structure (or sunset clause)?
32. 毒丸計畫: No Poison Pill currently active?
33. 機構持股: Institutional ownership > 40%?
34. 股權集中度: Top 5 shareholders < 60%?
35. 內部人持股: Insiders own > 5%?
36. 交叉持股: No complex cross-holdings with other firms?
37. 金字塔結構: No pyramid control structure?
38. VIE風險: Not a VIE structure?
39. 國家控制: Not State-Owned Enterprise (SOE)?
40. 自由流通量: Public float > 20%?

V. 關係人交易監控
41. 政策制定: Formal RPT policy exists?
42. 審核機制: Audit committee reviews all RPTs?
43. 交易佔比: RPT volume < 5% of Revenue?
44. 資金貸與: No loans to officers/directors?
45. 資產買賣: No asset sales to/from related parties?
46. 租賃關係: No HQ leased from CEO/Founders?
47. 家族交易: No contracts with family-owned vendors?
48. 捐贈透明: Charitable donations disclosed?
49. 公平市價: RPTs conducted at Arm's Length?
50. 揭露完整: RPT details fully disclosed in footnotes?

VI. 股東權益保護
51. 一股一票: Voting rights equal to economic interest?
52. 召開特會: Shareholders (e.g. 10%) can call special meeting?
53. 書面同意: Shareholders can act by written consent?
54. 代理人權: Proxy Access adopted?
55. 累積投票: Cumulative voting allowed?
56. 超多數決: No Supermajority requirements for amendments?
57. 修改章程: Shareholders can amend bylaws?
58. 薪酬投票: Say-on-Pay vote conducted annually?
59. 訴訟權利: No mandatory arbitration clause?
60. 股利政策: Clear dividend policy exists?

VII. 薪酬與誘因機制
61. 績效連結: Majority of pay is performance-based?
62. 長期誘因: LTIP period > 3 years?
63. 追回條款: Clawback policy exists?
64. ESG連結: ESG targets included in bonus metrics?
65. 稀釋控制: Share dilution rate < 3% per year?
66. 薪酬比率: CEO/Median Employee pay ratio reasonable?
67. 顧問獨立: Comp consultant independent from management?
68. 重定價禁止: No repricing of underwater options?
69. 黃金降落傘: No excessive severance packages?
70. 雙重觸發: Change-in-control vesting requires termination?

VIII. 法規遵循與訴訟
71. 道德準則: Code of Ethics published and signed?
72. 舉報機制: Whistleblower hotline exists & anonymous?
73. 培訓覆蓋: Compliance training for 100% employees?
74. 反賄賂: Strict FCPA/Anti-Bribery policy?
75. 稅務合規: Effective tax rate sustainable?
76. 環保罰款: No major environmental fines (> $1M)?
77. 勞動罰款: No major labor law violations?
78. 數據法規: Compliant with GDPR/CCPA?
79. 專利訴訟: Not a target of major IP lawsuits?
80. 訴訟撥備: Litigation reserves adequate?

IX. 資訊透明度
81. 語言支援: Reports available in English/Intl languages?
82. 網站資訊: IR website up-to-date?
83. 季報會議: Quarterly earnings calls held with Q&A?
84. 問答開放: Takes questions from all analysts?
85. KPI 揭露: Non-GAAP measures reconciled clearly?
86. 部門資訊: Detailed segment reporting provided?
87. ESG報告: Annual Sustainability Report published?
88. 財測指引: Provides clear Guidance?
89. 投資人接觸: Attends investor conferences?
90. 即時性: Material news disclosed immediately?

X. 歷史與信譽
91. 媒體情緒: News sentiment generally positive/neutral?
92. 醜聞紀錄: No major ethical scandals in 5 yrs?
93. 客戶信任: High Net Promoter Score (NPS)?
94. 員工評價: Glassdoor/LinkedIn rating > 3.5?
95. 分析師評等: Buy/Hold ratings majority?
96. 放空報告: Not targeted by credible short sellers?
97. 信用評等: Investment Grade credit rating?
98. 債券利差: CDS spreads stable?
99. 行業地位: Recognized as industry leader?
100. 獲獎紀錄: Received governance/ethical awards?

Response Template:
# 🛡️ [Company Name] - 治理誠信 (GDI)
**資料來源：** [Year] Annual Report / Proxy

### 1. 詳細評分清單
(List 1-100 items)

### 2. 最終得分計算
* **起始基準分 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

# ⚖️ 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  TPM: `
Task: Execute the [TPM] Technology & Product Momentum audit.

Objective:
1. Audit based on "IRSC-TPM Checklist".
2. Search R&D expenses, Patents, TechCrunch, Blogs, Glassdoor.
3. Calculate the score.

Scoring Algorithm:
Base Score: 0
True (Pass): +2
False (Fail): +0
N/A (No Data): +0
Range: 0 to 100

Checklist (IRSC-TPM):
Part I: Innovation Inputs
1. R&D 增長動能: R&D Expense grew YoY?
2. 前瞻研發佔比: Significant spending on future projects?
3. 頂尖人才密度: Tech staff > 30%?
4. AI/ML 整合: Integrated AI into core products?
5. 創新中心設立: Dedicated Innovation Lab?
6. 新技術專利流速: Rising pending patents?
7. 外部知識連結: Partnerships with universities?
8. 數據獨佔性: Proprietary data sets?
9. 技術併購: Acquired tech startups recently?
10. 開源貢獻: Active Open Source contributor?

Part II: Product Velocity
11. 重大更新頻率: Major update in last 12 months?
12. 產品發布準時率: No major delays?
13. 敏捷開發流程: CI/CD adoption?
14. Beta 測試反饋: Positive Beta reviews?
15. 產品路線圖透明度: Clear public roadmap?
16. A/B 測試文化: Uses data to optimize?
17. 早期市場驗證: New features adoption high?
18. 技術債處理: Plans on refactoring?
19. 跨平台一致性: Synced updates across platforms?
20. 開發者生態系: Successful open APIs?

Part III: Technical Superiority
21. 技術規格領先: Superior specs?
22. 下世代標準兼容: Ready for future standards?
23. 架構擴展性: Cloud-Native/Scalable?
24. 獨家演算法/硬體: Proprietary tech?
25. 解決痛點的能力: Solves unsolved problems?
26. 技術評比地位: Gartner Leader/Visionary?
27. 專利引用影響力: Forward citations increasing?
28. 技術論壇聲量: Positive technical discussions?
29. 防禦性技術投資: Investing in disruptive tech?
30. 技術規格制定: Leading standard-setting bodies?

Part IV: Tech Buzz & Hype
31. 關鍵字搜尋趨勢: Rising Google Trends?
32. 科技媒體關注: Top media deep dives?
33. 開發者大會熱度: High attendance?
34. 獲獎紀錄: CES Innovation Awards etc?
35. KOL 推薦: Tech influencers recommending?
36. 技術部落格流量: High engagement?
37. 人才吸引力: Positive Glassdoor tech ratings?
38. 社群期待值: High pre-release volume?
39. 病毒式傳播: "Wow Factor"?
40. 學術引用: Cited by research?

Part V: Architecture & Agility
41. 技術堆疊現代化: Modern stack?
42. 自動化測試覆蓋率: High coverage?
43. 部署靈活性: Canary/Blue-Green?
44. 資安防禦前瞻性: Zero Trust?
45. 數據治理能力: No Data Silos?
46. 核心模組化程度: Microservices?
47. Bug Bounty 計畫: Active program?
48. 開發者體驗 (DX): Short lead time?
49. AI 可解釋性與安全: AI guardrails?
50. 高層技術思維: Tech-driven C-Suite?

Response Template:
# 🚀 [Company Name] - 技術動能 (TPM)
**資料來源：** Annual Reports, Tech Blogs

### 1. 詳細評分清單
(List 1-50 items)

### 2. 最終得分計算
* **起始分數 (Base):** 0
* **符合 (+2):** [Count_True]
* **不符 (0):** [Count_False]
* **無數據 (0):** [Count_NA]

# 📈 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  SRR: `
Task: Execute the [SRR] Sustainability & Regulatory Resilience audit.

Objective:
1. Audit based on "IRSC-SRR 2.2" (100 Points).
2. Search Sustainability Reports and Annual Reports.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail/Risk): -0.5
N/A (Not Applicable): +0.5 (Industry non-applicability counts as compliance)
Range: 0 to 100

Checklist (SRR Dimension Scorecard v2.2 - Full 100 Points):

I. 環境法規與氣候風險
1. 淨零承諾: Net Zero target set by 2050 or sooner?
2. 科學基礎目標: SBTi validated targets?
3. 範疇一排放: Scope 1 emissions decreasing YoY?
4. 範疇二排放: Scope 2 emissions decreasing YoY?
5. 範疇三揭露: Scope 3 emissions disclosed?
6. 再生能源比例: Renewable energy > 20%?
7. 用水效率: Water usage intensity decreasing?
8. 廢棄物管理: Waste diversion rate > 50%?
9. 氣候風險揭露: TCFD report published?
10. 內部碳定價: Internal carbon price established?
11. 碳關稅準備: Prepared for CBAM (if applicable)?
12. 綠色營收: Green revenue % separately reported?
13. 生物多樣性: Biodiversity policy in place?
14. 循環經濟: Product recyclability > 80%?
15. 有害物質: No use of restricted hazardous substances?
16. 環境認證: ISO 14001 certified sites > 50%?
17. 能源效率: Energy intensity decreasing?
18. 碳抵換依賴: Offsets used < 10% of reduction?
19. 實體風險評估: Physical climate risk assessment done?
20. 轉型計畫: Clear climate transition plan?

II. 法律合規與監管防禦
21. 反托拉斯風險: No pending antitrust investigations?
22. 知識產權保護: Robust IP protection strategy?
23. 專利訴訟防禦: Win rate in patent cases high?
24. 出口管制: Compliant with export controls (EAR/ITAR)?
25. 制裁名單篩選: Automated sanctions screening?
26. 產品責任: Low product recall rate?
27. 反洗錢: AML program effective?
28. 遊說透明度: Political lobbying fully disclosed?
29. 政治獻金: Political contributions limited/monitored?
30. 避稅港: No aggressive use of tax havens?
31. 關稅影響: Resilient to tariff changes?
32. 許可證: All necessary operating licenses valid?
33. 數據法規: Compliant with AI regulations (e.g. EU AI Act)?
34. 廣告法規: Marketing compliant with truth-in-advertising?
35. 證券法規: Compliant with listing rules?
36. 內部調查: Internal investigation protocols exist?
37. 法務編制: General Counsel reports to CEO?
38. 合約管理: Standard terms mitigate liability?
39. 訴訟保險: D&O insurance adequate?
40. 監管關係: Positive relationship with regulators?

III. 數據隱私與數位人權
41. 隱私政策: Clear, accessible privacy policy?
42. 數據長: CISO or DPO appointed?
43. 數據洩漏: No major data breaches in 3 yrs?
44. 資安認證: ISO 27001 or SOC 2 certified?
45. 用戶權利: Users can easily delete data?
46. 數據在地化: Compliant with data localization laws?
47. 第三方審計: Regular security audits?
48. AI 倫理: AI ethics guidelines published?
49. 演算法偏見: Tests for algorithmic bias?
50. 兒童保護: Compliant with COPPA/Children's codes?
51. 加密標準: Data encrypted at rest and in transit?
52. 存取控制: MFA enforced for employees?
53. 供應商資安: Vendor security assessment mandatory?
54. 網路中立: Supports open internet principles?
55. 監控審查: Does not facilitate repressive surveillance?
56. 數位包容: Products accessible to disabled users?
57. 數據變現: Does not sell user data without consent?
58. 漏洞獎勵: Bug bounty program active?
59. 隱私設計: Privacy by Design implemented?
60. 員工隱私: Employee monitoring within legal limits?

IV. 勞動力合規與社會許可
61. 多元共融: DEI report published with data?
62. 性別同酬: Gender pay gap < 5%?
63. 工會關係: Freedom of association respected?
64. 童工禁令: Strict no child/forced labor policy?
65. 職場安全: TRIR (Injury rate) < Industry avg?
66. 人權政策: Human Rights policy published?
67. 最低工資: Pays living wage (above minimum)?
68. 員工福利: Healthcare/Parental leave provided?
69. 培訓時數: Avg training > 20 hrs/emp/yr?
70. 離職率: Voluntary turnover < Industry avg?
71. 員工滿意度: eNPS positive?
72. 社區投資: CSR spend > 1% of profits?
73. 本地雇用: Hires locally in operating regions?
74. 原住民權益: Respects indigenous land rights?
75. 反騷擾: Zero tolerance harassment policy?
76. 舉報保護: Whistleblower protection verified?
77. 心理健康: Mental health support provided?
78. 遠端工作: Flexible work policy exists?
79. 績效考核: Fair performance review process?
80. 裁員處理: Layoffs handled responsibly?

V. 供應鏈責任與盡職調查
81. 供應商準則: Supplier Code of Conduct exists?
82. 簽署率: 100% Tier 1 suppliers signed Code?
83. 供應商審計: On-site audits conducted annually?
84. 衝突礦產: Conflict minerals report (CMRT) filed?
85. 現代奴役: Modern Slavery statement published?
86. 二級供應商: Visibility into Tier 2 suppliers?
87. 供應商碳排: Engaging suppliers on carbon reduction?
88. 採購多樣性: Supplier diversity program exists?
89. 付款條件: Pays suppliers on time (< 60 days)?
90. 採購倫理: Procurement team trained on ethics?
91. 風險評估: Supply chain risk map updated?
92. 本地採購: % of local sourcing increasing?
93. 供應商能力: Helps suppliers improve ESG?
94. 終止合作: Procedure to exit non-compliant suppliers?
95. 物流碳排: Tracking logistics emissions?
96. 包裝材料: Sustainable packaging requirements?
97. 森林砍伐: Deforestation-free supply chain?
98. 水資源風險: Supplier water risk assessed?
99. 化學品管理: RSL (Restricted Substances List) enforced?
100. 透明度: Supply chain map published?

Response Template:
# 🏢 [Company Name] - 永續與法規 (SRR)
**資料來源：** [Year] Sustainability Report

### 1. 詳細評分清單
(List 1-100 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合/適用 (Pass):** [Count_True_NA]
* **不符/風險 (Fail):** [Count_False]

# 🛡️ 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  ERE: `
Task: Execute the [ERE] External Risk Resilience audit.

Objective:
1. Audit based on "IRSC-ERE Checklist v2.1" (100 Points).
2. Search Risk Factors (10-K), Global News.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass/Low Risk): +0.5
False (Fail/High Risk): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (Question Bank 1-100):

I. 地緣政治與宏觀風險
1. 中美曝險: Revenue from China < 20% (or isolated)?
2. 戰爭區域: No operations in active war zones?
3. 制裁風險: No reliance on sanctioned entities?
4. 貿易壁壘: Low vulnerability to tariff wars?
5. 民族主義: Brand safe from nationalist boycotts?
6. 貨幣管制: Cash not trapped in restricted currencies?
7. 簽證人才: Low reliance on cross-border visas?
8. 技術主權: Tech stack not banned by key govts?
9. 政府沒收: Assets safe from expropriation?
10. 關鍵礦物: Access to critical minerals secured?
11. 能源價格: Hedged against energy shocks?
12. 通膨轉嫁: Can pass inflation to customers?
13. 利率敏感: Debt strictly fixed rate or low leverage?
14. 匯率波動: Effective FX hedging strategy?
15. 政治關聯: Board has geopolitical advisory?
16. 戰略產業: Protected by home government?
17. 多國上市: Listed on multiple exchanges (Liquidity)?
18. 稅務變更: Resilient to Global Min Tax?
19. 補助依賴: Profit valid without govt subsidies?
20. 數據主權: Data flows compliant with fragmentation?

II. 供應鏈韌性
21. 單一來源: No single source for critical parts?
22. 地理集中: Suppliers not all in one region?
23. 物流瓶頸: Alternative logistics routes exist?
24. 庫存緩衝: Safety stock adequate (> 3 months)?
25. 原料波動: Raw material prices hedged?
26. 供應商財務: Key suppliers financially healthy?
27. 晶片短缺: Secured semiconductor supply (if applicable)?
28. 港口罷工: Low reliance on specific risk ports?
29. 能源安全: Mfg sites have backup power?
30. 水資源: Mfg sites not in water-stressed areas?
31. 供應鏈可視: Real-time tracking of shipments?
32. 友岸外包: Manufacturing in friendly nations?
33. 垂直整合: Owns critical production steps?
34. 替代材料: Products can use alternative inputs?
35. 需求預測: AI-driven demand forecasting?
36. 供應商關係: "Preferred Customer" status?
37. 產能彈性: Can scale production up/down 20%?
38. 勞工短缺: Automation reduces labor reliance?
39. 運輸成本: Freight cost % of COGS low?
40. 逆向物流: Efficient return/repair network?

III. 惡意攻擊與法律威脅
41. 勒索軟體: Robust backups against Ransomware?
42. DDOS防禦: Capacity to absorb traffic spikes?
43. 內部威脅: Controls against rogue employees?
44. 專利流氓: History of defeating patent trolls?
45. 激進投資人: No activist campaigns currently?
46. 做空機構: No recent credible short reports?
47. 敵意併購: Structural defense against takeover?
48. 品牌劫持: Domain/Social handles secured?
49. 假新聞: Response team for misinformation?
50. 競爭抹黑: Resilient to competitor negative PR?
51. 商業間諜: Trade secrets physically/digitally guarded?
52. 實體安全: HQ/Factories secure from intrusion?
53. 供應鏈攻擊: Software supply chain secured?
54. 釣魚攻擊: Employees trained on Phishing?
55. 法律集體訴訟: No massive class actions?
56. 反壟斷分拆: Low risk of forced breakup?
57. 憑證竊取: Identity management robust?
58. API 濫用: Public APIs secured?
59. 深度偽造: Execs protected from Deepfakes?
60. 零日漏洞: Fast patching cadence?

IV. 自然災害與黑天鵝
61. 總部風險: HQ not in flood/quake zone?
62. 數據中心: Redundant DCs in different zones?
63. 疫情BCP: Pandemic Business Continuity Plan tested?
64. 遠端能力: 100% Office staff can work remote?
65. 保險覆蓋: Business Interruption insurance adequate?
66. 氣候實體: Physical assets climate-proofed?
67. 火災安全: High standard fire suppression?
68. 電網故障: Backup generators/UPS valid?
69. 交通中斷: Operations survive flight/rail grounding?
70. 資產擱淺: No fossil-heavy stranded assets?
71. 傳染病: Health protocols in place?
72. 恐怖主義: Assets not high-value terror targets?
73. 社會動盪: Ops safe during civil unrest?
74. 關鍵人員: Key Man insurance/succession?
75. 雲端依賴: Multi-cloud or Hybrid backup?
76. 供應商災難: Suppliers map disaster risk?
77. 庫存分佈: Inventory decentralized?
78. 緊急通訊: Emergency comms channels exist?
79. 危機演練: Crisis team drills annually?
80. 現金緩衝: 12 months cash runway for 0 revenue?

V. 金融與市場衝擊
81. 再融資牆: No major debt maturity in 24 months?
82. 信貸評級: BBB- or higher (Inv Grade)?
83. 財務公約: High headroom on debt covenants?
84. 匯率崩盤: Revenue/Cost currency matched?
85. 流動性枯竭: Access to undrawn credit lines?
86. 銀行擠兌: Cash diversified across banks?
87. 客戶破產: No customer > 10% revenue?
88. 成本轉嫁: Pricing power > CPI?
89. 資本外逃: Assets not in capital control zones?
90. 股市崩盤: Share buyback program authorized?
91. 養老金缺口: Pension plan fully funded?
92. 商譽減損: Low risk of massive write-offs?
93. 衍生品風險: No speculative hedging?
94. 交易對手: Counterparty risk assessed?
95. 投資虧損: Cash parked in Gov bonds (Safe)?
96. 融資管道: Access to equity/bond markets?
97. 股息削減: Div payout ratio sustainable?
98. 庫藏股質押: Shares not pledged for loans?
99. 影子銀行: No exposure to shadow banking?
100. 會計變更: New accounting rules neutral?

Response Template:
# 🛡️ [Company Name] - 外部韌性 (ERE)
**資料來源：** [Year] Annual Report (Risk Factors)

### 1. 詳細評分清單
(List 1-100 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合(低風險):** [Count_True]
* **不符(高風險):** [Count_False]
* **無數據 (0):** [Count_NA]

# 🛡️ 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  GES: `
Task: Execute the [GES] Growth & Exit Strategy audit.

Objective:
1. Audit based on "IRSC-GES Checklist".
2. Search Investor Presentation, Earnings Calls, Market Research.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (+): +1
False (-): -1
N/A (0): 0
Range: 0 to 100

Checklist (IRSC-GES):

I. 成長引擎
1. TAM 擴張: Total Addressable Market expanding?
2. 跨國擴張: Successful entry into new geos?
3. 產品線延伸: New products contributing >10% rev?
4. 併購整合: M&A accelerating growth (not just adding rev)?
5. 價格提升: Able to raise prices > inflation?
6. 銷售渠道: Channel partner efficiency increasing?
7. 客群滲透: Deepening wallet share in existing clients?
8. 創新速度: Time-to-market faster than peers?
9. 數位轉型: Digital sales % increasing?
10. 市場份額: Gaining share from incumbents?

II. 資本配置
11. 投資回報: ROIC > WACC?
12. 股息成長: Dividend CAGR > 5%?
13. 庫藏股: Opportunistic buybacks at fair value?
14. 債務去槓桿: Paying down debt ahead of schedule?
15. capex 紀律: CapEx focused on growth (not maintenance)?
16. 現金儲備: Sufficient dry powder for M&A?
17. 非核心剝離: Divesting low-margin units?
18. 稅務優化: Effective tax rate optimization?
19. 股權激勵: SBC aligned with shareholder value?
20. 資本結構: Optimal Debt/Equity mix?

III. 退場與估值
21. 估值吸引力: PEG Ratio < 1.5?
22. 被收購潛力: Strategic asset for tech giants?
23. 私有化機率: Cash flow stable enough for LBO?
24. 流動性: Daily trading volume sufficient for institutions?
25. 分析師覆蓋: Covered by major banks?
26. 納入指數: Part of major indices (S&P/MSCI)?
27. 重組催化劑: Spin-off potential unlocking value?
28. 經營權爭奪: Activist interest likely?
29. 品牌價值: Brand equity increasing (Interbrand etc)?
30. 稀缺性: Unique asset in the sector?

Response Template:
# 🚀 [Company Name] - 成長與估值 (GES)
**資料來源：** [Year] Investor Presentation

### 1. 詳細評分清單
(List 1-30 items)

### 2. 最終得分計算
* **起始分數 (Base):** 50
* **符合 (+):** [Count_True]
* **不符 (-):** [Count_False]
* **無數據 (0):** [Count_NA]

# 💰 總分: [Calculated_Score] / 100

### 3. 指標小結
`,

  FINAL: `
Task: Synthesize the 8 dimension reports into a Final Investment Report.
Output Language: Same as input.

Structure:

# 🏆 [Company Name] - IRSC Investment Rating Analysis

## 🎯 Executive Summary
* **Total Score:** [Average of 8 Dimensions] / 100
* **Rating:** (S: 80+, A: 70-79, B: 60-69, C: <60)
* **Verdict:** (Strong Buy / Buy / Hold / Sell / Avoid)
* **One-Line Thesis:** [Key reason for the rating]

## 📊 Dimension Breakdown
1. **ECQ (Earnings Quality):** [Score] - [Brief Comment]
2. **MMP (Moat):** [Score] - [Brief Comment]
3. **UEE (Efficiency):** [Score] - [Brief Comment]
4. **GDI (Governance):** [Score] - [Brief Comment]
5. **TPM (Tech Momentum):** [Score] - [Brief Comment]
6. **SRR (Sustainability):** [Score] - [Brief Comment]
7. **ERE (Resilience):** [Score] - [Brief Comment]
8. **GES (Growth):** [Score] - [Brief Comment]

## 💡 Key Strengths (3-5 Points)
* [Strength 1]
* [Strength 2]

## ⚠️ Key Risks (3-5 Points)
* [Risk 1]
* [Risk 2]

## 🔮 Valuation & Outlook
* **Valuation Check:** [Undervalued / Fair / Overvalued] based on simple metric check.
* **12-Month Outlook:** [Positive / Neutral / Negative]

---
**Disclaimer:** This report is AI-generated for informational purposes only (IRSC-Analyst v1.0). Not financial advice.
  `
};
