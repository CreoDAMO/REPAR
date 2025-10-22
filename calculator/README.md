# Aequitas Protocol Advanced Financial Calculator

## Overview

The Aequitas Protocol Advanced Calculator is a sophisticated financial modeling platform for analyzing the REPAR native coin ecosystem and the $131 trillion addressable market opportunity.

## Features

- **Real-time Financial Analysis**: Instantaneous calculations across 25+ financial metrics
- **Scenario Exploration**: Create, save, and compare multiple financial scenarios
- **Sensitivity Analysis**: Analyze how changes in key variables impact outcomes
- **AI Simulation**: Model the Cerberus Engine's impact on asset recovery
- **Data Visualization**: Interactive charts and professional data presentation

## Technology Stack

- **Frontend**: React 19 + Tailwind CSS 4
- **Backend**: Express 4 + tRPC 11
- **Database**: MySQL/TiDB + Drizzle ORM
- **Authentication**: Manus OAuth
- **Visualization**: Recharts
- **Language**: TypeScript

## Getting Started

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env` file in the calculator directory:

```env
NODE_ENV=development
DATABASE_URL=mysql://user:password@localhost:3306/aequitas_calculator
PORT=3000
```

### Database Setup

```bash
# Generate and run migrations
npm run db:push
```

## API Documentation

See [CALCULATOR_DOCUMENTATION.md](../docs/financials/CALCULATOR_DOCUMENTATION.md) for complete API reference and usage guide.

## Deployment

The calculator is designed to be deployed as part of the Aequitas Protocol infrastructure on DigitalOcean via Docker Compose.

## License

See LICENSE files in the root directory.
