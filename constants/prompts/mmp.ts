export const MMP = `
Task: Execute the [MMP] Moat & Market Position audit.

Objective:
1. Audit based on "IRSC-MMP Advanced Edition".
2. Search market share data and analysis.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-MMP Advanced Edition)
## I. 市場佔有率與領導地位 (Market Share & Leadership)
1. 市場排名: Is the company among the top three players in its primary operating market?
2. 市佔趨勢: Has the company's market share shown continuous growth or stability over the past three years?
3. 規模差距: Is the company's revenue scale significantly larger than its closest competitor (e.g., > 1.5x)?
4. 利基壟斷: Does the company hold an absolute monopoly position (>50% market share) in a specific niche market?
5. 行業標準: Is the company widely regarded as the standard-setter or technology leader in the industry?
6. 滲透率: Has the company's core product penetrated more than 50% of the industry's customer base?
7. 擴張速度: Can the company enter emerging market regions faster than its competitors?
8. 逆勢增強: Does the company's market share increase during economic downturns (strength begets strength)?
9. 全球佈局: Is the company's global layout superior to peers, diversifying single-market risk?
10. 併購綜效: Has the company successfully consolidated its market position through M&A rather than just increasing revenue?
11. 不可替代: Is the company's flagship product difficult to replace with alternatives?
12. 價值鏈地位: Does the company occupy the most profitable position in the industry value chain?
13. 價格戰緩衝: Does the company possess sufficient market buffer to defend against price wars?
14. 超額成長: Is the company's growth rate higher than the overall industry average?
15. 系統重要性: Does the company hold a "too big to fail" status or critical importance to industry operations?

## II. 品牌優勢與定價權 (Brand & Pricing Power)
16. 定價能力: Does the company have the ability to raise prices without a significant decline in sales volume?
17. 毛利優勢: Is the company's Gross Margin consistently higher than the industry average?
18. 品牌認知: Does the company's brand have high "top-of-mind" awareness among consumers?
19. 自然銷售: Can the company maintain sales momentum without relying on heavy promotions?
20. 行銷效率: Is the ratio of advertising and marketing expenses to revenue lower than peers?
21. 高端定位: Does the company possess unique luxury attributes or high-end positioning?
22. 需求剛性: Is customer sensitivity to price changes low (Inelastic Demand)?
23. 成本轉嫁: Can the company fully pass on rising raw material costs to customers?
24. 品牌忠誠: Is brand loyalty (or Net Promoter Score) significantly higher than peers?
25. 信譽歷史: Does the company have a long brand history (e.g., > 20 years) and a good reputation?
26. 品類代稱: Has the brand become synonymous with the category (e.g., Google for search)?
27. 多品牌策略: Does the company have a successful sub-brand or multi-brand strategy to cover different segments?
28. 獲客成本: Is Customer Acquisition Cost (CAC) trending downward or lower than peers?
29. 議價能力: Can the company collect prepayments or subscription fees from customers?
30. 品牌溢價: Is there a distinct brand premium evident in the pricing?

## III. 轉換成本與客戶黏著度 (Switching Costs & Stickiness)
31. 轉換成本: Does switching to a competitor's product require high costs in time or money?
32. 深度整合: Is the company's product deeply integrated into the customer's key business processes?
33. 留存率: Does the company have a customer retention rate higher than 90%?
34. 學習曲線: Does the product have a steep learning curve that makes customers reluctant to switch?
35. 長約鎖定: Has the company signed long-term contracts (e.g., > 3 years) to lock in major customers?
36. 中斷風險: Would replacing the company's product pose a huge business interruption risk?
37. 服務生態: Does the company provide exclusive after-sales service that excludes third parties?
38. 系統相容: Is the product highly compatible with the customer's other systems and difficult to decouple?
39. 會員綁定: Has the company successfully bound users through membership or loyalty point systems?
40. 經常性營收: Does Recurring Revenue account for more than 50% of total revenue?
41. 流失率: Is the customer churn rate lower than the industry average?
42. 數據壁壘: Does the company possess accumulated data, meaning customers lose historical value if they leave?
43. 唯一供應: Is the company the "sole" certified supplier in the customer's supply chain?
44. 專有格式: Does the company lock in customers through proprietary formats or standards?
45. 升級路徑: Is the product upgrade path smooth, encouraging customers to continue using the next generation?

## IV. 成本優勢與規模經濟 (Cost Advantage & Economies of Scale)
46. 低造成本: Does the company possess a low-cost production process that is hard for peers to copy?
47. 營益優勢: Is the Operating Margin consistently better than peers?
48. 規模經濟: Does the company benefit from significant economies of scale?
49. 地理優勢: Does the company have unique location advantages (e.g., proximity to materials or customers)?
50. 物流網絡: Does the company own a proprietary logistics or distribution network that lowers transport costs?
51. 供應議價: Does the company have strong bargaining power over upstream suppliers?
52. 自有資產: Does the company own assets (mines, patents) ensuring low-cost raw materials?
53. 人均產值: Is Revenue per Employee higher than peers?
54. 垂直整合: Has the company effectively controlled costs through vertical integration?
55. 資金成本: Can the company finance at a lower cost of capital than peers?
56. 庫存效率: Is inventory turnover better than peers, reducing holding costs?
57. 自動化優勢: Does the company use automation or AI to significantly reduce labor costs?
58. 行銷 ROI: Is marketing efficiency (ROI) better than competitors?
59. 合規先發: Does the company have a first-mover advantage in compliance or environmental costs?
60. 折舊優勢: Does the company still produce efficiently after fixed assets are fully depreciated?

## V. 網絡效應與生態系 (Network Effects & Ecosystem)
61. 網絡價值: Does the product value increase exponentially as the number of users increases?
62. 雙邊市場: Does the company have a two-sided market advantage (buyers attract sellers and vice versa)?
63. 開發者生態: Has the company established an open developer ecosystem or third-party app store?
64. 平台標準: Has the platform become the communication or transaction standard in the industry?
65. 圍牆花園: Does the company possess a "walled garden" ecosystem that is distinct from rivals?
66. 數據飛輪: Can accumulated user data feed back into product optimization?
67. 結伴依賴: Do ecosystem partners rely on the platform for survival?
68. 社交連結: Is the social attribute strong, such that users lose connections if they leave?
69. 病毒擴散: Does the product have viral propagation characteristics?
70. 併購互補: Has the company strengthened network effects through strategic M&A?

## VI. 無形資產與進入門檻 (Intangible Assets & Barriers to Entry)
71. 專利保護: Does the company hold patents for key technologies with long validity periods?
72. 特許執照: Does the company hold government-issued franchises or scarce licenses?
73. 商業機密: Does the company possess hard-to-copy trade secrets?
74. 資本門檻: Do new entrants require extremely high capital expenditure to compete?
75. 法規護城河: Does the company face favorable regulatory protection?
76. 研發壁壘: Is the R&D investment amount so large that latecomers cannot catch up?
77. IP 版權: Does the company own exclusive IP licensing or content copyrights?
78. 認證門檻: Has the company passed extremely strict and time-consuming customer certifications?
79. 數據壟斷: Does the company possess monopolistic data assets?
80. 頂尖人才: Does the talent team include the top scientists or experts in the field?
81. 通路獨佔: Does the company have special channel exclusivity rights?
82. 防禦聲譽: Is the brand reputation sufficient to withstand low-price attacks from new entrants?
83. 法規趨嚴: Are regulatory thresholds in the industry rising, favoring existing large players?
84. 關鍵資源: Does the company own key resources unavailable to major competitors?
85. 政商關係: Does the company maintain good and compliant relationships with the government?

## VII. 產業競爭格局 (Competitive Landscape)
86. 產業成熟: Has the industry passed the cash-burning phase and entered a period of stable profitability?
87. 對手困境: Are major competitors facing financial difficulties or operational crises?
88. 整合者: Does the company play the role of a consolidator in the industry?
89. 理性競爭: Is the industry free from irrational price competition?
90. 技術佈局: Is the company positioned in next-generation technology earlier than rivals?
91. 技術穩健: Is the speed of technological change moderate, not instantly disrupting existing advantages?
92. 對手分散: Are most competitors smaller, fragmented operators?
93. 巨頭防禦: Can the company maintain its advantage when facing cross-border competition from tech giants?
94. 剛性抗壓: Is the industry a rigid demand sector, little affected by macroeconomic fluctuations?
95. 市場潛力: Does the primary market have high growth potential (Large TAM)?
96. 規則制定: Is the company able to define the rules of the game in the industry?
97. 顛覆防禦: Does the company have defensive strategies against disruptive innovation?
98. 供應鏈穩定: Is the supply chain stable and not easily cut off by geopolitics?
99. ESG 領先: Is the company leading peers in ESG to reduce future risks?
100. 護城河拓寬: Overall, will the company's moat widen over the next 5 years?

Response Template:
# 🏰 [Company Name] - 護城河與市場地位 (MMP)
**資料來源:** [Year] Annual Report

### 1. 詳細評分清單
(Iterate through all sections. PRESERVE the Section Headers (e.g., "## I. Title..."). Under each section, list the items in valid Markdown format.
Format: "[Number]. [Title]: [True/False/N/A]"
Example:
## I. Section Title
1. Title: True
2. Title: False
...
)

### 2. 最終得分計算
* **起始基準分 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

> 📈 **總分:** [Calculated_Score] / 100

### 3. 指標小結
`;
