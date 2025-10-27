## 1. 🧩 Problem / Opportunity

Product managers are tasked with understanding customer sentiment to guide product decisions—but the process is fragmented and inefficient. Feedback arrives through multiple channels—email, social media, surveys—and compiling it is slow, manual, and siloed. This fragmentation prevents a unified view of what customers are truly experiencing.

Without integrated insights, product teams risk acting on incomplete or conflicting signals, leading to misaligned features, missed opportunities, and products that fail to resonate. A holistic, real-time understanding of customer sentiment is essential for designing solutions that reflect actual user needs.

**Who experiences this problem?**  
Product managers, CX leads, and cross-functional teams responsible for translating customer feedback into product strategy.

**Why it matters:**  
A 360° view of sentiment enables faster, more confident decision-making, improves alignment across teams, and ensures that product improvements are grounded in real user experiences.

---

## 2. 🎯 Goals and Success Metrics

**Primary Goal:**  
Help product managers synthesize customer feedback across platforms to surface common themes and generate actionable insights.

**Secondary Goals:**  
- Deliver tailored recommendations based on clustered feedback.  
- Automatically prioritize solutions by volume and severity of root issues.

**Success Metrics:**  
- ⏱️ **Time-to-resolution**: Reduction in time required to compile feedback and generate quarterly reports.  
- 📈 **Channel coverage**: Increase in the number of integrated feedback sources.  
- 💬 **Customer usage**: Growth in daily active users, satisfaction scores, and retention after feedback-driven releases.

---

## 3. 🧪 Prototype Overview

**GitHub Repository:** [Sentiment360SApp](https://github.com/sofiacalla/Sentiment360SApp.git)  
**Coded Prototype:** [Replit Sandbox](https://replit.com/join/ngdwjsmrgm-scallamandt)  
**Demo Video:** _[Add link here]_

Sentiment360 is a prototype app that aggregates customer feedback from Instagram, Facebook, X (formerly Twitter), email, and surveys to deliver a unified view of sentiment. It provides real-time insights, AI-generated recommendations, and dashboards to track impact over time.

### Key Tabs & Features

- **Customer Sentiment Dashboard**  
  Displays average sentiment, feedback volume, response rate, and active users. Includes regional sentiment analysis and time-filtered trend graphs.

- **Prioritization Engine**  
  Visualizes high-impact, low-effort recommendations using an impact vs. effort matrix. AI-generated insights guide product decisions.

- **Impact Tracker**  
  Measures success of CX initiatives with before/after comparisons. Tracks satisfaction, retention, resolution time, and feedback volume.

- **Configuration Tab (Data Management)**  
  Allows manual input of feedback and priority items. Supports ongoing refinement of insights and dashboard data.

---

## ⚠️ Known Shortcuts & Prototype Limitations

This prototype is illustrative and not production-ready. Key areas to be addressed by engineering include:

- **Data Pipeline**: Replace simulated snippets with real-time ingestion from channel APIs. Implement schema validation, enrichment, and transformation.
- **AI & Analytics**: Replace synthetic outputs with contextual, industry-specific insights. Ensure recommendations are actionable and auditable.
- **Metrics & Indicators**: Compute from canonical datasets. Make definitions configurable and transparent.
- **Configuration Management**: Enable secure data source authorization, CSV ingestion, and custom metric mapping.
- **Authentication & Access Control**: Implement user login and RBAC at both API and UI layers.
- **Interactive Visuals**: Link dashboard elements for dynamic filtering and consistent scoped queries.
- **Core Platform Services**: Add scalable infrastructure, security, observability, automation, and cost governance.

---

## 📣 Disclosure

This prototype is for demonstration purposes only. All insights, dashboards, and functionality must be implemented by the software engineering team. The prototype uses AI-generated data and may contain inconsistencies—for example, mismatches between metric values and visual indicators.

