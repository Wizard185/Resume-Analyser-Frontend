

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
# ATS Resume Analyzer 🚀

An **AI-powered ATS (Applicant Tracking System) Resume Analyzer** built using the **MERN stack**. This project helps users analyze resumes against a given Job Description (JD), calculate ATS compatibility scores, and get actionable feedback using AI.

---

## ✨ Features

* 📄 Upload resume (PDF)
* 📝 Paste or upload Job Description
* 🤖 AI-based resume vs JD analysis
* 📊 ATS score & skill match breakdown
* 🗂️ Resume analysis history
* 🗑️ Delete individual or all analysis records
* 🔐 Secure backend with environment variables

---

## 🛠️ Tech Stack

### Frontend

* React (JavaScript + JSX)
* Axios
* Tailwind CSS / CSS (if used)

### Backend

* Node.js
* Express.js
* MongoDB
* Multer (file uploads)
* Google AI / LLM API

---

## 📁 Project Structure

```bash
root/
│── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   └── server.js
│   ├── package.json
│   └── .env
│
│── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ats-resume-analyzer.git
cd ats-resume-analyzer
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
AI_API_KEY=your_api_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`

---

## 🔑 Environment Variables

| Variable   | Description               |
| ---------- | ------------------------- |
| PORT       | Backend server port       |
| MONGO_URI  | MongoDB connection string |
| AI_API_KEY | AI service API key        |

⚠️ **Never commit `.env` files to GitHub**

---

## 📸 Screenshots

*Add screenshots here*

---

## 🚀 Future Enhancements

* User authentication
* Resume suggestions & improvements
* JD auto-generation
* Multi-resume comparison
* Export analysis as PDF

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch
3. Commit changes
4. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

**Kishore Chandra N**
GitHub: [https://github.com/your-username](https://github.com/your-username)

---

⭐ If you like this project, consider giving it a star!
