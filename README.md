# 🚀 SaaS Analytics Platform (Node.js + TypeScript + FastAPI)

Backend distribuido construido con **Node.js (TypeScript)** y **Python (FastAPI)**, enfocado en gestión de usuarios, analítica de negocio y predicción de métricas.

## 🎯 Propósito

Esta plataforma simula un sistema SaaS real que permite:
* Gestión de usuarios y roles
* Jerarquías organizacionales (managers)
* Autenticación y autorización (JWT)
* Visualización de métricas (dashboard)
* Predicción de datos (forecasting)

## 🏗️ Arquitectura

El sistema sigue una arquitectura desacoplada basada en microservicios:

🔄 Flow
Frontend → Node.js API → Database
                     → FastAPI (Forecast Engine)
                     → External Services

## ⚙️ Tecnologías

### Backend principal

* Node.js
* TypeScript
* Express
* Sequelize ORM

### Microservicio

* Python
* FastAPI
* Machine Learning (Forecasting)

### Base de datos

* PostgreSQL / MySQL

### Otros

* JWT Authentication
* Clean Architecture
* REST APIs

## 👥 Gestión de Usuarios

### Funcionalidades
* CRUD de usuarios
* Roles jerárquicos
* Asignación de managers
* Validaciones de negocio

### Reglas implementadas
* Email único (Service + DB)
* Validación de formato de email (Domain)
* Restricción de cambio de roles (ej: admin)
* Validación de manager según jerarquía

## 🧠 Jerarquía Organizacional
Definida mediante:
DIRECTOR → MANAGER → SALES

## 📊 Dashboard & Analytics

El sistema incluye un módulo de métricas para visualización en dashboards.

### Funcionalidades

* KPIs generales por usuario
* Distribución por etapas (pipeline)
* Tendencias en el tiempo

### Características

* Ejecución en paralelo (optimización)
* Datos agregados listos para frontend
* Multi-tenant (filtrado por usuario)

## 🤖 Forecasting (Microservicio Python)

La plataforma incluye un microservicio en **FastAPI** encargado de predicción de métricas.

### Flujo

Node.js API → FastAPI → Predicción → Respuesta

## 🔐 Autenticación y Autorización

* JWT Authentication
* Middleware `authenticate`
* Middleware `authorize` por roles


## 📦 Instalación

git clone <repo>
cd project
npm install

## ▶️ Ejecución

### Node.js API

npm run dev

### FastAPI (forecast)

uvicorn main:app --reload

## 🧪 Buenas prácticas implementadas

* Clean Architecture
* Separation of Concerns
* DTO Pattern
* Repository Pattern
* Manejo centralizado de errores
* Validaciones en dominio
* Queries optimizadas (Promise.all)
* Microservicios desacoplados

## 🚀 Próximas mejoras

* CI/CD pipeline
* Testing (unit + integration)
* Cache (Redis)
* Event-driven architecture (Kafka)

## 👨‍💻 Autor

Proyecto enfocado en demostrar:

* Diseño de sistemas backend reales
* Integración de múltiples tecnologías
* Aplicación de Machine Learning en negocio
* Escalabilidad y buenas prácticas
