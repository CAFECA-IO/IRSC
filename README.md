# iSunFA - IRSC Investment Rating Analyst

[![Project Status](https://img.shields.io/badge/Status-Active-success.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

**Web URL:** [irsc.isunfa.com](https://irsc.isunfa.com)

iSunFA (IRSC Analyst) is an advanced AI-powered investment rating analysis tool designed to perform comprehensive corporate audits across 8 key dimensions. Powered by Google's Gemini models, it synthesizes vast amounts of financial and market data into actionable investment insights.

## 🚀 Features

- **8-Dimension Comprehensive Audit**:
  - **ECQ**: Earnings & Cash Quality
  - **MMP**: Moat & Market Position
  - **UEE**: Unit Economics & Efficiency
  - **GDI**: Governance, Disclosure & Integrity
  - **TPM**: Technology & Product Momentum
  - **SRR**: Sustainability & Regulatory Resilience
  - **ERE**: External Risk Resilience
  - **GES**: Growth & Exit Strategy
- **Final Investment Report**: Synthesizes all dimensions into a final score, rating (S/A/B/C), and investment verdict.
- **Multilingual Support**: Full support for Traditional Chinese (ZH-TW), English (EN), Japanese (JA), and Korean (KO).
- **History Tracking**: Automatically saves analysis history locally and supports global history viewing.
- **Interactive UI**: Real-time progress tracking with a modern, responsive interface including Radar Charts for score visualization.

## 🛠️ Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
- A [Google Gemini API Key](https://aistudio.google.com/app/apikey)

## 📦 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/CAFECA-IO/IRSC.git
    cd IRSC
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:
    Create a `.env.local` file in the root directory and add your Gemini API key:
    ```env
    GEMINI_API_KEY=your_actual_api_key_here
    ```

## ▶️ Running the Application

### Development Mode
To run the application locally in development mode with hot-reloading:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Production Build
To build and start the application for production:

```bash
npm run build
npm start
```

## 📖 Usage Guide

1.  **Enter Company Name**: On the homepage, type the name of the company you want to analyze (e.g., "Apple", "TSMC").
2.  **Start Analysis**: Click "Analyze" to begin the 8-step audit process. You can stop the process at any time.
3.  **View Progress**: The tool will sequentially generate reports for each dimension. You can view intermediate results by clicking on the dimension tabs.
4.  **Final Report**: Once all dimensions are complete, a "Final Report" is generated with a total score and investment thesis.
5.  **Share**: You can share the final report using the generated unique link.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.
