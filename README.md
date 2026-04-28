# SaaS Dashboard - Spring Boot API

Backend service built with Spring Boot that provides core business logic for a SaaS analytics platform.

This API is part of a multi-service architecture that powers a React-based SaaS dashboard with forecasting capabilities.

## 🎯 Project Purpose

This service handles the core backend logic for a SaaS dashboard system, including:

- User management and hierarchical relationships
- Role and group management
- Data aggregation for analytics dashboards
- Serving structured data for frontend visualization

It is designed to integrate with multiple services:

- React frontend dashboard
- FastAPI forecasting microservice (Python)

## 🚀 Features

- User Management (CRUD operations)
- Role & Group Management
- Hierarchical relationships (Manager → User structure)
- RESTful API design
- Clean layered architecture (Controller / Service / Repository)
- Scalable backend structure for SaaS applications

## 🏗️ Architecture Role

This service acts as the **core backend layer** in a distributed SaaS system:

- Handles business logic and data consistency
- Serves data to frontend dashboards
- Coordinates with external microservices

## 🛠️ Tech Stack

- Java 17+
- Spring Boot
- Spring Data JPA
- Hibernate
- Maven
- REST APIs