## Overview

Grade Calculator is a web application that helps users calculate grades based on their input.

## Features

- Enter user name and score
- Automatically calculate and display grade
- Validation for existing name and valid score input

## Tech Stack

- **Language**: TypeScript
- **Frontend**: React 19.1.0, React DOM 19.1.0
- **Framework**: Next.js 15.3.3
- **UI Library**: Tailwind CSS 3.4.17, SweetAlert2 11.22.1

## Installation

1. Install dependencies

```bash
yarn install
```

2. Start development server

```bash
yarn dev
```

3. Open in browser

```bash
http://localhost:3000/
```

## Project Structure

```bash
src/
├── components/
│   ├── stepContainer.tsx
│   ├── stepName.tsx
│   ├── stepResult.tsx
│   └── stepScore.tsx
├── pages/
│   ├── api/
│   │   └── rest_api.tsx
│   └── grade/
│       └── index.tsx
└── styles/
    └── global.css
```

#### Folder & File Descriptions

- `components/`: Contains UI components used across the app
  - `stepContainer.tsx`: Main container that controls step flow and manages overall state
  - `stepName.tsx`: Form for entering student name with validation and navigation buttons
  - `stepScore.tsx`: Score input form with validation and navigation buttons
  - `stepResult.tsx`: Displays the calculated grade result
- `pages/`: Page components and route handling (Next.js)
  - `api/rest_api.tsx`: Contains frontend API functions to call the backend
  - `grade/index.tsx`: Grade Calculator page that uses server-side rendering (`getServerSideProps`) to fetch initial grade data and renders the UI with `StepContainer`.
- `styles/`: Styling assets for the web application
  - `global.css`: Tailwind CSS directives and global styles

#### API Functions

Defined in: `pages/api/rest_api.tsx`

- `getGrades()`: Fetch all grades from backend (`GET`)
- `checkNameExists()`: Check if a name already exists (`GET`)
- `createGrade()`: Submit a new grade entry (`POST`)
- `updateGrade()`: Update grade information by ID (`PATCH`)
- `deleteGrade()`: Delete a grade entry by ID (`DELETE`)

#### Type Definitions

- `GradeEntity`: Represents a grade record
- `CreateGradeDto`: Used when submitting a new grade
- `UpdateGradeDto`: Used for updating an existing grade (optional fields)
