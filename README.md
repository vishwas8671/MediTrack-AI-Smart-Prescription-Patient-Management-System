# MediTrack AI – Smart Prescription & Patient Management System

MediTrack AI is a production-grade healthcare SaaS platform designed for doctors and patients. It features AI-powered prescription OCR, drug interaction warnings, and comprehensive patient record management.

## 🚀 Features

- **Doctor Dashboard**: Patient analytics, inflows, and critical alerts.
- **Patient Dashboard**: Daily medicine schedules, health tips, and report tracking.
- **AI OCR**: Extract medication details from handwritten/digital prescriptions using Tesseract.js.
- **Drug Safety**: Interaction warnings powered by OpenFDA logic.
- **Secure Auth**: Role-based access control (RBAC) with JWT.
- **Modern UI**: Built with Tailwind CSS 4, Framer Motion, and Lucide icons.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS 4, Framer Motion, Recharts, Axios.
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT, Multer.
- **AI**: Tesseract.js (OCR), OpenFDA API integration.

## 📦 Installation

### Backend
1. Navigate to the `server` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file (one is provided by default) and set your `MONGO_URI`.
4. Start the server:
   ```bash
   npm run dev
   ```

### Frontend
1. Navigate to the `client` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔑 Authentication
- **Doctor Role**: Full access to all patients and prescriptions.
- **Patient Role**: Access to own medical data, schedules, and reports.

## 📄 License
ISC
