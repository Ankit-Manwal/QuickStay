# QuickStay

QuickStay is a web application that allows users to explore and discover rooms, homestays, and villas available for short-term rentals. It provides a platform for hosts to showcase their properties and for guests to find unique stays.

## Features

- **User Authentication**: Secure user registration and login using Passport.js
- **Property Listings**: Create, view, edit, and delete property listings
- **Image Upload**: Cloudinary integration for property image management
- **Search Functionality**: Search and filter listings by location, country, and other criteria
- **Reviews System**: Users can leave reviews and ratings for properties
- **Session Management**: Persistent sessions using MongoDB session store
- **Responsive UI**: Modern and user-friendly interface with EJS templates

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: Passport.js (Local Strategy)
- **Template Engine**: EJS (with EJS-Mate)
- **File Upload**: Multer with Cloudinary storage
- **Validation**: Joi
- **Session Management**: Express-session with MongoDB store
- **Other**: Method-override, Connect-flash for flash messages

## Prerequisites

- Node.js (v20.17.0 or compatible)
- MongoDB (local or MongoDB Atlas)
- Cloudinary account (for image storage)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd QuickStay
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_session_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development
```

4. Start the server:
```bash
node app.js
```

Or use nodemon for development (auto-restart on file changes):
```bash
npx nodemon app.js
```

The application will be available at `http://localhost:8080`

## How to Run

### Running Locally

1. **Ensure MongoDB is running**:
   - For local MongoDB: Start your local MongoDB service
   - For MongoDB Atlas: Ensure your connection string in `.env` is correct

2. **Start the application**:
   ```bash
   node app.js
   ```
   
   Or for development with auto-reload:
   ```bash
   npx nodemon app.js
   ```

3. **Access the application**:
   - Open your browser and navigate to: `http://localhost:8080`
   - The home page will be displayed

### Running in Production

1. Set `NODE_ENV=production` in your `.env` file
2. Ensure all environment variables are properly configured
3. Start the server:
   ```bash
   node app.js
   ```

### Troubleshooting

- **Port already in use**: Change the port in `app.js` (line 214) or kill the process using port 8080
- **Database connection error**: Verify your MongoDB connection string in `.env`
- **Cloudinary upload fails**: Check your Cloudinary credentials in `.env`
- **Session not persisting**: Verify your `SECRET` key is set in `.env`

## Links

- **Live Application**: [Add your live application URL here]
- **Repository**: [Add your GitHub repository URL here]
- **Documentation**: [Add documentation link if available]

## Project Structure

```
QuickStay/
├── app.js                 # Main application entry point
├── cloudConfig.js         # Cloudinary configuration
├── controllers/           # Route controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── data/                  # Static data and uploads
│   └── image_uploads/
├── init/                  # Initialization scripts
├── public/                # Static assets (CSS, JS)
│   ├── css/
│   └── js/
├── routes/                # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
├── Schema_models/         # Mongoose models and validations
│   ├── listing.js
│   ├── review.js
│   ├── user.js
│   └── schema_validations.js
├── utils/                 # Utility functions
│   ├── expressErrors.js
│   ├── middlewares.js
│   └── wrapAsync.js
└── views/                 # EJS templates
    ├── error.ejs
    ├── home.ejs
    ├── includes/
    ├── layouts/
    └── listings/
```

## API Routes

### Listings
- `GET /listings` - View all listings
- `GET /listings/new` - Create new listing form (requires authentication)
- `POST /listings` - Create new listing (requires authentication)
- `GET /listings/:id` - View specific listing
- `GET /listings/:id/edit` - Edit listing form (requires authentication & ownership)
- `PUT /listings/:id` - Update listing (requires authentication & ownership)
- `DELETE /listings/:id` - Delete listing (requires authentication & ownership)
- `GET /listings/search-suggestions` - Get search suggestions
- `GET /listings/search_listing` - Search listings

### Reviews
- Reviews are nested under listings: `/listings/:id/reviews`

### Users
- User authentication routes (login, register, logout)

## Features in Detail

### Authentication
- User registration and login
- Session-based authentication
- Protected routes with middleware
- Owner verification for listing modifications

### Listings Management
- CRUD operations for property listings
- Image upload with Cloudinary integration
- Search and filter functionality
- Location and country-based filtering

### Reviews
- Users can add reviews to listings
- Reviews are associated with listings and users
- Automatic cleanup when listings are deleted

## Development

The application uses:
- Express.js for routing and middleware
- Mongoose for database operations
- EJS for server-side rendering
- Passport.js for authentication
- Cloudinary for cloud-based image storage

## link
https://quickstay-wiky.onrender.com

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
