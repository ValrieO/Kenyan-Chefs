# KenyanChefs - Kenyan Recipe Sharing Platform
## Project Planning & Design Document

### 1. Database Schema Design

#### Core Collections

**Users Collection**
```javascript
{
  _id: ObjectId,
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  profile: {
    firstName: String,
    lastName: String,
    bio: String,
    avatar: String (URL),
    location: String,
    joinDate: Date,
    verified: Boolean
  },
  preferences: {
    dietaryRestrictions: [String], // vegetarian, vegan, gluten-free
    favoriteRegions: [String], // coastal, central, western, etc.
    spiceLevel: String // mild, medium, hot
  },
  social: {
    followers: [ObjectId], // User IDs
    following: [ObjectId], // User IDs
    followersCount: Number,
    followingCount: Number
  },
  stats: {
    recipesCount: Number,
    likesReceived: Number,
    ratingsAverage: Number
  },
  createdAt: Date,
  updatedAt: Date
}
```

**Recipes Collection**
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  author: ObjectId (ref: Users),
  images: [String], // Array of image URLs
  ingredients: [{
    name: String,
    quantity: Number,
    unit: String, // kg, grams, cups, pieces
    notes: String // optional prep notes
  }],
  instructions: [{
    step: Number,
    description: String,
    image: String, // optional step image
    duration: Number // minutes
  }],
  metadata: {
    prepTime: Number, // minutes
    cookTime: Number, // minutes
    servings: Number,
    difficulty: String, // easy, medium, hard
    cuisine: String, // kenyan
    region: String, // coastal, central, western, nyanza, etc.
    mealType: String, // breakfast, lunch, dinner, snack
    dietaryTags: [String], // vegetarian, vegan, gluten-free
    spiceLevel: String, // mild, medium, hot
    cost: String // budget, moderate, expensive
  },
  nutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
    fiber: Number
  },
  engagement: {
    likes: [ObjectId], // User IDs who liked
    likesCount: Number,
    saves: [ObjectId], // User IDs who saved
    savesCount: Number,
    ratings: [{
      user: ObjectId,
      rating: Number, // 1-5 stars
      review: String,
      createdAt: Date
    }],
    averageRating: Number,
    ratingsCount: Number,
    views: Number
  },
  status: String, // draft, published, archived
  featured: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

**Categories Collection**
```javascript
{
  _id: ObjectId,
  name: String (required, unique),
  description: String,
  image: String,
  slug: String (unique),
  parent: ObjectId, // for subcategories
  recipesCount: Number,
  popular: Boolean,
  createdAt: Date
}
```

**Comments Collection**
```javascript
{
  _id: ObjectId,
  recipe: ObjectId (ref: Recipes),
  user: ObjectId (ref: Users),
  content: String (required),
  parent: ObjectId, // for nested comments
  likes: [ObjectId], // User IDs
  likesCount: Number,
  replies: [ObjectId], // Comment IDs
  createdAt: Date,
  updatedAt: Date
}
```

**Collections Collection** (User-created recipe collections)
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String,
  user: ObjectId (ref: Users),
  recipes: [ObjectId], // Recipe IDs
  image: String, // collection cover image
  isPublic: Boolean,
  followers: [ObjectId], // User IDs
  followersCount: Number,
  tags: [String],
  createdAt: Date,
  updatedAt: Date
}
```

#### Relationships Summary
- Users → Recipes (One-to-Many)
- Users → Comments (One-to-Many)
- Users → Collections (One-to-Many)
- Recipes → Comments (One-to-Many)
- Recipes → Categories (Many-to-Many via tags)
- Collections → Recipes (Many-to-Many)
- Users → Users (Many-to-Many for following/followers)

### 2. API Endpoints Design

#### Authentication Routes (`/api/auth`)
```
POST   /register          - User registration
POST   /login             - User login
POST   /logout            - User logout
GET    /me                - Get current user profile
PUT    /me                - Update user profile
POST   /forgot-password   - Request password reset
POST   /reset-password    - Reset password
POST   /refresh-token     - Refresh JWT token
```

#### User Routes (`/api/users`)
```
GET    /                  - Get all users (paginated)
GET    /:id               - Get user by ID
GET    /:id/recipes       - Get user's recipes
GET    /:id/collections   - Get user's collections
POST   /:id/follow        - Follow/unfollow user
GET    /:id/followers     - Get user's followers
GET    /:id/following     - Get users being followed
PUT    /:id               - Update user (auth required)
DELETE /:id               - Delete user (auth required)
```

#### Recipe Routes (`/api/recipes`)
```
GET    /                  - Get all recipes (with search/filter)
POST   /                  - Create new recipe (auth required)
GET    /:id               - Get recipe by ID
PUT    /:id               - Update recipe (auth required)
DELETE /:id               - Delete recipe (auth required)
POST   /:id/like          - Like/unlike recipe (auth required)
POST   /:id/save          - Save/unsave recipe (auth required)
POST   /:id/rate          - Rate recipe (auth required)
GET    /:id/comments      - Get recipe comments
POST   /:id/comments      - Add comment (auth required)
GET    /trending          - Get trending recipes
GET    /featured          - Get featured recipes
GET    /random            - Get random recipes
```

#### Search & Filter Routes (`/api/search`)
```
GET    /recipes           - Search recipes with advanced filters
GET    /users             - Search users
GET    /suggestions       - Get search suggestions
GET    /popular           - Get popular search terms
```

#### Category Routes (`/api/categories`)
```
GET    /                  - Get all categories
POST   /                  - Create category (admin only)
GET    /:id               - Get category by ID
PUT    /:id               - Update category (admin only)
DELETE /:id               - Delete category (admin only)
GET    /:id/recipes       - Get recipes in category
```

#### Collection Routes (`/api/collections`)
```
GET    /                  - Get public collections
POST   /                  - Create collection (auth required)
GET    /:id               - Get collection by ID
PUT    /:id               - Update collection (auth required)
DELETE /:id               - Delete collection (auth required)
POST   /:id/recipes       - Add recipe to collection
DELETE /:id/recipes/:recipeId - Remove recipe from collection
POST   /:id/follow        - Follow collection
```

### 3. Data Flow Architecture

#### Frontend → Backend Flow
1. **User Actions** → React Components
2. **API Calls** → Custom Hooks (useRecipes, useAuth, etc.)
3. **HTTP Requests** → Express.js Routes
4. **Business Logic** → Service Layer
5. **Data Operations** → MongoDB via Mongoose
6. **Response** → JSON API Response
7. **State Updates** → React State Management (Context/Redux)
8. **UI Updates** → Component Re-renders

#### Real-time Features (Socket.io)
- Live recipe ratings and comments
- User online status
- Recipe view counts
- New recipe notifications for followers
- Live cooking sessions (future feature)

### 4. Project Roadmap & Milestones

#### Phase 1: Foundation (Weeks 1-2)
**Milestone 1.1: Backend Setup**
- [ ] Initialize Express.js project
- [ ] Set up MongoDB connection
- [ ] Create basic user authentication
- [ ] Implement JWT middleware
- [ ] Set up error handling middleware
- [ ] Create basic API structure

**Milestone 1.2: Database Design**
- [ ] Create Mongoose schemas
- [ ] Set up database indexes
- [ ] Create seed data
- [ ] Implement validation rules
- [ ] Set up database backup strategy

#### Phase 2: Core API Development (Weeks 3-4)
**Milestone 2.1: User Management**
- [ ] User registration/login
- [ ] Profile management
- [ ] Password reset functionality
- [ ] User roles and permissions
- [ ] Following/followers system

**Milestone 2.2: Recipe Management**
- [ ] CRUD operations for recipes
- [ ] Image upload functionality
- [ ] Recipe categorization
- [ ] Basic search implementation
- [ ] Recipe validation

#### Phase 3: Advanced Features (Weeks 5-6)
**Milestone 3.1: Search & Filtering**
- [ ] Advanced search with filters
- [ ] Full-text search implementation
- [ ] Search suggestions
- [ ] Trending recipes algorithm
- [ ] Recipe recommendations

**Milestone 3.2: Social Features**
- [ ] Comments system
- [ ] Rating system
- [ ] Recipe collections
- [ ] User profiles
- [ ] Social interactions (likes, saves)

#### Phase 4: Frontend Development (Weeks 7-9)
**Milestone 4.1: Core UI**
- [ ] React project setup
- [ ] Authentication components
- [ ] Recipe listing and detail pages
- [ ] User profile pages
- [ ] Responsive design implementation

**Milestone 4.2: Advanced UI**
- [ ] Search and filter interface
- [ ] Recipe creation/editing forms
- [ ] Social features UI
- [ ] Real-time updates
- [ ] Mobile optimization

#### Phase 5: Testing & Deployment (Weeks 10-11)
**Milestone 5.1: Testing**
- [ ] Unit tests for API endpoints
- [ ] Integration tests
- [ ] Frontend component tests
- [ ] Performance testing
- [ ] Security testing

**Milestone 5.2: Deployment**
- [ ] Production environment setup
- [ ] CI/CD pipeline
- [ ] Database optimization
- [ ] Performance monitoring
- [ ] User acceptance testing

#### Phase 6: Launch & Optimization (Week 12)
**Milestone 6.1: Launch**
- [ ] Beta testing with selected users
- [ ] Bug fixes and optimizations
- [ ] Content moderation setup
- [ ] Analytics implementation
- [ ] Official launch

### 5. Technical Architecture Decisions

#### Backend Architecture
**Framework Choice: Express.js**
- Reasons: Mature ecosystem, excellent middleware support, great for RESTful APIs
- Alternatives considered: Fastify, Koa.js

**Database: MongoDB**
- Reasons: Flexible schema for recipe data, excellent scalability, good aggregation framework
- Alternatives considered: PostgreSQL, MySQL

**Authentication: JWT + Refresh Tokens**
- Reasons: Stateless, scalable, secure
- Implementation: Access token (15min) + Refresh token (7 days)

**File Storage: Cloudinary**
- Reasons: Automatic image optimization, CDN distribution, easy integration
- Alternatives considered: AWS S3, local storage

#### Frontend Architecture
**Framework: React**
- Reasons: Component-based, large ecosystem, excellent developer experience
- State Management: Context API + useReducer (may upgrade to Redux if needed)

**Routing: React Router v6**
- Reasons: De facto standard, excellent documentation, nested routing support

**Styling: Tailwind CSS + CSS Modules**
- Reasons: Utility-first approach, responsive design, component-scoped styles

**API Client: Axios**
- Reasons: Request/response interceptors, automatic JSON handling, better error handling

#### Real-time Features
**Socket.io**
- Use cases: Live comments, recipe ratings, user online status
- Implementation: Separate Socket.io server or integrated with Express

#### Security Considerations
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS configuration
- Helmet.js for security headers
- Data encryption for sensitive information
- Regular security audits

#### Performance Optimizations
- Database indexing strategy
- API response caching
- Image optimization and lazy loading
- Code splitting for frontend
- CDN for static assets
- Database connection pooling

#### Scalability Considerations
- Microservices architecture (future)
- Database sharding strategies
- Load balancing
- Caching layers (Redis)
- Auto-scaling infrastructure

### 6. Development Environment Setup

#### Required Tools
- Node.js (v18+)
- MongoDB (v6+)
- Git
- VS Code or preferred IDE
- Postman for API testing
- MongoDB Compass for database management

#### Environment Variables
```
# Backend
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chakulahub
JWT_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Frontend
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_SOCKET_URL=http://localhost:5000
```

This comprehensive plan provides a solid foundation for building ChakulaHub. The next step would be to begin implementing the backend infrastructure and database schemas.
