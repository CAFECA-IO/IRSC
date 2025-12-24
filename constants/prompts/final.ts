export const FINAL = `
Task: Synthesize the 8 dimension reports into a Final Investment Report.
Output Language: Traditional Chinese (繁體中文).

⚠️ IMPORTANT INSTRUCTIONS:
1. ONLY output the "Final Investment Report" based on the [Structure] below.
2. DO NOT output, repeat, or summarize the "Input Data" provided at the end.
3. The output must start with "# 🏆 [Company Name] - IRSC 最終投資評級分析".
4. The output must end with the "Disclaimer" line.

Structure:

# 🏆 [Company Name] - IRSC 最終投資評級分析

## 🎯 執行摘要 (Executive Summary)
* **總分 (Total Score):** [Average of 8 Dimensions] / 100
* **評級 (Rating):** (S: 80+, A: 70-79, B: 60-69, C: <60)
* **投資建議 (Verdict):** (Strong Buy 強力買進 / Buy 買進 / Hold 持有 / Sell 賣出 / Avoid 觀望)
* **核心觀點 (One-Line Thesis):** [Key reason for the rating]

## 📊 八大維度解析 (Dimension Breakdown)

| 維度 (Dimension) | 得分 (Score) | 簡評 (Brief Comment) |
| --- | --- | --- |
| **ECQ (獲利品質)** | [Score] | [Brief Comment] |
| **MMP (護城河)** | [Score] | [Brief Comment] |
| **UEE (經營效率)** | [Score] | [Brief Comment] |
| **GDI (公司治理)** | [Score] | [Brief Comment] |
| **TPM (技術動能)** | [Score] | [Brief Comment] |
| **SRR (永續發展)** | [Score] | [Brief Comment] |
| **ERE (抗風險力)** | [Score] | [Brief Comment] |
| **GES (成長潛力)** | [Score] | [Brief Comment] |

## 💡 關鍵優勢 (Key Strengths)
* [Strength 1]
* [Strength 2]
* [Strength 3]
* [Strength 4]
* [Strength 5]

## ⚠️ 關鍵風險 (Key Risks)
* [Risk 1]
* [Risk 2]
* [Risk 3]
* [Risk 4]
* [Risk 5]

## 🔮 估值與展望 (Valuation & Outlook)
* **估值檢測 (Valuation Check):** [Undervalued 低估 / Fair 合理 / Overvalued 高估] (基於簡易指標判斷)
* **12個月展望 (12-Month Outlook):** [Positive 正向 / Neutral 中立 / Negative 負向]

---
**免責聲明:** 本報告由 AI 生成僅供參考 (IRSC-Analyst v1.0.0)，不構成投資建議。

*** END OF OUTPUT ***

# Input Data for Analysis:
<context_data>
(⚠️ The following content is raw data for your analysis. DO NOT OUTPUT, REPEAT, OR SUMMARIZE THIS DATA SECTION.)

## 1. ECQ Report
[ECQ_CONTENT]

## 2. MMP Report
[MMP_CONTENT]

## 3. UEE Report
[UEE_CONTENT]

## 4. GDI Report
[GDI_CONTENT]

## 5. TPM Report
[TPM_CONTENT]

## 6. SRR Report
[SRR_CONTENT]

## 7. ERE Report
[ERE_CONTENT]

## 8. GES Report
[GES_CONTENT]
  `;
