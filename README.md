# 🏗️ ConstructionIQ

**ConstructionIQ** is a modular, full-stack platform designed to streamline and optimize construction site management. It leverages microservice architecture for scalability and maintainability. Each microservice focuses on a core domain of the construction lifecycle, and the frontend offers both administrative and user-facing interfaces.

---

## 🚀 Tech Stack

### 🧠 Backend

* **Java 17**, **Spring Boot**
* **Spring Cloud**, **Spring Security**
* **Keycloak** for Identity and Access Management
* **MySQL**, **JPA/Hibernate**
* **Eureka Server**, **Spring Cloud Gateway**

### 🎨 Frontend

* **Angular 16**
* Tailored dashboards for Admin and Users

---

## 🧩 Microservices

| Microservice       | Description                                             |
| ------------------ | ------------------------------------------------------- |
| `User-Domain`      | Handles user management & authentication using Keycloak |
| `Project-Domain`   | Manages projects, tasks, and deadlines                  |
| `Complaint-Domain` | Users can file and track site complaints                |
| `Finance-Domain`   | Manages budgeting and financial operations              |
| `Inventory-Domain` | Tracks stock, tools, and inventory                      |
| `Safety-Domain`    | Provides real-time safety dashboards                    |
| `Meeting-Domain`   | Schedules meetings, agendas, and participants           |

---

## 🔐 Authentication

* Centralized authentication and role-based access via **Keycloak**.
* Integrated with the User-Domain microservice.
* Uses JWT tokens for secure communication between services.

---

## 🖥️ How to Run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/ConstructionIQ.git
   ```

2. **Run Keycloak Server**

   * Set up a realm, client, and roles (`ADMIN`, `USER`, etc.).
   * Import initial config if needed.

3. **Start Eureka & Gateway**

   ```bash
   cd Backend/Server
   ./mvnw spring-boot:run
   ```

4. **Start each Microservice**
   Navigate into each microservice directory and run:

   ```bash
   ./mvnw spring-boot:run
   ```

5. **Run Frontend**

   ```bash
   cd Frontend/Dashboard
   npm install
   ng serve
   ```

---

## 📂 Folder Structure (Simplified)

```

```

---

## 🛠️ Contributors

* 👷 Project Lead: \[Your Name]
* 🧑‍💻 Backend Devs: \[Names]
* 🎨 Frontend Devs: \[Names]

---

