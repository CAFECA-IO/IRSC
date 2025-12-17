export const GDI = `
Task: Execute the [GDI] Governance, Disclosure & Integrity audit.

Objective:
1. Audit based on "IRSC-GDI Advanced Edition).
2. Search Annual Reports, Proxy Statements, and Legal filings.
3. Calculate the score.

Scoring Algorithm:
Base Score: 50
True (Pass): +0.5
False (Fail): -0.5
N/A (No Data): 0
Range: 0 to 100

Checklist (IRSC-GDI Advanced Edition)
I. 董事會結構與獨立性 (Board Structure & Independence)
1. 獨董過半: Is the number of independent directors greater than 50% of the board?
2. 權力分立: Are the roles of Chairman and CEO held by different individuals?
3. 審計獨立: Does the board have an Audit Committee composed entirely of independent directors?
4. 任期合理: Is the average tenure of board members within a reasonable range (e.g., 3-9 years)?
5. 勤勉出席: Has the average attendance rate of board members been above 90% over the past year?
6. 薪酬獨立: Is there a Compensation Committee led by independent directors?
7. 提名公正: Is there a Nomination Committee to ensure fair director selection?
8. 成員多元: Do board members possess diverse backgrounds (gender, expertise, nationality, etc.)?
9. 獨董中立: Are independent directors free from family or business ties to major shareholders?
10. 監督機制: Is the company free from "poison pill" provisions or other mechanisms that hinder market oversight?

II. 管理層誠信與穩定性 (Management Integrity & Stability)
11. CEO 誠信: Has the current CEO been free from securities fraud or breach of trust lawsuits in the past 5 years?
12. 團隊穩定: Is the retention rate of the core C-Level management team above 70% over the past 3 years?
13. 道德承諾: Has management publicly committed to high standards of ethical conduct?
14. 專業治理: Do founders or family members refrain from excessive interference in daily professional management decisions?
15. 無內線案: Has management been free from major insider trading scandals in the past 5 years?
16. 溝通意願: Does the management team regularly answer investor questions in person at public events?
17. 財報紀錄: Has management never been penalized by regulators for financial statement fraud?
18. 背景真實: Are the educational and professional backgrounds of senior executives consistent with public disclosures?
19. 人事穩定: Has management avoided frequent, unexplained departures (e.g., CFO changing twice a year)?
20. 內稽獨立: Does the company have an independent internal audit department that reports directly to the board?

III. 財務揭露品質 (Financial Disclosure Quality)
21. 意見無虞: Have financial statements received an "Unqualified Opinion" from auditors for the past 5 years?
22. 會計聲譽: Is the auditing firm one of the "Big 4" or a top-tier local firm?
23. 財報準確: Has the company avoided restating financial statements in the past 3 years?
24. 申報守時: Does the company file quarterly and annual reports on time without delay?
25. 附註易讀: Are financial statement footnotes clear and easy to understand without excessive jargon?
26. 調節說明: Does the company proactively disclose Non-GAAP reconciliation tables and explain differences clearly?
27. 認列政策: Are revenue recognition policies clearly disclosed and compliant with accounting standards?
28. 週轉異常: Are inventory and accounts receivable turnover days free from abnormal lengthening?
29. 簽證穩定: Has the company avoided frequent changes of auditing firms (e.g., twice in 3 years)?
30. 表外揭露: Does the financial report detail off-balance sheet assets and liabilities?

IV. 股權結構與內部人持股 (Shareholding Structure)
31. 股權平等: Does the company use a "one share, one vote" system (no dual-class structures)?
32. 持股信心: Is insider ownership stable or increasing over the past 12 months?
33. 質押風險: Is the pledge ratio of directors' and supervisors' holdings below 20%?
34. 機構持股: Do the top ten shareholders include reputable long-term institutional investors?
35. 無拋售潮: Has the company avoided massive sell-offs (e.g., >10%) by insiders?
36. 控股透明: Does the controlling shareholder avoid using complex cross-shareholding structures to hide actual control?
37. 回購落實: Are share buyback programs actually executed rather than just announced?
38. 交易申報: Are insider trading declarations timely and transparent?
39. 公私分明: Do founders or major shareholders avoid mixing private companies with the listed company's operations?
40. 流通性佳: Is share ownership not overly concentrated (ensuring reasonable float/liquidity)?

V. 關係人交易 (Related Party Transactions)
41. 關係交易少: Is the proportion of related party transactions to total revenue less than 10%?
42. 審查程序: Are all major related party transactions reviewed and approved by the Audit Committee?
43. 定價公允: Is the pricing of related party transactions proven to follow the Arm's Length Principle?
44. 資金借貸: Does the company avoid lending large sums to directors, executives, or major shareholders?
45. 資產買賣: Does the company avoid buying overvalued assets from related parties?
46. 背書保證: Does the company avoid providing high-value guarantees or endorsements for related parties?
47. 對象揭露: Is the disclosure of the nature and counterparties of related party transactions detailed?
48. 供應獨立: Are major suppliers or customers not private companies owned by major shareholders?
49. 資產移轉: Does the company avoid frequent asset divestitures or acquisitions via related parties?
50. 無輿論疑慮: Is the company free from specific allegations by media or short-sellers regarding related party transactions?

VI. 股東權益與股利政策 (Shareholder Rights & Capital Allocation)
51. 股利政策: Does the company have a clear and public dividend policy?
52. 發放紀錄: Has dividends been paid consistently over the past 5 years without unexplained interruptions?
53. 配息永續: Is the Payout Ratio maintained within a sustainable range (not borrowing to pay dividends)?
54. 股東參與: Are the timing and location of shareholder meetings convenient for shareholder participation?
55. 電子投票: Is an electronic voting mechanism provided for shareholder meetings?
56. 提案權利: Does the corporate charter protect the right of minority shareholders to make proposals?
57. 防範稀釋: Does the company avoid issuing excessive convertible bonds that dilute equity?
58. 資金用途: Do capital increase plans (SPO) have clear and beneficial explanations for use of funds?
59. 國際溝通: Does the company hold earnings calls and communicate with international investors in English?
60. 投資人揭露: Does the website have a dedicated Investor Relations section that is updated in real-time?

VII. 高階薪酬合理性 (Executive Compensation)
61. 長期獎勵: Does the executive compensation structure include long-term performance incentives (e.g., restricted stock)?
62. 薪酬連動: Is the growth in compensation roughly aligned with the growth in company profits?
63. 薪酬倍數: Is the ratio of CEO pay to median employee pay within a reasonable industry range?
64. 共體時艱: Do executives take pay cuts or forgo bonuses when the company operates at a loss?
65. 追回機制: Does the compensation policy include a "Clawback Provision"?
66. 薪酬評估: Does the Compensation Committee hire external consultants to benchmark pay levels?
67. 績效指標: Do executive KPIs include ESG or operational metrics, not just stock price?
68. 酬勞揭露: Is director and supervisor compensation approved by shareholders and detailed in disclosures?
69. 津貼合理: Does the company avoid providing excessive non-monetary perks (e.g., private jets)?
70. 離職條款: Are "Golden Parachute" severance terms not overly generous?

VIII. 法規遵循與訴訟風險 (Legal & Regulatory Compliance)
71. 違規紀錄: Has the company received no major demerits or warnings from the stock exchange in the past 3 years?
72. 反壟斷: Is the company free from major antitrust investigations or fines?
73. 智財風險: Is the company free from major intellectual property infringement losses?
74. 環安紀錄: Has the company avoided huge fines for environmental pollution or labor safety issues?
75. 舉報機制: Does the company have an anonymous and protected internal whistleblower mechanism?
76. 稅務合規: Is the company's tax filing compliant, with no major tax evasion controversies?
77. 產品安全: Has the company avoided massive product recalls or serious safety incidents?
78. 黑名單: Is the company not listed on government procurement blacklists or sanctions lists?
79. 海外合規: Do subsidiaries or overseas branches also comply with local regulations?
80. 法務決策: Is the General Counsel a core member of the senior decision-making team?

IX. 資訊透明度與溝通 (Transparency & Communication)
81. ESG 報告: Does the company regularly publish a CSR or Sustainability (ESG) Report?
82. 報告查證: Is the report assured by an independent third-party organization?
83. 危機溝通: Does the company issue clarifications within 24 hours when facing major negative news?
84. 回應機制: Is the investor relations contact channel accessible and responsive?
85. 資料保存: Does the website provide full financial reports and presentation downloads for at least the past 5 years?
86. TCFD 揭露: Does the company actively disclose climate change-related risks (TCFD)?
87. 供應鏈管理: Does the company clearly disclose audit standards for supply chain management?
88. 預期溝通: Does the company communicate reasonably regarding analyst estimate discrepancies?
89. 風險誠實: Does the company honestly disclose operational challenges and risks, not just good news?
90. 雙語資訊: Is information disclosure available in internationally common languages (usually English)?

X. 歷史誠信紀錄 (Historical Integrity Track Record)
91. 下市風險: Has the company never faced a delisting crisis due to scandals since its inception?
92. 過往紀錄: Has the current management team never served as executives in other bankrupt or fraudulent companies?
93. 反貪腐: Has the company never been prosecuted for bribing officials (e.g., FCPA violations)?
94. 銀行信用: Is the credit record with banks good (no default history)?
95. 輿論評價: Is the historical media sentiment regarding the company's governance generally positive?
96. 付款誠信: Has the company avoided controversies involving malicious delays in payments to suppliers?
97. 承諾兌現: Is the execution rate of past share buyback promises higher than 80%?
98. 輸送歷史: Is there no historical record of using subsidiaries for profit tunneling?
99. 股權和諧: Has there been no fierce battle for control among major shareholders?
100. 治理模範: Has the company been included in relevant corporate governance indices for a long time (>5 years)?

Response Template:
# 🛡️ [Company Name] - 治理誠信 (GDI)
**資料來源: ** [Year] Annual Report / Proxy

### 1. 詳細評分清單
(List 1-100 items)

### 2. 最終得分計算
* **起始基準分 (Base):** 50
* **符合 (+0.5):** [Count_True]
* **不符 (-0.5):** [Count_False]
* **無數據 (0):** [Count_NA]

# ⚖️ 總分: [Calculated_Score] / 100

### 3. 指標小結
`;
