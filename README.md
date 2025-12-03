# NightFlex Movie Streaming Platform - Technical Specification Document

## Table of Contents

1. [Overview](#overview)
2. [Project Structure](#project-structure)
3. [Architecture](#architecture)
4. [Technologies Used](#technologies-used)
5. [Features](#features)
6. [User Roles and Permissions](#user-roles-and-permissions)
7. [API Endpoints](#api-endpoints)
8. [Environment Configuration](#environment-configuration)
9. [Installation and Setup](#installation-and-setup)
10. [Usage](#usage)
11. [Deployment](#deployment)
12. [Security Considerations](#security-considerations)

## Overview

NightFlex is a modern movie streaming platform built as a Vue.js single-page application (SPA). The platform allows users to browse, view details, and comment on movies, while administrators can manage the movie catalog. The application features a sleek, responsive design with a dark theme and provides an immersive streaming experience.

### Key Objectives

- Provide users with an intuitive interface to discover and explore movies
- Enable user authentication and personalized experiences
- Allow administrators to maintain and update the movie database
- Ensure responsive design for mobile and desktop usage
- Implement modern web development best practices

## Project Structure

```
movieAppClient/
├── public/
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── api.js                    # Axios configuration and API utilities
│   ├── main.js                   # Application entry point
│   ├── App.vue                   # Root component
│   ├── assets/
│   │   ├── main.css             # Global styles and CSS variables
│   │   ├── NightFlex_logo_v2.png
│   │   ├── NightFlex_logo.png
│   │   └── SB19 'PAGTATAG!' Trailer.mp4  # Hero video asset
│   ├── components/
│   │   ├── AddCommentComponent.vue
│   │   ├── AddMovieComponent.vue       # Admin movie creation form
│   │   ├── FooterComponent.vue
│   │   ├── GetComments.vue             # Comments display component
│   │   ├── MoviesComponent.vue         # Movie grid/list display
│   │   ├── NavbarComponent.vue
│   │   └── UpdateMovieComponent.vue    # Admin movie update form
│   ├── pages/                          # Vue Router pages
│   │   ├── HomePage.vue               # Landing page with hero section
│   │   ├── LoginPage.vue
│   │   ├── LogoutPage.vue
│   │   ├── MovieDetailPage.vue         # Individual movie details
│   │   ├── MoviePage.vue               # Movies listing page
│   │   └── RegisterPage.vue
│   └── stores/                         # Pinia state management
│       ├── global.js                   # Global state (auth, user info)
│       └── movieStore.js               # Movie-related state management
├── index.html                          # HTML template
├── package.json                        # Dependencies and scripts
├── vite.config.js                      # Vite configuration
└── README.md                           # Basic template documentation
```

## Architecture

### Frontend Architecture

The application follows a component-based architecture using Vue 3's Composition API and `<script setup>` syntax. Key architectural patterns include:

- **State Management**: Pinia stores for centralized state management
- **Routing**: Vue Router for client-side navigation
- **API Layer**: Axios for HTTP requests with interceptors for authentication
- **Component Structure**: Reusable components with scoped styling
- **Reactive Design**: Vue's reactivity system for dynamic UI updates

### Data Flow

1. User interacts with UI components
2. Components trigger actions in Pinia stores
3. Stores make API calls via the configured Axios instance
4. API responses update the reactive state
5. UI automatically updates based on state changes

### State Management Structure

- **Global Store** (`global.js`): Manages user authentication, tokens, and user details
- **Movie Store** (`movieStore.js`): Handles movie data, comments, and loading states

## Technologies Used

### Core Framework & Runtime

- **Vue 3**: Progressive JavaScript framework with Composition API
- **Vite**: Fast build tool and development server
- **Node.js**: JavaScript runtime for development tools

### UI & Styling

- **Bootstrap 5**: CSS framework for responsive design
- **Bootstrap Icons**: Icon library
- **Custom CSS**: Extensive use of CSS custom properties for theming

### State Management & Routing

- **Pinia**: Intuitive state management library for Vue
- **Vue Router**: Official routing library for Vue

### HTTP & Authentication

- **Axios**: Promise-based HTTP client with request interception
- **JWT**: JSON Web Tokens for authentication

### User Experience

- **Notyf**: Modern toast notification library
- **CSS Animations**: Custom animations and transitions

### Development Tools

- **ESLint**: Code linting (implied by Vite setup)
- **Vite Dev Server**: Hot module replacement during development

## Features

### Core Features

- **Movie Catalog**: Browse and search through movie collections
- **Movie Details**: View comprehensive information about individual movies
- **User Authentication**: Register, login, and logout functionality
- **Comments System**: Users can add and view comments on movies
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Administrative Features

- **Admin Dashboard**: Separate interface for administrators
- **Movie Management**: Add, update, and delete movies from the catalog
- **User Role Management**: Differentiated access based on user roles

### User Experience Features

- **Hero Section**: Engaging landing page with background video
- **Dark Theme**: Consistent dark color scheme for streaming aesthetic
- **Loading States**: Skeleton loading and progress indicators
- **Error Handling**: Comprehensive error states and user feedback
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

## User Roles and Permissions

### Guest User

- View homepage
- Browse movie catalog (limited)
- Access registration and login pages

### Authenticated User

- All guest permissions
- Full access to movie details and comments
- Add comments to movies
- View user profile information

### Administrator

- All authenticated user permissions
- Add new movies to the catalog
- Edit existing movie information
- Delete movies from the catalog
- Access administrative functions

## API Endpoints

The application communicates with a separate backend API. Endpoints are configured via environment variables.

### Authentication Endpoints

- `POST /users/login` - User authentication
- `GET /users/details` - Retrieve user profile information

### Movie Endpoints

- `GET /movies/getMovies` - Retrieve movie catalog
- `GET /movies/getMovie/{id}` - Get specific movie details
- `POST /movies/addMovie` - Add new movie (Admin only)
- `PATCH /movies/updateMovie/{id}` - Update movie (Admin only)
- `DELETE /movies/deleteMovie/{id}` - Delete movie (Admin only)

### Comments Endpoints

- `GET /movies/getComments/{movieId}` - Retrieve comments for a movie
- `POST /movies/addComment` - Add comment to a movie
- `DELETE /movies/deleteComment/{commentId}` - Delete comment (own comments only)

## Environment Configuration

The application requires the following environment variables:

```bash
VITE_MOVIE_CATALOG_APP_API=<backend_api_base_url>
```

Example `.env` file:

```bash
VITE_MOVIE_CATALOG_APP_API=http://localhost:3000/api
```

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API server running and accessible

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd movieAppClient
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**

   - Create a `.env` file in the root directory
   - Add the API endpoint configuration

4. **Start Development Server**

   ```bash
   npm run dev
   ```

5. **Open Browser**
   - Navigate to `http://localhost:5173` (default Vite port)

### Build for Production

```bash
npm run build
npm run preview
```

## Usage

### For Users

1. **Registration**: Create an account using the Register page
2. **Login**: Authenticate using email and password
3. **Browse Movies**: Navigate to the Movies page to explore the catalog
4. **View Details**: Click on any movie to see detailed information and comments
5. **Add Comments**: Share thoughts and opinions on movies
6. **Logout**: Securely end the session

### For Administrators

1. **Admin Login**: Login with administrator credentials
2. **Manage Catalog**: Access movie management functions
3. **Add Movies**: Use the Add Movie form to add new entries
4. **Edit Movies**: Update movie information as needed
5. **Delete Movies**: Remove movies from the catalog

## Deployment

### Production Build

1. Configure production environment variables
2. Run build command:
   ```bash
   npm run build
   ```
3. Deploy the `dist/` folder to your web server

### Recommended Deployment Platforms

- **Netlify**: Excellent for SPAs with automatic deployments
- **Vercel**: Optimized for Vue applications
- **AWS S3 + CloudFront**: Scalable static hosting
- **Docker**: Containerize the application for consistent deployment

### Environment Variables for Production

Ensure production environment variables are properly configured in your deployment platform.

## Security Considerations

### Authentication

- JWT tokens stored in localStorage with automatic cleanup
- Token validation on each API request via interceptors
- Secure logout functionality with token removal

### Authorization

- Role-based access control (User vs Admin)
- Frontend route protection
- API-level permission checks

### Data Protection

- Client-side validation for user inputs
- Sanitization of user-generated content
- Secure API communication over HTTPS

### Best Practices

- Regular dependency updates
- Code reviews for security vulnerabilities
- Environment-specific configurations
- Proper error handling without exposing sensitive information

## Performance Optimizations

### Build Optimizations

- Vite's zero-config optimization
- Tree-shaking for unused dependencies
- Code splitting and lazy loading

### Runtime Optimizations

- Reactive state updates for efficient re-rendering
- Image optimization and placeholder loading
- Progressive loading of content
- Debounced API calls where applicable

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Search and filtering functionality
- User watchlists/favorites
- Streaming video integration
- Social features (sharing, ratings)
- Multi-language support
- Advanced admin analytics
- Push notifications
- Progressive Web App (PWA) features

---

**Last Updated**: December 4, 2025
**Version**: 1.0.0
**Authors**: [Project Team]
