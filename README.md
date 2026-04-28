# 🚀 SaaS Analytics Platform (Node.js + TypeScript + FastAPI)

Distributed backend built with **Node.js (TypeScript)** and **Python (FastAPI)**, focused on user management, business analytics, and metrics forecasting.

🧠 Business Case

A sales analytics platform designed to help companies:

Track sales performance
Analyze pipeline efficiency
Predict future revenue using machine learning
Improve decision-making through data insights

This project demonstrates how backend systems support data-driven business decisions in SaaS environments.

## 🎯 Purpose

This platform simulates a real-world SaaS system that provides:

* User and role management
* Organizational hierarchies (managers)
* Authentication and authorization (JWT)
* Metrics visualization (dashboard)
* Data prediction (forecasting)

## 🏗️ Architecture

The system follows a decoupled microservices-based architecture.

### 🔄 Flow

Frontend → Node.js API → Database
                     → FastAPI (Forecast Engine)
                     → External Services

## ⚙️ Technologies

### Core Backend

* Node.js
* TypeScript
* Express
* Sequelize ORM

### Microservice

* Python
* FastAPI
* Machine Learning (Forecasting)

### Database

* PostgreSQL / MySQL

### Other

* JWT Authentication
* Clean Architecture
* REST APIs

## 👥 User Management

### Features

* User CRUD operations
* Hierarchical roles
* Manager assignment
* Business validations

### Implemented Rules

* Unique email validation (Service + DB)
* Email format validation (Domain)
* Role change restrictions (e.g., admin protection)
* Manager validation based on hierarchy

## 🧠 Organizational Hierarchy

Defined as:
DIRECTOR → MANAGER → SALES

## 📊 Dashboard & Analytics

The system includes a metrics module for dashboard visualization.

### Features

* User-based KPIs
* Pipeline stage distribution
* Trend analysis over time

### Characteristics

* Parallel execution for optimization
* Aggregated data ready for frontend
* Multi-tenant support (user-based filtering)

## 🤖 Forecasting (Python Microservice)

The platform includes a **FastAPI** microservice responsible for metrics prediction.

### Flow

Node.js API → FastAPI → Prediction → Response

## 🔐 Authentication & Authorization

* JWT Authentication
* `authenticate` middleware
* Role-based `authorize` middleware

## 📦 Installation

git clone <repo>
cd project
npm install

## ▶️ Run

### Node.js API

npm run dev

### FastAPI (forecast)

uvicorn main:app --reload

## 🧪 Best Practices Implemented

* Clean Architecture
* Separation of Concerns
* DTO Pattern
* Repository Pattern
* Centralized error handling
* Domain validations
* Optimized queries (`Promise.all`)
* Decoupled microservices

## 🚀 Roadmap

* CI/CD pipeline
* Automated testing (unit + integration)
* Caching (Redis)
* Event-driven architecture (Kafka)

## 👨‍💻 Author

Project focused on demonstrating:

* Real-world backend system design
* Multi-technology integration
* Application of Machine Learning in business
* Scalability and best practices

