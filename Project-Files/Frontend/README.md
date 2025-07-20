# HouseHunt Backend API

A comprehensive Node.js backend for the HouseHunt rental platform, providing RESTful APIs for property management, user authentication, inquiries, and reviews.

## Features

- **User Management**: Registration, authentication, and profile management for renters, owners, and admins
- **Property Management**: CRUD operations for rental properties with image uploads
- **Inquiry System**: Communication between renters and property owners
- **Review System**: Property reviews and ratings
- **File Upload**: Image upload for properties and user avatars
- **Authentication**: JWT-based authentication with role-based access control
- **Database**: MongoDB with Mongoose ODM

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **File Upload**: Multer
- **Password Hashing**: bcryptjs
- **Environment**: dotenv

## Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd househunt-backend
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your configuration:
\`\`\`env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/househunt
JWT_SECRET=your-super-secret-jwt-key-here
\`\`\`

5. Create upload directories:
\`\`\`bash
mkdir uploads
mkdir uploads/properties
\`\`\`

6. Start MongoDB service on your system

7. Seed the database with sample data:
\`\`\`bash
npm run seed
\`\`\`

8. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Properties
- `GET /api/properties` - Get all properties (with filtering)
- `GET /api/properties/:id` - Get single property
- `POST /api/properties` - Create new property (owner only)
- `PUT /api/properties/:id` - Update property (owner only)
- `DELETE /api/properties/:id` - Delete property (owner only)
- `GET /api/properties/owner/:ownerId` - Get properties by owner
- `POST /api/properties/:id/favorite` - Toggle favorite property

### Inquiries
- `POST /api/inquiries` - Create new inquiry
- `GET /api/inquiries/my-inquiries` - Get user's inquiries
- `GET /api/inquiries/received` - Get received inquiries (owner only)
- `PUT /api/inquiries/:id/status` - Update inquiry status
- `PUT /api/inquiries/:id/respond` - Respond to inquiry
- `PUT /api/inquiries/:id/schedule-viewing` - Schedule property viewing

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/helpful` - Mark review as helpful
- `POST /api/reviews/:id/respond` - Respond to review (owner only)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id/status` - Update user status
- `GET /api/users/:id/stats` - Get user statistics
- `DELETE /api/users/:id` - Delete user

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

\`\`\`
Authorization: Bearer <your-jwt-token>
\`\`\`

## User Roles

- **Renter**: Can browse properties, create inquiries, write reviews
- **Owner**: Can manage properties, respond to inquiries and reviews
- **Admin**: Full access to all resources and user management

## Sample Data

After running the seed script, you can use these credentials:

- **Admin**: admin@househunt.com / admin123
- **Owner**: john.smith@email.com / owner123
- **Renter**: mike.wilson@email.com / renter123

## File Uploads

Property images are uploaded to the `uploads/properties/` directory. The API returns the file path which can be used to serve the images.

## Error Handling

The API returns consistent error responses:

\`\`\`json
{
  "error": "Error message",
  "details": "Additional error details (in development)"
}
\`\`\`

## Development

- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Production Deployment

1. Set `NODE_ENV=production` in your environment
2. Use a production MongoDB instance
3. Set a strong JWT secret
4. Configure proper CORS settings
5. Set up proper file upload limits and security

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control
- File upload validation
- CORS protection
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
