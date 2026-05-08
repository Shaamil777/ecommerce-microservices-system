# 🛒 E-Commerce Microservices Backend

A production-ready microservices-based e-commerce backend built with **Node.js**, **Express**, **MongoDB**, and **Docker**. Features JWT authentication with refresh token rotation, role-based access control, and a clean API Gateway pattern.

---

## 📐 Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client                               │
│                   (Postman / Frontend)                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     API Gateway (:5000)                      │
│              Routes requests to microservices                │
│                   Swagger UI at /api-docs                    │
└─────┬──────────────────┬────────────────────┬───────────────┘
      │                  │                    │
      ▼                  ▼                    ▼
┌───────────┐    ┌──────────────┐    ┌──────────────┐
│   Auth    │    │   Product    │    │    Order     │
│  Service  │    │   Service    │    │   Service    │
│  (:5001)  │    │   (:5002)    │    │   (:5003)    │
└─────┬─────┘    └──────┬───────┘    └──┬───────┬──┘
      │                 │               │       │
      │                 │               │       │
      ▼                 ▼               ▼       │
┌───────────┐    ┌──────────────┐  ┌────────┐   │
│  authDB   │    │  productDB   │  │orderDB │   │
│ (MongoDB) │    │  (MongoDB)   │  │(Mongo) │   │
└───────────┘    └──────────────┘  └────────┘   │
                        ▲                       │
                        │    HTTP call          │
                        └───────────────────────┘
```

Each service has its own MongoDB database, enforcing data isolation between bounded contexts.

---

## 🧩 Services Overview

| Service | Port | Description |
|---------|------|-------------|
| **API Gateway** | 5000 | Single entry point for all client requests. Proxies to downstream services and hosts Swagger documentation. |
| **Auth Service** | 5001 | Handles user registration, login, JWT access/refresh tokens, logout, and token verification. |
| **Product Service** | 5002 | Manages product catalog with CRUD operations, pagination, and search. Admin-only creation. |
| **Order Service** | 5003 | Handles order creation and retrieval with product enrichment via inter-service communication. |

---

## 🔐 Authentication Flow

This project implements a **dual-token JWT authentication** system:

### Access Token Flow
1. User logs in with email/password → receives **access token** (15min) + **refresh token** (7 days)
2. Access token is sent in the `Authorization: Bearer <token>` header for protected routes
3. Each service independently verifies the JWT using a shared secret

### Refresh Token Flow
1. When access token expires, client sends refresh token to `POST /api/auth/refresh`
2. Server verifies the refresh token against the stored token in the database
3. If valid, a new access token is issued
4. The original refresh token remains valid until expiry or logout

### Logout & Token Invalidation
1. Client calls `POST /api/auth/logout` with the access token
2. Server clears the stored refresh token from the database
3. Any subsequent refresh attempts with the old token will fail
4. Access token remains valid until its natural expiry (15min)

```
Login Flow:
  Client → POST /api/auth/login → { accessToken, refreshToken }

Protected Request:
  Client → GET /api/orders (Bearer accessToken) → { orders }

Token Refresh:
  Client → POST /api/auth/refresh { refreshToken } → { accessToken }

Logout:
  Client → POST /api/auth/logout (Bearer accessToken) → invalidates refresh token
```

---

## 🔑 Role-Based Access Control

| Role | Permissions |
|------|------------|
| `user` | Register, login, create orders, view own orders, browse products |
| `admin` | All user permissions + create products |

---

## 🚀 Getting Started

### Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and Docker Compose
- [Node.js](https://nodejs.org/) v18+ (for local development without Docker)

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shaamil777/ecommerce-microservices-system.git
   cd ecommerce-microservices-system
   ```

2. **Set up environment variables**

   Each service has a `.env` file. For development, the defaults work out of the box with Docker.

3. **Start all services**
   ```bash
   docker-compose up --build
   ```

4. **Access the API**
   - API Gateway: `http://localhost:5000`
   - Swagger Docs: `http://localhost:5000/api-docs`

### Stopping Services

```bash
docker-compose down
```

To also remove volumes (database data):
```bash
docker-compose down -v
```

---

## 📚 Swagger Documentation

Interactive API documentation is available at **`http://localhost:5000/api-docs`** when the gateway is running.

The Swagger UI allows you to:
- View all available endpoints
- See request/response schemas
- Test endpoints directly (use the **Authorize** button to add your JWT token)

---

## 🔗 API Endpoints

All requests go through the API Gateway at `http://localhost:5000`.

### Auth (`/api/auth`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/register` | ❌ | Register a new user |
| POST | `/api/auth/login` | ❌ | Login and receive tokens |
| POST | `/api/auth/refresh` | ❌ | Refresh access token |
| POST | `/api/auth/logout` | ✅ | Logout and invalidate refresh token |
| GET | `/api/auth/verify` | ✅ | Verify access token validity |

### Products (`/api/products`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | ❌ | Get all products (paginated) |
| GET | `/api/products/:id` | ❌ | Get product by ID |
| POST | `/api/products` | ✅ Admin | Create a new product |

### Orders (`/api/orders`)

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/orders` | ✅ | Create a new order |
| GET | `/api/orders` | ✅ | Get authenticated user's orders |

---

## 📦 API Response Format

All API responses follow a consistent structure:

**Success Response:**
```json
{
  "success": true,
  "message": "Products fetched successfully",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

---

## ⚙️ Environment Variables

Each service uses its own `.env` file:

### Auth Service
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `5001` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongodb:27017/authDB` |
| `JWT_SECRET` | Secret for access tokens | — |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | — |

### Product Service
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `5002` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongodb:27017/productDB` |
| `JWT_SECRET` | Secret for token verification | — |

### Order Service
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Service port | `5003` |
| `MONGO_URI` | MongoDB connection string | `mongodb://mongodb:27017/orderDB` |
| `JWT_SECRET` | Secret for token verification | — |

### API Gateway
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Gateway port | `5000` |

---

## 🏗️ Project Structure

```
ecommerce-microservices-system/
├── docker-compose.yml
├── api-gateway/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── swagger.js
│       ├── proxy/
│       │   └── proxyHandler.js
│       └── routes/
│           ├── authRoutes.js
│           ├── productRoutes.js
│           └── orderRoutes.js
├── auth-service/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── authController.js
│       ├── middleware/
│       │   ├── asyncHandler.js
│       │   ├── authMiddleware.js
│       │   ├── errorMiddleware.js
│       │   ├── roleMiddleware.js
│       │   └── validate.js
│       ├── models/
│       │   └── User.js
│       ├── routes/
│       │   └── authRoutes.js
│       ├── services/
│       │   └── authService.js
│       └── validators/
│           └── authValidator.js
├── product-service/
│   ├── server.js
│   └── src/
│       ├── app.js
│       ├── config/
│       │   └── db.js
│       ├── controllers/
│       │   └── productController.js
│       ├── middleware/
│       │   ├── asyncHandler.js
│       │   ├── authMiddleware.js
│       │   ├── errorMiddleware.js
│       │   ├── roleMiddleware.js
│       │   └── validate.js
│       ├── models/
│       │   └── Product.js
│       ├── routes/
│       │   └── productRoutes.js
│       ├── services/
│       │   └── productService.js
│       └── validators/
│           └── productValidator.js
└── order-service/
    ├── server.js
    └── src/
        ├── app.js
        ├── config/
        │   └── db.js
        ├── controllers/
        │   └── orderController.js
        ├── clients/
        │   ├── authClient.js
        │   └── productClient.js
        ├── middleware/
        │   ├── asyncHandler.js
        │   ├── authMiddleware.js
        │   ├── errorMiddleware.js
        │   └── validate.js
        ├── models/
        │   └── Order.js
        ├── routes/
        │   └── orderRoutes.js
        ├── services/
        │   └── orderService.js
        └── validators/
            └── orderValidator.js
```

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (access + refresh tokens)
- **Validation**: Zod
- **API Docs**: Swagger / OpenAPI 3.0
- **Containerization**: Docker + Docker Compose
