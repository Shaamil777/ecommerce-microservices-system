# E-Commerce Microservices

A microservices-based e-commerce platform built with Node.js, Express, and Docker.

## Architecture

This project consists of the following microservices:
- **API Gateway (`api-gateway`)**: The main entry point for all client requests, running on port `5000`.
- **Auth Service (`auth-service`)**: Handles user authentication and verification, running on port `5001`.
- **Product Service (`product-service`)**: Manages product catalog and details, running on port `5002`.
- **Order Service (`order-service`)**: Handles order creation and processing, running on port `5003`.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) and [Docker Compose](https://docs.docker.com/compose/)

## Getting Started

1. Clone the repository
2. Ensure you have Docker running on your machine.
3. Start all services using Docker Compose:

```bash
docker-compose up --build -d
```

4. The API Gateway will be available at `http://localhost:5000`. You can test the endpoints through the gateway.

### Example Request (Create Order)

**POST** `http://localhost:5000/api/orders`
```json
{
  "productId": "12345"
}
```

## Stopping the Services

To stop and remove the containers, run:
```bash
docker-compose down
```
