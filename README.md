# 👤 User Domain Microservice – ConstructionIQ

This microservice manages user-related functionalities in the ConstructionIQ platform. It handles registration, authentication, roles, and permissions using **Keycloak** for Identity and Access Management (IAM).

## 🚀 Features

- User registration and authentication (via Keycloak)
- Role-based access control (admin, user, etc.)
- Secure endpoints with token validation
- Integration-ready with other ConstructionIQ microservices

## 🛡️ Authentication & Authorization

Authentication is handled via [Keycloak](https://www.keycloak.org/), an open-source Identity and Access Management solution.

- Token-based authentication (Bearer JWT)
- Integrated with Keycloak realm, clients, and roles
- All protected endpoints require a valid access token

### 2. Setup Keycloak

* Download from [[keycloak.org](https://www.keycloak.org/)](https://www.keycloak.org/)
* Create:

  * A Realm: `Esprit-project-realm`
  * A Client: `Pidev-ConstructionIQ`
  * Roles: `ADMIN`, `USER`
  * Users with assigned roles


## 🛠️ Tech Stack

- Java 17
- Spring Boot
- Spring Security
- Spring Data JPA
- Keycloak (OpenID Connect)
- PostgreSQL (or your DB of choice)

2. Setup Keycloak
Download from [keycloak.org](https://www.keycloak.org/)


