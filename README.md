# 🚀 SaaS Analytics Platform (Node.js + TypeScript + FastAPI)

Distributed backend system demonstrating multi-implementation architecture using **Node.js (TypeScript)** and **Python (FastAPI)**, focused on user management, business analytics, and metrics forecasting.

```md
This architecture demonstrates how the same business domain can be implemented across different technologies while sharing a centralized analytical microservice.

---

## 🧠 Business Case

A sales analytics platform designed to help companies:

- Track sales performance  
- Analyze pipeline efficiency  
- Predict future revenue using machine learning  
- Improve decision-making through data insights  

This project demonstrates how backend systems support **data-driven business decisions** in SaaS environments.

---

## 🧠 Multi-Implementation Concept

This project represents a **Node.js (TypeScript)** implementation of a shared business domain.

The same domain is also implemented using:

- Java (Spring Boot)

This demonstrates how core business logic can remain **technology-agnostic**, independent of the backend stack.

---

## 🎯 Purpose

This platform simulates a real-world SaaS system that provides:

- User and role management  
- Organizational hierarchies (managers)  
- Authentication and authorization (JWT)  
- Metrics visualization (dashboard)  
- Data prediction (forecasting)  
- Integration with a frontend dashboard  

---

## 🏗️ Architecture

The system follows a **decoupled microservices architecture**:

```md
   Frontend (React)
      ↓
   Backend (Node.js / Java)
      ↓
   Database (PostgreSQL / MySQL)
      ↘
         FastAPI (Forecast Microservice)
```    

---

## 🔗 Repositories

### Frontend
- React Dashboard → https://github.com/ing-agarcia/react-saas-dashboard-analytics 

### Backend Implementations (Same Business Domain)

This platform provides **two independent backend implementations** of the same business logic:

- Node.js API (TypeScript) → https://github.com/ing-agarcia/saas-dashboard-api-node
- Java API (Spring Boot) → https://github.com/ing-agarcia/springboot-saas-api 

Both backends:
- Implement the same domain rules  
- Expose similar APIs  
- Can be used interchangeably by the frontend  

### Shared Microservice

- Forecast Microservice (FastAPI) → https://github.com/ing-agarcia/fastapi-forecast  

This service is consumed by both backend implementations for predictive analytics.

---

## 🧩 System Design Highlights

- Decoupled microservices architecture  
- Clear separation: domain, application, infrastructure  
- Integration between transactional and analytical systems  
- Scalable backend design  
- Optimized data fetching using parallel execution  

---

## ⚙️ Technologies

### Core Backend

- Node.js  
- TypeScript  
- Express  
- Sequelize ORM  

### Microservice

- Python  
- FastAPI  
- Machine Learning (Forecasting)  

### Database

- PostgreSQL / MySQL  

### Other

- JWT Authentication  
- Clean Architecture  
- REST APIs  

---

## 👥 User Management

### Features

- User CRUD operations  
- Hierarchical roles  
- Manager assignment  
- Business validations  

### Implemented Rules

- Unique email validation (Service + DB)  
- Email format validation (Domain)  
- Role change restrictions (e.g., admin protection)  
- Manager validation based on hierarchy  

---

## 🧠 Organizational Hierarchy

´´´bash
DIRECTOR → MANAGER → SALES
´´´

---

## 📊 Dashboard & Analytics

### Features

- User-based KPIs  
- Pipeline stage distribution  
- Trend analysis over time  

### Characteristics

- Parallel execution for optimization  
- Aggregated data ready for frontend  
- Multi-tenant support  

---

## 🤖 Forecasting (Python Microservice)

The platform includes a **FastAPI microservice** responsible for metrics prediction.

´´´bash
Node.js API → FastAPI → Prediction → Response
´´´

---

## 🔐 Authentication & Authorization

- JWT Authentication  
- `authenticate` middleware  
- Role-based `authorize` middleware  

---

## 📦 Installation

### Node.js API

```bash
git clone <repo>
cd node-api
npm install
npm run dev
```

### FastAPI (Forecast Microservice)

```bash
cd fastapi-forecast
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## 🧪 Best Practices Implemented

- Clean Architecture
- Separation of Concerns
- DTO Pattern
- Repository Pattern
- Centralized error handling
- Domain validations
- Optimized queries (`Promise.all`)
- Decoupled microservices

---

## 🚀 Roadmap

- CI/CD pipeline
- Automated testing (unit + integration)
- Caching (Redis)
- Event-driven architecture (Kafka)

---

## 🧠 Key Takeaway

This project showcases how to design and implement a scalable backend system that combines:

- Transactional data management
- Analytical processing
- Machine learning integration

All within a clean and maintainable architecture.

---

## 👨‍💻 Author

Project focused on demonstrating:

- Real-world backend system design
- Multi-technology integration
- Application of Machine Learning in business
- Scalability and best practices

