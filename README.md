# 🚌 NTC Bus Tracking API

A real-time bus tracking system API built with Node.js, Express, and PostgreSQL. This RESTful API provides comprehensive functionality for managing bus routes, trips, real-time tracking, and user authentication for the National Transport Commission (NTC) bus network.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Testing](#testing)
- [Deployment](#deployment)
- [Deployment Details (Appendix)](#deployment-details-appendix)

## ✨ Features

- 🔐 **User Authentication** - JWT-based authentication system
- 🚌 **Bus Management** - CRUD operations for bus fleet management
- 🛣️ **Route Management** - Create and manage bus routes with stops
- 🚶 **Trip Management** - Schedule and track bus trips
- 📍 **Real-time Tracking** - Live GPS location tracking for buses
- 🗂️ **Data Seeding** - Populate database with sample data
- 📊 **Health Monitoring** - API health checks and status monitoring
- 🔒 **Input Validation** - Comprehensive request validation
- 📝 **API Documentation** - Interactive Swagger/OpenAPI documentation

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js 18
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Sequelize
- **Authentication**: JSON Web Tokens (JWT)
- **Validation**: Express Validator
- **Security**: Helmet.js, CORS
- **Documentation**: Swagger/OpenAPI 3.0

### DevOps & Deployment
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Cloud Platform**: AWS (EC2 + ECR)
- **Reverse Proxy**: Nginx
- **SSL**: Let's Encrypt (Certbot)
- **Process Manager**: PM2

### Development Tools
- **Testing**: Jest, Supertest
- **Linting**: ESLint
- **API Testing**: Postman
- **Version Control**: Git, GitHub

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 15 or higher
- Docker (optional)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kavishka6558/API2.git
   cd API2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=3000
   DATABASE_URL=postgresql://username:password@localhost:5432/bustracking
   JWT_SECRET=your-super-secret-jwt-key
   NODE_ENV=development
   ```

4. **Database Setup**
   ```bash
   # Create PostgreSQL database
   createdb bustracking
   
   # Run the application (it will auto-create tables)
   npm start
   ```

5. **Seed Database (Optional)**
   ```bash
   # Populate with sample data
   curl -X POST http://localhost:3000/api/seed
   ```

### Running with Docker Compose

```bash
# Start all services (API + PostgreSQL)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

### Interactive Documentation
- **Swagger UI**: `http://localhost:3000/api-docs` (when running locally)
- **Production**: `https://bustrackinapi.me/api-docs`

### Core Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

#### Buses
- `GET /api/buses` - List all buses
- `POST /api/buses` - Create new bus
- `GET /api/buses/:id` - Get bus details
- `PUT /api/buses/:id` - Update bus
- `DELETE /api/buses/:id` - Delete bus

#### Routes
- `GET /api/routes` - List all routes
- `POST /api/routes` - Create new route
- `GET /api/routes/:id` - Get route details
- `PUT /api/routes/:id` - Update route
- `DELETE /api/routes/:id` - Delete route

#### Trips
- `GET /api/trips` - List trips
- `POST /api/trips` - Create trip
- `GET /api/trips/:id` - Get trip details
- `PUT /api/trips/:id/status` - Update trip status

#### Real-time Tracking
- `POST /api/tracking/location` - Update bus location
- `GET /api/tracking/bus/:busId` - Get bus location
- `GET /api/tracking/trip/:tripId` - Get trip tracking data

#### Health & Utilities
- `GET /health` - API health check
- `GET /api/health` - Detailed health status
- `POST /api/seed` - Seed database with sample data

## 🗄️ Database Schema

The API uses PostgreSQL with the following main entities:

### Tables
- **Users** - User accounts and authentication
- **Buses** - Bus fleet information
- **Routes** - Bus route definitions with stops
- **Trips** - Scheduled bus trips
- **TrackingData** - Real-time GPS location data

### Relationships
- Users can create and manage buses
- Buses are assigned to routes
- Routes have multiple trips
- Trips generate tracking data

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint
```

### Test Structure
- **Unit Tests** - Individual component testing
- **Integration Tests** - API endpoint testing
- **Model Tests** - Database model validation
- **Controller Tests** - Business logic testing

## 🚀 Deployment

The application is deployed using a modern CI/CD pipeline with the following architecture:

### Deployment Architecture
```
GitHub → GitHub Actions → AWS ECR → EC2 → Docker → Nginx → SSL
```

### Deployment Process
1. **Code Push** - Push to `main` branch triggers deployment
2. **CI Pipeline** - Automated testing and linting
3. **Docker Build** - Container image creation
4. **Registry Push** - Image pushed to AWS ECR
5. **EC2 Deployment** - Automated deployment to EC2
6. **Health Checks** - Automated health verification
7. **SSL Setup** - Automatic HTTPS configuration

### Manual Deployment
```bash
# Build Docker image
docker build -t bus-tracking-api .

# Run container
docker run -d \
  --name bus-tracking-api \
  -p 3000:3000 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  bus-tracking-api
```

---

## 📋 Deployment Details (Appendix)

### API Deployment Platform
**Platform**: Amazon Web Services (AWS)
- **Compute**: EC2 (Elastic Compute Cloud)
- **Container Registry**: ECR (Elastic Container Registry)
- **Reverse Proxy**: Nginx with SSL termination
- **SSL Certificate**: Let's Encrypt (auto-renewal)
- **CI/CD**: GitHub Actions

### URL of the Deployed API
- **Production API**: `https://bustrackinapi.me`
- **Health Check**: `https://bustrackinapi.me/health`
- **API Documentation**: `https://bustrackinapi.me/api-docs`
- **Base API Endpoint**: `https://bustrackinapi.me/api`

### GitHub Repository URL
- **Repository**: `https://github.com/Kavishka6558/API2`
- **Branch**: `main`
- **CI/CD Workflow**: `.github/workflows/ci.yml`

### API Specification
#### Swagger/OpenAPI Documentation
- **Interactive Docs**: `https://bustrackinapi.me/api-docs`
- **OpenAPI Spec**: `https://bustrackinapi.me/api-docs.json`
- **Local Documentation**: Available at `/api-docs` when running locally

#### Postman Collection
- **Collection File**: `BusTrackingAPI.postman_collection.json`
- **Environment Files**: 
  - `Local.postman_environment.json` - Local development
  - `Docker.postman_environment.json` - Docker environment

#### API Testing
```bash
# Import Postman collection and test the API
# Collection includes all endpoints with sample requests
# Pre-configured environments for different deployment targets
```

### AI Tools and Assistants Used

#### Primary AI Assistant
- **Claude (Anthropic)** - `https://claude.ai`
  - Code generation and refactoring
  - API design and architecture guidance
  - Debugging and error resolution
  - Documentation generation
  - CI/CD pipeline optimization

#### Additional AI Tools
- **GitHub Copilot** - `https://github.com/features/copilot`
  - Code completion and suggestions
  - Boilerplate code generation
  - Test case generation

- **ChatGPT (OpenAI)** - `https://chat.openai.com`
  - Problem-solving assistance
  - Code review and optimization
  - Documentation improvement

#### Specific AI Contributions
1. **Database Schema Design** - AI-assisted optimization of PostgreSQL schema
2. **API Architecture** - RESTful design patterns and best practices
3. **Security Implementation** - JWT authentication and input validation
4. **Docker Configuration** - Containerization and multi-stage builds
5. **CI/CD Pipeline** - GitHub Actions workflow automation
6. **Error Handling** - Comprehensive error management system
7. **Testing Strategy** - Test structure and coverage optimization
8. **Deployment Automation** - EC2 deployment with Nginx and SSL

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support, please contact:
- **Email**: support@bustrackinapi.me
- **GitHub Issues**: `https://github.com/Kavishka6558/API2/issues`
- **Documentation**: `https://bustrackinapi.me/api-docs`

---

*Built with ❤️ for the National Transport Commission (NTC) Bus Network*