# GreenDetective

GreenDetective is a web application designed to help journalists and researchers identify potential greenwashing in corporate communications through AI-powered analysis.

## Features

- Analyze company websites and documents for environmental claims
- Multi-step submission form for analysis requests
- Dashboard to track and manage analysis reports
- Light/dark theme support
- Responsive design for mobile and desktop

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 14
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Custom components built with [Radix UI](https://www.radix-ui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **State Management**: React Context
- **Notifications**: Custom toast system

## Getting Started

1. Install dependencies:
```bash
npm install

```
2. Run the development server:
```bash
npm run dev
```

3. Open http://localhost:3000 in your browser.

Project Structure

```bash
├── app/                   # Next.js app directory
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── dashboard/        # Dashboard page
│   ├── login/           # Login page
│   ├── submit/          # Analysis submission page
│   └── layout.tsx       # Root layout
├── components/           # React components
│   ├── ui/              # Reusable UI components
│   └── Logo.tsx         # Logo component
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── public/             # Static assets
└── styles/             # Global styles
```

## License
This project is proprietary software. All rights reserved.