# Fitness Center Management

A modern web application for managing fitness centers, built with React, TypeScript, and Tailwind CSS.

## Features

- User authentication (login/register)
- Dashboard for fitness center management
- Training plans management
- Diet plans management
- Medical reports management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd fitness-center
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

To create a production build:

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/     # Reusable UI components
  ├── pages/         # Page components
  ├── lib/           # Utility functions and hooks
  ├── styles/        # Global styles
  ├── App.tsx        # Main application component
  └── main.tsx       # Application entry point
```

## Technologies Used

- React
- TypeScript
- React Router
- Tailwind CSS
- Radix UI
- Vite

## License

MIT 