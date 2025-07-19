# 💰 Demo Wallet API

Demo Wallet is a simple MVP backend service built with **Node.js**, **TypeScript**, **Knex.js**, and **MySQL** to simulate a mobile wallet system for a lending platform. The service allows users to create accounts, receive and transfer funds, and integrate with a blacklist service (Adjutor Karma) to block blacklisted users.

---

## 🚀 Features

* ✅ Create user accounts with KYC & document verification
* 💵 Fund wallet
* 🔁 Transfer funds between users
* 💸 Withdraw funds
* 🛑 Block blacklisted users from being onboarded
* 🧾 Transaction logging
* 📄 Swagger documentation

---

## ⚙️ Tech Stack

* Node.js (LTS)
* TypeScript
* Express
* MySQL
* Knex.js (ORM)
* Jest (Unit testing)
* Swagger (API docs)
* Dotenv

---

## 📁 Folder Structure

```bash

├── config
├── controllers
├── interfaces
├── services
├── routes
├── types
├── middlewares
├── utils
├── src
│   ├── migrations
│   ├── docs
├── tests
├── knexfile.ts
├── package.json
├── package-lock.json
├── .env
```

---

## 🔧 Setup Instructions

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/oladhimeji1/lendsqr-assessment.git
cd lendsqr-assessment
npm install
```

### 2. Environment Setup

Create a `.env` file and define:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=walletapp
PORT=4000
KARMA_API_KEY=your_adjutor_karma_key
```
My production credention
```
DB_HOST=sql8.freesqldatabase.com
DB_USER=sql8790845
DB_PASSWORD=BvCVu75p4S
DB_NAME=sql8790845
KARMA_API_KEY=sk_live_Z9lmBzJxMU4RmIBAJlS5Q2a7lix8X4bXZ0B0dDsj
PORT=8080

```

### 3. Run Migrations

```bash
npm run migrate
```

### 4. Start Server

```bash
npm run start
```

### 5. Access API Docs

Visit: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

---

## 📄 API Endpoints

| Method | Endpoint                     | Description          |
| ------ | ---------------------------- | -------------------- |
| POST   | /api/user/create             | Create user          |
| POST   | /api/wallets/:userId/fund    | Fund wallet          |
| POST   | /api/wallets/transfer        | Transfer to another  |
| POST   | /api/wallets/:userId/withdraw| Withdraw from wallet |

---

## 📊 ER Diagram

> Use [DBDesigner](https://app.dbdesigner.net/) to generate and link your ER diagram here.

![ER Diagram](https://dbdesigner.page.link/HBfJfirDjLXSCkr38)

---

## 🧪 Testing

Run all unit tests using:

```bash
npm run test
```

---

## 🧠 Design Considerations

* Proper use of service-controller separation
* DRY principles enforced
* Transaction-safe DB operations
* Validation and blacklisting via Adjutor Karma

---

## ✨ Author

Built by [Oladimeji Abdulrazaq](https://github.com/oladhimeji1/)

---
<!-- 
## 📜 License

This project is licensed for assessment purposes only. -->
