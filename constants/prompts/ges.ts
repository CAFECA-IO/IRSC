export const GES = `
Task: Try to find information about the company and execute the [GES] Growth & Exit Strategy audit.

Objective:
1. Audit based on "IRSC-GES Advanced Edition".
2. Search Investor Presentation, Earnings Calls, Market Research.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-GES Advanced Edition)
## I. 市場潛力與定位 (Market Potential & Positioning)
1. 產業增速: Is the estimated CAGR of the company's primary industry greater than 5% for the next 5 years?
2. 剛性需求: Does the company's main product address a "must-have" need rather than just a "nice-to-have" option?
3. 市場規模: Is the Total Addressable Market (TAM) greater than $10 billion (or equivalent scale)?
4. 利基優勢: Is the company one of the top three leaders in its niche market?
5. 趨勢順風: Does the company benefit from current macro trends (e.g., AI, green energy, aging population)?
6. 市佔擴張: Has the company's market share shown an upward trend over the past year?
7. 定價能力: Does the company possess pricing power to raise prices without losing customers?
8. 護城河: Are entry barriers high enough to block small new competitors?
9. 藍海市場: Is the company entering an underserved "Blue Ocean" market?
10. 品牌認知: Is the company's brand awareness significantly higher than the industry average?
11. 轉換成本: Are switching costs high, making it difficult for customers to leave?
12. 網絡效應: Does the company have a clear network effect where value increases with more users?
13. 客戶體質: Does the company primarily serve growth-oriented clients rather than those in declining industries?
14. 抗衰退: Is the company resilient against severe negative impacts from economic cycles?
15. 政策紅利: Is the current regulatory environment favorable for the company's business expansion?
16. 替代威脅: Have competitors not yet launched alternative solutions with equal disruptive power?
17. 值鏈地位: Does the company occupy a high-margin strategic position within the industry value chain?
18. 依賴度: Is consumer reliance on this category increasing year by year?
19. 避免削價: Has the company successfully avoided price wars with low-cost competitors?
20. 機構展望: Is the long-term outlook for the industry generally "Positive/Buy" among market analysts?

## II. 商業模式可擴展性 (Scalability of Business Model)
21. 邊際成本: Do marginal costs decrease as revenue scale expands?
22. 輕資產: Does the company adopt an asset-light or platform business model?
23. 人均產值: Is revenue growth faster than headcount growth?
24. 複製擴張: Does the company have the ability to quickly "Copy & Paste" its business to new regions?
25. 訂閱收入: Does the company have a subscription (SaaS) or Annual Recurring Revenue (ARR) model?
26. 供應彈性: Is the supply chain flexible enough to support a doubling of orders?
27. 獲客成本: Has the Customer Acquisition Cost (CAC) remained stable or decreased over the past year?
28. 獲客效益: Is the ratio of Customer Lifetime Value (LTV) to CAC greater than 3:1?
29. 資本效率: Can the company drive the next phase of growth without massive Capital Expenditures (CapEx)?
30. 淨留存率: Is the Net Dollar Retention (NDR) greater than 100%?
31. 生態系: Has the company successfully built an ecosystem allowing third parties to assist in expansion?
32. 數位轉型: Is the level of digital transformation sufficient to support automated operations?
33. 交叉銷售: Does the company have a high success rate in cross-selling other product lines?
34. 營運槓桿: Is operating leverage evident (net income growing faster than revenue)?
35. 庫存效率: Is inventory turnover better than the industry average?
36. 併購整合: Has the company successfully integrated resources and accelerated growth through M&A?
37. 通路推力: Do partners or distributors actively promote the company's products?
38. 產能無虞: Have capacity bottlenecks been resolved to ensure no shortages?
39. 數據變現: Can data assets be converted into new monetization models?
40. 難以複製: Is the business model difficult to reverse engineer or easily copy?

## III. 產品創新與技術動能 (Innovation & Tech Momentum)
41. 新品影響力: Has the company launched market-impacting new products or services in the past year?
42. 研發投入: Is the R&D to revenue ratio maintained at a healthy or growing level?
43. 專利佈局: Does the company hold key technology patents with a continuous increase in quantity?
44. 新品營收: Do new products (launched within 3 years) account for more than 20% of total revenue?
45. 技術領航: Is the company considered a technology innovation leader in its field?
46. 迭代速度: Is the speed of product updates/iterations faster than competitors?
47. AI 應用: Are AI or machine learning technologies implemented to optimize products or user experiences?
48. 創新認證: Has the company received international innovation awards or certifications within the last two years?
49. 差異化: Does the product have unique differentiated features rather than being a homogeneous commodity?
50. 人才庫: Does the company possess a strong pool of software engineering or R&D talent?
51. 架構彈性: Is the technology architecture flexible enough to quickly adapt to new trends?
52. 用戶體驗: Is user feedback on the product's User Experience (UX) positive?
53. 殺手級應用: Does the company have a "Killer App" or core star product?
54. 標準制定: Is the company developing next-generation technology standards?
55. 客製能力: Is customization capability sufficient to meet high-end client needs?
56. 技術壁壘: Has a technology moat been built, making imitation extremely costly for rivals?
57. 產學合作: Does the company have technical collaborations with top academic institutions or tech giants?
58. 品質控管: Are product return or failure rates lower than the industry average?
59. 數據優化: Are product features continuously optimized through data analysis?
60. 創新文化: Is an innovation culture deeply rooted, encouraging internal entrepreneurship or experimentation?

## IV. 行銷、通路與全球化 (Marketing, Channel & Globalization)
61. 國際佈局: Has the company successfully entered two or more major international markets?
62. 海外佔比: Is the proportion of overseas revenue showing an upward trend year over year?
63. 多元通路: Does the company possess diversified sales channels (Online + Offline + Distributors)?
64. 社群互動: Is the growth rate of social media engagement or traffic positive?
65. 自然流量: Is organic search traffic for the brand increasing?
66. 在地化: Has a localization strategy been successfully implemented to adapt to different cultures?
67. 獨家合作: Have exclusive partnerships been established with major global distributors or platforms?
68. 行銷投報: Is the ROI of the marketing budget higher than the industry average?
69. 推薦指數: Is the Net Promoter Score (NPS) in a high range (e.g., > 30)?
70. 會員黏著: Does the company have a high-stickiness membership system or fan community?
71. 思想領袖: Is content marketing effectively used to establish thought leadership?
72. 市場反應: Can the company quickly respond to market sentiment and adjust marketing strategies?
73. 用戶成長: Are App downloads or Monthly Active Users (MAU) continuously growing?
74. 全球供應: Is the global supply chain layout sufficient to support cross-border business?
75. 網紅行銷: Are KOLs or opinion leaders effectively used to drive sales?
76. 精準行銷: Does the company possess precision marketing capabilities for different customer segments?
77. 客戶分散: Is the company free from over-reliance on a single large client (< 10%)?
78. 通路庫存: Is channel inventory healthy, with no channel stuffing?
79. 擴張藍圖: Is there a clear roadmap for global expansion over the next three years?
80. 品牌溢價: Does brand premium allow selling at higher prices than similar competitors?

## V. 財務成長動能 (Financial Growth Momentum)
81. 營收增長: Is the most recent quarter's revenue YoY growth positive?
82. 成長加速: Is the most recent quarter's revenue YoY growth higher than the average of the past four quarters?
83. 毛利趨勢: Is Gross Margin showing a flat or upward trend?
84. 營益擴張: Is Operating Margin showing an expansion trend?
85. 獲利槓桿: Is the EPS growth rate higher than the revenue growth rate?
86. 現金造血: Is Free Cash Flow positive and continuously growing?
87. 股東回報: Is Return on Equity (ROE) maintained above 15% or rising?
88. 負債可控: Is the debt ratio within a controllable range, not hindering borrowing for growth?
89. 超越通膨: Is the revenue growth rate higher than the inflation rate and industry average?
90. 未來營收: Is there significant growth in Backlog or Remaining Performance Obligations (RPO)?
91. 估值合理: Is the PEG ratio in a reasonable range (e.g., < 2 or lower than peers)?
92. 資本創造: Is ROIC higher than the Weighted Average Cost of Capital (WACC)?
93. 財務清白: Has there been no major financial restatement or scandal in the past three years?
94. 季增動能: Is Quarter-over-Quarter (QoQ) revenue momentum strong (considering seasonality)?
95. 資金效率: Is the Cash Conversion Cycle (CCC) shortening?
96. EBITDA 成長: Is the EBITDA growth rate impressive?
97. 財測上調: Has management's forward-looking guidance been raised?
98. 獲利紮實: Is profit quality solid (not relying on one-off non-operating income)?
99. 彈藥充足: Are cash reserves sufficient for emergencies or M&A?
100. 市值對齊: Is the growth in market capitalization aligned with performance growth?

Response Template:
# 🚀 [Company Name] - 成長與估值 (GES)
**資料來源: ** [Year] Investor Presentation

### 1. 詳細評分清單
(List 1-100 items)
* **[簡短指標文字]:** [分析細節] **符合/不符/無數據** **分數**

### 2. 最終得分計算
* **起始基準分 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

# 💰 總分: [Calculated_Score] / 100

### 3. 指標小結
`;
