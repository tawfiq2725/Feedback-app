# MERN Feedback Application

A full-featured MERN stack feedback application with robust token-based authentication, session handling, and role-based authorization (Admin & User). This application lets users submit feedback through a clean, responsive interface, view previous submissions, and preview detailed feedback. The backend is built with Node, Express, TypeScript, MongoDB (using the repository pattern) and hosted on AWS EC2, while the frontend is developed with React and deployed on Vercel.

![MERN Feedback App](https://wallpapercave.com/wp/wp8903893.jpg)

## Features

- **User Authentication**
  - Secure token-based authentication using JWT
  - Protected routes and endpoints
  - Session management across the application

- **Role-Based Authorization**
  - Two distinct roles: Admin and User
  - Different access permissions and capabilities
  - Secure role verification on the backend

- **Feedback Management**
  - Intuitive feedback submission form
  - Historical feedback viewing
  - Detailed feedback preview functionality

- **Responsive Design**
  - Mobile-first approach
  - Consistent UI/UX across devices
  - Modern React components

- **Robust Architecture**
  - Repository pattern for database operations
  - TypeScript for type safety
  - Clean separation of concerns

## Tech Stack

### Frontend
- React
- React Router for navigation
- JWT for authentication
- Context API for state management
- Axios for API requests
- Deployed on Vercel

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB with Repository Pattern
- JWT for authentication and authorization
- Hosted on AWS EC2

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (local instance or MongoDB Atlas)

### Clone the Repository
```bash
git clone https://github.com/tawfiq2725/Feedback-app.git
cd Feedback-app
```

### Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Configure environment variables (see .env.example)
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

### Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Configure environment variables (see .env.example)
cp .env.example .env
# Edit .env with your configuration

# Start the development server
npm run dev
```

## Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/feedback-app
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication
- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login and receive access token

### Feedback
- `GET /api/fb/feedbacks` - Get all feedback (requires authentication)
- `GET /api/fb/feedback/:id` - Get specific feedback by ID
- `POST /api/fb/feedback` - Submit new feedback

### Dash Board
- `GET /api/admin/dashboard` - Get all dashboard (Admin only)

## Deployment

### Backend (AWS EC2)
1. Launch an EC2 instance
2. Install Node.js and npm
3. Clone the repository
4. Configure environment variables
5. Install PM2 globally: `npm install -g pm2`
6. Start the application: `pm2 start npm --name "feedback-backend" -- run start`

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings
3. Add environment variables
4. Deploy

## Project Structure

```
feedback-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.ts
│   │   └── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── store/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Development Workflow

1. Create feature branches from `main`
2. Implement changes and test locally
3. Create pull requests back to `main`
4. Review and merge
5. CI/CD pipeline will deploy to staging/production

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JWT](https://jwt.io/)
