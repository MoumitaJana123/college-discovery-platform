# 🎓 College Discovery Platform

A modern full-stack web application that helps students discover, explore, and compare top colleges across India.

## 🚀 Live Demo
- **Frontend:** https://college-discovery-platform-mauve.vercel.app/
- **Backend API:** https://college-discovery-platform-28zm.onrender.com/api/colleges
- **Demo Video:**https://drive.google.com/file/d/1HT4qd3kHhVMQwsf2ly67YjlLLCStyuy2/view?usp=sharing

## ✨ Key Features
* 🔍 **Search:** Find colleges by name instantly.
* 📍 **Filter:** Sort by locations, and courses.
* 🏫 **Dynamic Detail Pages:** Structured overview of placements, courses, and fees using dynamic routing.
* ⚖️ **College Comparison Engine:** A high-priority decision tool allowing side-by-side comparison of fees, ratings, and placement percentages.
* ⚡ **Fast API:** Optimized Node/Express backend.
* 📱 **Responsive:** Mobile-friendly UI built with Tailwind/CSS.

## 🛠️ Tech Stack
* **Frontend:** React.js
* **Backend:** Node.js, Express.js
* **Database:** PostgreSQL (Supabase)
* **Deployment:** Vercel (Frontend), Render (Backend)

## 📂 Project Structure
```text
college-discovery-platform/
│
├── frontend/             # Client-side React application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── backend/              # Server-side Node.js API
│   ├── index.js
│   ├── package.json
│   └── .env              # Environment variables (Git-ignored)
│
└── README.md

🧑‍💻 Installation & Local Setup
To run this project on your local machine, follow these steps:

### 1. Clone the repository
```bash
git clone [https://github.com/MoumitaJana123/college-discovery-platform.git]
cd college-discovery-platform

###2. Setup the Backend
cd backend
npm install
Note: Create a .env file in the /backend folder and add your DATABASE_URL (PostgreSQL connection string).
node index.js

###3. Setup the Frontend
cd ../frontend
npm install
npm start

###📡 API Endpoints
The backend API is designed to handle dynamic queries for the discovery platform:
GET/api/colleges : Retrieves all colleges
GET/api/colleges?name=IIT  : Search colleges by name
GET/api/colleges?location=Mumbai : Filter colleges by city

##🔥 Key Learnings
Full-Stack Integration: Connecting a React frontend to a live PostgreSQL database via an Express server.

Production Deployment: Configuring CI/CD pipelines on Vercel and Render for automatic updates.

Database Management: Writing optimized SQL queries and managing connection pools with Supabase.

##👩‍💻 Author
Moumita Jana GitHub: https://github.com/MoumitaJana123

##📜 License
  This project is developed for educational, learning, and portfolio purposes.
