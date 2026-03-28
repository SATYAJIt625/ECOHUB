# 🌿 EcoHub — Organization Economy Management System

A production-ready full-stack web application for managing finances, members, and transactions in organizations like college clubs, NGOs, and startups.

---

## 📸 Features

| Feature | Description |
|---|---|
| 🔐 Authentication | JWT-based login/register with role-based access |
| 📊 Dashboard | Real-time balance, income, expense overview with charts |
| 👥 Member Management | Add/remove members, assign roles (Admin / Treasurer / Member) |
| 💰 Transactions | Full CRUD — add income/expenses, filter, search, paginate |
| 📋 Budget Tracking | Monthly budgets with progress bars and overspend alerts |
| 📈 Reports & Analytics | 12-month trends, category breakdowns, pie/bar/line charts |
| 🐳 Docker | One-command deployment with docker compose |

---

## 🧱 Tech Stack

**Frontend**
- Next.js 14 (App Router)
- Tailwind CSS
- Recharts (charts)
- Axios (API calls)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT authentication
- bcryptjs (password hashing)
- express-validator (input validation)

**Infrastructure**
- Docker + Docker Compose
- MongoDB 7.0

---

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Clone the project
git clone <your-repo-url>
cd ecohub

# Start everything
docker compose up --build

# In another terminal, seed the database
docker compose exec backend npm run seed

# Open browser
open http://localhost:3000
```

### Option 2: Local Development

#### Prerequisites
- Node.js 18+
- MongoDB 6+ running locally (or MongoDB Atlas URI)

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env .env.local
# Edit .env — set MONGODB_URI if needed

# Start development server
npm run dev
# API running at http://localhost:5000
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Configure environment
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# Start development server
npm run dev
# App running at http://localhost:3000
```

#### Seed Sample Data

```bash
cd backend
npm run seed
```

---

## 🔑 Demo Login Credentials

After seeding:

| Role | Email | Password |
|---|---|---|
| Admin | admin@ecohub.dev | password123 |
| Treasurer | treasurer@ecohub.dev | password123 |
| Member | member1@ecohub.dev | password123 |

---

## 📁 Project Structure

```
ecohub/
├── backend/
│   ├── config/
│   │   └── db.js                  # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Register, login
│   │   ├── usersController.js     # Member CRUD
│   │   ├── transactionsController.js
│   │   ├── budgetsController.js
│   │   └── reportsController.js   # Analytics queries
│   ├── middleware/
│   │   ├── auth.js                # JWT protect + authorize
│   │   ├── errorHandler.js        # Global error handler
│   │   └── validators.js          # express-validator rules
│   ├── models/
│   │   ├── User.js
│   │   ├── Transaction.js
│   │   └── Budget.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   └── reports.js
│   ├── utils/
│   │   ├── jwt.js                 # Token generation
│   │   └── seed.js                # Sample data seeder
│   ├── server.js
│   ├── .env
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.js                # Login / Register page
│   │   ├── layout.js              # Root layout
│   │   ├── dashboard/             # Dashboard overview
│   │   ├── members/               # Member management
│   │   ├── transactions/          # Transaction CRUD
│   │   ├── budget/                # Budget tracker
│   │   └── reports/               # Analytics & charts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.js        # Auth-protected wrapper
│   │   │   ├── Sidebar.js
│   │   │   └── Topbar.js
│   │   └── ui/
│   │       ├── index.js           # Button, Modal, Input, etc.
│   │       └── TransactionModal.js
│   ├── lib/
│   │   ├── api.js                 # Axios client + all API functions
│   │   ├── auth.js                # AuthContext + useAuth hook
│   │   └── utils.js               # formatCurrency, formatDate, etc.
│   ├── styles/
│   │   └── globals.css
│   └── package.json
│
├── docker-compose.yml
├── mongo-init.js
└── README.md
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication

All protected routes require:
```
Authorization: Bearer <JWT_TOKEN>
```

---

### Auth Endpoints

#### `POST /auth/register`
Register a new user.

**Body:**
```json
{
  "name": "Alex Rivera",
  "email": "alex@example.com",
  "password": "password123",
  "role": "member"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGc...",
  "user": { "id": "...", "name": "Alex Rivera", "email": "...", "role": "member" }
}
```

---

#### `POST /auth/login`
Authenticate and receive a JWT token.

**Body:**
```json
{ "email": "admin@ecohub.dev", "password": "password123" }
```

---

#### `GET /auth/me` 🔒
Get the currently authenticated user.

---

### Users Endpoints

#### `GET /users` 🔒 Admin/Treasurer
Get all members with optional filters.

**Query params:** `search`, `role`, `page`, `limit`

#### `PUT /users/:id/role` 🔒 Admin only
Change a member's role.

**Body:** `{ "role": "treasurer" }`

#### `DELETE /users/:id` 🔒 Admin only
Deactivate a member account.

---

### Transactions Endpoints

#### `GET /transactions` 🔒
List all transactions with filtering and pagination.

**Query params:** `type` (income|expense), `category`, `search`, `startDate`, `endDate`, `page`, `limit`, `sortBy`, `sortOrder`

**Response includes:** transactions array + summary (income, expenses, balance totals)

#### `POST /transactions` 🔒 Admin/Treasurer
Create a new transaction.

**Body:**
```json
{
  "title": "Team Lunch",
  "amount": 1500,
  "type": "expense",
  "category": "food",
  "date": "2025-01-15",
  "description": "Monthly team lunch"
}
```

#### `PUT /transactions/:id` 🔒 Admin/Treasurer
Update a transaction.

#### `DELETE /transactions/:id` 🔒 Admin only
Delete a transaction permanently.

---

### Budgets Endpoints

#### `GET /budgets` 🔒
Get budgets for a specific month (includes actual spending comparison).

**Query params:** `month` (1-12), `year`

**Response includes:** budgets with `actualAmount`, `percentage`, `remaining`, `isExceeded`, `isAlerted`

#### `POST /budgets` 🔒 Admin/Treasurer
Create a monthly budget.

**Body:**
```json
{
  "name": "Events Budget",
  "category": "events",
  "plannedAmount": 5000,
  "month": 1,
  "year": 2025,
  "alertThreshold": 80
}
```

#### `PUT /budgets/:id` 🔒 Admin/Treasurer
Update a budget.

#### `DELETE /budgets/:id` 🔒 Admin only
Delete a budget.

---

### Reports Endpoints

#### `GET /reports/summary` 🔒
Get financial summary: all-time totals, this month's totals, 12-month trend, recent transactions, stats.

#### `GET /reports/category` 🔒
Get category breakdown for a specific month.

**Query params:** `month`, `year`, `type` (income|expense)

---

## 🔐 Role Permissions

| Action | Admin | Treasurer | Member |
|---|:---:|:---:|:---:|
| View dashboard | ✅ | ✅ | ✅ |
| View transactions | ✅ | ✅ | ✅ |
| Create/edit transactions | ✅ | ✅ | ❌ |
| Delete transactions | ✅ | ❌ | ❌ |
| View members | ✅ | ✅ | ❌ |
| Manage member roles | ✅ | ❌ | ❌ |
| Remove members | ✅ | ❌ | ❌ |
| Create/edit budgets | ✅ | ✅ | ❌ |
| Delete budgets | ✅ | ❌ | ❌ |
| View reports | ✅ | ✅ | ✅ |

---

## 🐳 Docker Commands

```bash
# Start all services
docker compose up --build

# Start in background
docker compose up -d

# View logs
docker compose logs -f backend
docker compose logs -f frontend

# Seed database
docker compose exec backend npm run seed

# Stop everything
docker compose down

# Stop and remove all data (volumes)
docker compose down -v

# Rebuild a specific service
docker compose up --build backend
```

---

## 🌍 Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|---|---|---|
| `PORT` | `5000` | Express server port |
| `MONGODB_URI` | `mongodb://mongo:27017/ecohub` | MongoDB connection string |
| `JWT_SECRET` | — | **Required.** Secret key for JWT signing |
| `JWT_EXPIRES_IN` | `7d` | JWT token expiry duration |
| `NODE_ENV` | `development` | Environment mode |
| `FRONTEND_URL` | `http://localhost:3000` | CORS allowed origin |

### Frontend (`frontend/.env.local`)

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5000/api` | Backend API base URL |

---

## 🛠 Development Tips

- **Hot reload:** Both `npm run dev` commands use hot reload — no restarts needed.
- **API testing:** Import the routes above into Postman or use the built-in demo credentials.
- **First user = Admin:** The very first registered user is automatically assigned the `admin` role.
- **Seed data:** Run `npm run seed` from `backend/` to populate 6 months of realistic sample data.

---

## 📄 License

MIT — free to use, modify, and distribute.
