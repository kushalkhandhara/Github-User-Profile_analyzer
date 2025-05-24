# 🚀 GitHub Profile Analyzer

**GitHub Profile Analyzer** is a React.js-based web application that allows users to search and analyze any GitHub user's public profile. It provides insights into repositories, daily commits, and more — all visualized through interactive charts.

## 🛠️ Features

- 🔍 Search and analyze any public GitHub profile
- 📊 Visualize commit activity and repository stats using Recharts
- ⚡ Fast and responsive UI built with React.js
- 🔐 Secure API access with personal GitHub token to avoid rate limits

---

## 📦 Tech Stack

- React.js
- Recharts (for data visualization)
- Tailwind CSS (if used)
- GitHub REST API v3

---

## 🧑‍💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/github-profile-analyzer.git
cd github-profile-analyzer
2. Install dependencies
bash
Copy
Edit
npm install
3. Set up environment variables
Create a .env file in the root directory and add your GitHub token:

env
Copy
Edit
VITE_GITHUB_TOKEN=your_github_token_here
⚠️ Note: Never share your GitHub token publicly. This token helps bypass API rate limits and is required for authenticated requests.

4. Run the development server
bash
Copy
Edit
npm run dev
