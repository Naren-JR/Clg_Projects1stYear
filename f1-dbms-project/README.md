# F1 CENTRAL & DB

A full-stack Formula 1 Database Management System developed as a college mini-project.
This project manages F1-related data such as teams, drivers, races, circuits, standings, and visitor registrations using a MySQL backend with a responsive frontend interface.

##Features
Team and Driver Management
Race & Circuit Information
Championship Standings
Visitor Registration System
Dynamic Data Fetching using APIs
CSV-based Bulk Data Seeding
Responsive Frontend UI
Relational Database Design with Foreign Keys
Admin-side Data Handling

## Features

- Team and Driver Management
- Race & Circuit Information
- Championship Standings
- Visitor Registration System
- Dynamic Data Fetching using APIs
- CSV-based Bulk Data Seeding
- Responsive Frontend UI
- Relational Database Design with Foreign Keys
- Admin-side Data Handling

---

## Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js
- PHP (for selected admin/API operations)

### Database
- MySQL

### Tools & Platforms
- Git & GitHub
- VS Code
- XAMPP / MySQL Server

---

## Database Modules

The project includes multiple interconnected tables such as:

- Teams
- Drivers
- Circuits
- Races
- Seasons
- Standings
- Visitors
- Registrations

Relationships were implemented using:
- Primary Keys
- Foreign Keys
- Joins
- Constraints

Indexes were used on frequently queried columns to improve query performance during joins and aggregations.

---

## Project Structure
```bash
f1-dbms-project/
│
├── backend/
├── public/
├── src/
├── .gitignore
├── .hintrc
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
└── vite.config.js
```
## Key Functionalities

### Driver & Team Management
Store, manage, and retrieve Formula 1 driver and team information.

### Race Management
Maintain race schedules, race details, and circuit information.

### Championship Standings
Display standings dynamically based on race results.

### Visitor Registration
Visitors can submit registration forms through the frontend interface and data gets stored directly into the database.

### CSV Data Seeding
Large datasets were inserted efficiently using automated CSV seeding scripts instead of manual SQL insertion.

---

## API Integration

REST-style API endpoints were implemented for frontend-backend communication.

Example functionalities:
- Fetch Teams
- Fetch Drivers
- Fetch Standings
- Submit Visitor Registrations

---

## Installation & Setup

### Clone the Repository
```bash
git clone https://github.com/Naren-JR/Clg_Projects1stYear.git
```

### Navigate to Project Directory
```bash
cd Clg_Projects1stYear/f1-dbms-project
```

### Install Dependencies
```bash
npm install
```

### Configure Database

1. Create a MySQL database  
2. Import SQL files into MySQL  
3. Update database credentials in backend configuration files  

### Start the Development Server
```bash
npm run dev
```

### Start Backend Server
```bash
node server.js
```

---
## Learning Outcomes

- Relational Database Design
- MySQL Query Handling
- API Development using Express.js
- Frontend and Backend Integration
- CSV-based Bulk Data Management
- GitHub Collaboration Workflow

---
## Future Enhancements

- Authentication System
- Admin Dashboard
- Live Race Updates
- Driver Comparison System
- Advanced Statistics and Analytics
- Search and Filter Features

---
## Contributors

- Praful 
- Naren 
---

## Repository
GitHub Repository:  
https://github.com/Naren-JR/Clg_Projects1stYear/tree/main/f1-dbms-project





This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler
The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
