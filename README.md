# 🏗️ Project Management – ConstructionIQ

The **ConstructionIQ** system empowers teams to manage construction projects efficiently. Track progress, assign tasks, visualize timelines via Gantt charts, and receive smart alerts for delays (e.g., weather disruptions). Generate detailed reports on budgets, progress, and more—all with automated email notifications.

---

## 🚀 **Overview**
This microservice enables teams to:  
✅ **Manage projects/tasks** via RESTful APIs  
📅 **Visualize timelines** with interactive Gantt charts  
🌦️ Get **weather-aware alerts** (OpenWeather API)  
📧 Receive **SMTP-powered personalized email notifications**  
📊 Generate analytics with dynamic charts
🤖 Predict project delays using a trained ML model
---

## 🧠 **Features**

### 1. **Project Management**
- Upload, edit, or archive projects
- Assign teams, budgets, and deadlines
- Monitor overall progress via charts

### 2. **Task & Timeline Tracking**
- Break projects into tasks with dependencies
- **Gantt chart visualization** for scheduling
- Mark tasks as *Completed/In Progress/Blocked*

### 3. **Smart Alerts**
- Weather-based delay predictions (API-integrated)
- OpenWeather API integration for delay forecasts
- Notifications for overdue tasks or budget overruns

### 4. **Reporting & Analytics**
- **PDF reports** with:
    - Budget vs. actual spending
    - Task completion rates
    - Risk assessments (delays, resource gaps)
- Charts for visual progress tracking

### 5. **Automated Emails**
- Daily/weekly project summaries
- Custom alerts for stakeholders

---

##🤖** ML-Based Delay Prediction**
To enhance risk management, the system integrates a Machine Learning component that predicts whether a project is likely to be delayed based on historical and contextual data.

✅ Model Used: Random Forest Classifier

🧠 Training Data: Historical construction project metrics ('quality_rating', 'delay_reason', 'conditions_meteo','estimated_budget', 'complexity',   'num_tasks', 'num_resources', ‘safety_incidents','planned_duration_days', 'cost_overrun' )

📦 Deployment: Implemented using Flask (Python) and exposed via a simple REST API

🔗 Integration: The main application sends project/task data to the prediction endpoint (/predict-delay)

📈 Output: Binary prediction (on-time ,delayed or In progress) along with a probability score

---
**Additional Tools**
- **Apache PDFBox** (report generation)
- **SendGrid/MailChimp** (email automation)

---
## 🧑💻 **Developed By**
**Daghfous Zeineb**  

