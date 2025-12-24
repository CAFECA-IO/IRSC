export const UEE = `
Task: Execute the [UEE] Unit Economics & Efficiency audit.

Objective:
1. Audit based on "IRSC-UEE Advanced Edition".
2. Search financial data and investor presentations.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-UEE Advanced Edition)
## I. 核心單位獲利能力 (Unit Profitability)
1. 高標毛利: Is the company's Gross Margin higher than the industry average?
2. 毛利趨勢: Has the Gross Margin shown an upward trend over the past 3 years?
3. 邊際貢獻: Is the Contribution Margin positive?
4. 單位獲利: Is the unit economic model profitable after deducting marketing and variable costs?
5. 售價能力: Has the Average Selling Price (ASP) of major products remained stable or increased in the past 12 months?
6. 規模效益: Is COGS per unit decreasing due to economies of scale?
7. 轉嫁能力: Does the company have the ability to pass on rising raw material costs to consumers (pricing power)?
8. 折扣管控: Is the Discount Rate showing a downward or stable trend?
9. 組合優化: Is the revenue share of high-margin products increasing?
10. 毛利穩定: Is the volatility of the Gross Margin lower than the industry average?
11. 軟體佔比: Is the proportion of software/service revenue (usually higher margin) increasing?
12. 優於對手: Is the company's Gross Margin higher than its largest competitor?
13. 庫存減損: Has the company avoided major gross margin sacrifices due to inventory write-downs?
14. 維護毛利: Is the Gross Margin for after-sales service or recurring revenue stable?
15. 採購優勢: Does supply chain bargaining power increase with purchasing volume?
16. 物流效率: Is the ratio of logistics and delivery costs to revenue decreasing year over year?
17. 低退貨率: Is the Return Rate lower than the industry average?
18. SKU 優化: Has the company successfully reduced the number of low-margin SKUs?
19. 現金毛利: Is the "FCF Margin" positive?
20. 拒絕價戰: Does the company avoid vicious price wars that sacrifice gross margin for revenue?

## II. 客戶獲取與終身價值 (CAC & LTV)
21. 黃金比例: Is the LTV/CAC ratio greater than 3x?
22. 回本速度: Is the CAC Payback Period less than 12 months?
23. 獲客成本: Is the Customer Acquisition Cost (CAC) showing a downward or flat trend?
24. 客單增長: Is the Average Revenue Per User (ARPU) showing YoY growth?
25. 淨留存率: Is the Net Dollar Retention (NDR) for existing customers greater than 100%?
26. 低流失率: Is the Churn Rate lower than the industry average?
27. 流失改善: Is the Churn Rate improving quarter over quarter?
28. 自然流量: Do organic traffic or organic users account for more than 50%?
29. 行銷槓桿: Is the ratio of marketing expenses to total revenue showing a downward trend?
30. 推薦營收: Is the revenue share from customer referrals significant?
31. 銷售升級: Is the success rate of Cross-selling or Up-selling improving?
32. 訂閱機制: Does the company have a high-conversion paid subscription membership mechanism?
33. 渠道分散: Is the company free from over-reliance on a single expensive advertising channel?
34. 搜尋熱度: Is the Brand Search Volume trend upward?
35. 滿意度高: Is the NPS score in the top 25% of the industry?
36. 大戶留存: Is the retention rate of high-value customers (Whales) higher than the overall average?
37. 獲客效率: Is the Magic Number (for SaaS) greater than 0.7?
38. 社群互動: Are social media engagement and conversion rates better than peers?
39. 新市場合理: Is the initial CAC for entering new markets within expectations?
40. 人均產出: Is Sales Productivity per employee increasing year over year?

## III. 營運效率與周轉 (Operational Efficiency)
41. 存貨周轉: Are Days Sales of Inventory (DSI) lower than the same period last year?
42. 庫存效率: Is the Inventory Turnover Ratio better than the industry average?
43. 應收效率: Is Days Sales Outstanding (DSO) stable or decreasing?
44. 現金循環: Is the Cash Conversion Cycle (CCC) shortening or better than peers?
45. 應付策略: Is Days Payable Outstanding (DPO) reasonably extended (showing strong bargaining power)?
46. 固資周轉: Is Fixed Asset Turnover improving?
47. 總資周轉: Is Total Asset Turnover showing an upward trend?
48. 費用管控: Is the Operating Expense ratio (OpEx as % of Revenue) decreasing year over year?
49. 營運槓桿: Is there obvious Operating Leverage (profit growth > revenue growth)?
50. 產能利用: Is idle capacity or asset utilization maintained at a high level?
51. 研發轉換: Is R&D investment translating into effective revenue from new products?
52. 管理費率: Is the ratio of G&A expenses to revenue controlled within a reasonable range?
53. 人均營收: Is Revenue per Employee growing year over year?
54. 人均獲利: Is Net Income per Employee showing positive growth?
55. 自動化率: Is automation technology effectively used to reduce the labor cost ratio?
56. 供應鏈分散: Is supply chain disruption risk diversified (no excessive reliance on a single supplier)?
57. 資本支出: Is the CapEx to revenue ratio stable and effective?
58. 現金品質: Is Operating Cash Flow (OCF) consistently greater than Net Income?
59. 訂單消化: Is the company free from an excessive Backlog that cannot be fulfilled?
60. 決策效率: Is the internal decision-making process evaluated as efficient?

## IV. 資本回報與結構 (Capital Efficiency)
61. 超額回報: Is Return on Invested Capital (ROIC) greater than WACC?
62. 股東回報: Has Return on Equity (ROE) averaged greater than 15% over the past 3 years?
63. 資產回報: Is Return on Assets (ROA) showing a stable or upward trend?
64. 同業領先: Does the company's ROIC rank in the top 20% of the industry?
65. 現金生成: Is Free Cash Flow generation capability strong (FCF/Net Income > 1)?
66. 健康負債: Is the Debt-to-Equity ratio at a healthy level (below industry average)?
67. 利息保障: Is the Interest Coverage Ratio greater than 5x?
68. 自體成長: Has growth been funded without diluting equity?
69. 配息基礎: Are dividends or buybacks based on healthy Free Cash Flow?
70. 再投資率: Does the Reinvestment Rate match the growth rate?
71. 併購回報: Is the historical return on M&A positive (no major goodwill impairment)?
72. 流動比率: Is the Current Ratio greater than 1 but not excessively high?
73. 速動比率: Is the Quick Ratio greater than 0.6 but not excessively high?
74. 配置清晰: Is the long-term capital allocation strategy clear and consistently executed?
75. 避免現增: Has the company avoided frequent equity financing (Cash Calls)?
76. 現金跑道: Is cash on hand sufficient to support operations for the next 18 months (if loss-making)?
77. 無形價值: Is the value of intangible assets (patents/trademarks) reflected in revenue?
78. 稅務籌劃: Is tax planning effectively used to improve net margin?
79. 資產優化: Do leasing and outsourcing strategies optimize the balance sheet?
80. 利益一致: Does management hold a significant amount of shares?

## V. 趨勢動能與規模化 (Momentum & Scalability)
81. 營收加速: Is the most recent quarter's revenue growth higher than the same period last year?
82. 獲利加速: Is the most recent quarter's EPS growth rate higher than the revenue growth rate?
83. 超越預期: Has the company met or exceeded market earnings expectations for 4 consecutive quarters?
84. 市場潛力: Is there still huge penetration space in the Total Addressable Market (TAM)?
85. 市場領導: Is the company the Market Leader in its niche?
86. 產品擴張: Is the company expanding into new product lines with higher margins?
87. 全球營收: Is the proportion of international revenue increasing?
88. 數位成效: Are the results of digital transformation visible in financial reports (e.g., increased e-commerce share)?
89. 對手退場: Are competitors exiting the market or losing market share?
90. 網絡效應: Does the technical moat deepen with scale?
91. 人才保留: Is the employee Turnover Rate lower than industry standards?
92. 機構增持: Is the company receiving continuous increased holdings from major institutional investors?
93. 綠色合規: Has the green transformation of the supply chain reduced long-term compliance costs?
94. 數據賦能: Does data analytics capability effectively reduce inventory obsolescence rates?
95. 活躍增長: Are DAU/MAU numbers on the platform growing continuously?
96. 使用深度: Is user time spent or usage depth on the platform increasing?
97. 通膨轉化: Does the company have the ability to convert inflation pressure into revenue growth?
98. 指引上修: Is the forward-looking Guidance in quarterly reports positive or upgraded?
99. 評級調升: Is the analyst rating trend for the company being upgraded?
100. 效率文化: Does the corporate culture support continuous efficiency optimization and innovation?

Response Template:
# 🏢 [Company Name] - 經營效率 (UEE)
**資料來源:** [Year] Annual Report

### 1. 詳細評分清單
(List 1-100 items. Output as a single continuous list. Use format "1. ", "2. ", etc.)

### 2. 最終得分計算
* **起始基準分 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

> 📈 **總分:** [Calculated_Score] / 100

### 3. 指標小結
`;
