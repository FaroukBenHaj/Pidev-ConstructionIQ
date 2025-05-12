# 🏗️ Stock Management – ConstructionIQ

The **Stock Management** module of **ConstructionIQ** streamlines and optimizes the management of construction materials. It ensures efficient tracking of stock levels, material costs, and usage, while leveraging **machine learning** to classify materials for better decision-making.

---

## 🚀 Overview

This module is designed to:

* ✅ Track and manage the availability of construction materials
* 🧠 Classify materials into groups using **K-means clustering**
* 📊 Provide real-time stock analysis and smart alerts
* 📝 Generate PDF reports with insights and recommendations

---

## 🧠 Features

### 1. Material Management

* Store material details (name, cost, unit of measure)
* Track quantities for precise inventory management
* Link materials to multiple stocks for comprehensive allocation insights

### 2. Stock Tracking

* Monitor stock levels across multiple projects
* Automatically update stock statuses: `CRITICAL`, `ALERT`, `OK`
* Ensure materials are replenished as needed

### 3. K-means Classification

* Automatically cluster materials based on cost, quantity, and usage
* Highlight materials with similar consumption trends
* Prioritize restocking for critical material groups

### 4. PDF Report Generation

* Generate comprehensive PDF reports with:

  * Total stock value overview
  * Material statuses
  * Depletion date projections and order recommendations
  * Visual charts (stock status, clustering results)

### 5. Real-time Alerts

* Instant alerts for low or critical stock levels
* Data-driven ordering recommendations

---

## 🛠️ Tech Stack

### Backend

* **Java 17**, **Spring Boot**, **Spring Cloud**, **Spring Security**
* **Keycloak** for Identity and Access Management
* **MySQL**, **JPA/Hibernate**
* **Eureka Server**, **Spring Cloud Gateway**

### Frontend

* **Angular 16**
* User and Admin dashboards

### Machine Learning

* **K-means Clustering** for automated material classification

---

## ⚙️ Prerequisites

Before running the module, ensure the following tools are installed and configured:

* **Java 17+**
* **Maven**
* **Node.js** & **Angular CLI**
* **Keycloak** server for authentication

---
