# 🧾 Employee Salary Management API

A production-ready RESTful API for managing employees, calculating salaries, and generating analytics.
Built as part of an engineering assessment with a strong focus on **Test-Driven Development (TDD)**, clean architecture, and real-world backend practices.

---

## 🚀 Features

### 👤 Employee Management

* Create employee
* Get employees (with pagination)
* Get employee by ID
* Update employee
* Delete employee

---

### 💰 Salary Calculation

* Country-based deductions:

  * 🇮🇳 India → 10%
  * 🇺🇸 USA → 12%
  * 🌍 Others → 0%
* Returns:

  * Gross salary
  * Deductions
  * Net salary

---

### 📊 Metrics & Analytics

* Salary metrics by **country**
* Salary metrics by **job title**
* Includes:

  * Minimum salary
  * Maximum salary
  * Average salary

---

### 📄 Pagination

Supports paginated employee listing:

```
GET /employees?page=1&limit=10
```

Response includes:

* Data array
* Total records
* Total pages

---

## 🛠 Tech Stack

* Node.js
* Express.js
* SQLite (in-memory for tests)
* Jest + Supertest (testing)
* Joi (validation)
* Winston (logging)

---

## 📂 Project Structure

```
/src
  /controller
  /services
  /routes
  /db
  /validations
  /logger
/tests
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```
git clone <your-repo-url>
cd salary-kata
```

---

### 2. Install dependencies

```
npm install
```

---

### 3. Run the server

```
npm run dev
```

---

### 4. Run tests

```
npm test
```

---

## 🔗 API Endpoints

### Employee CRUD

| Method | Endpoint       | Description               |
| ------ | -------------- | ------------------------- |
| POST   | /employees     | Create employee           |
| GET    | /employees     | Get employees (paginated) |
| GET    | /employees/:id | Get employee by ID        |
| PUT    | /employees/:id | Update employee           |
| DELETE | /employees/:id | Delete employee           |

---

### Salary

```
GET /employees/:id/salary
```

**Response:**

```json
{
  "gross": 50000,
  "deductions": 5000,
  "net": 45000
}
```

---

### Metrics

#### By Country

```
GET /employees/metrics/country/:country
```

#### By Job Title

```
GET /employees/metrics/jobTitle/:jobTitle
```

---

## 🧪 Testing Strategy

This project follows **Test-Driven Development (TDD)**:

1. Write failing test ❌
2. Implement minimal code ✅
3. Refactor ♻️

### Includes:

* Integration tests (API level)
* Unit tests (service layer with mocked DB)
* Edge case coverage

---

## 🧠 Architecture

```
Route → Controller → Service → DB
```

### Layers:

* **Controller**

  * Handles HTTP
  * Validation (Joi)
  * Logging (Winston)

* **Service**

  * Business logic
  * DB interaction

* **Database**

  * SQLite (in-memory for tests)

---

## 🔍 Logging

* Implemented using Winston
* Supports:

  * info
  * warn
  * error
* Structured logs for production readiness

---

## ⚠️ Validation

* Implemented using Joi
* Ensures:

  * Required fields
  * Data types
  * Value constraints

---

## 📌 Assumptions

* Salary is numeric (no currency conversion)
* Country/jobTitle are case-sensitive
* SQLite is sufficient for current scope

---

## 📈 Possible Improvements

* Add filtering & sorting
* Add authentication/authorization
* Replace SQLite with PostgreSQL
* Add Docker support
* Add request logging middleware

---

## 🤖 AI Usage

AI tools (ChatGPT) were used for:

* Debugging edge cases (SQLite mocking, async issues)
* Structuring service layer
* Improving test coverage
* Documentation assistance

All outputs were:

* Reviewed manually
* Tested thoroughly
* Refined for correctness

---

## 👨‍💻 Author

Udayaprakash

---

## ✅ Status

✔ Completed
✔ Fully tested
✔ Production-ready (within scope)

---
