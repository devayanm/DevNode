<p align="center">
  <img src="https://your-logo-url.com/logo.png" alt="DevNode Logo" width="200">
</p>

<h1 align="center">DevNode - Empowering Developers to Share Knowledge</h1>

<p align="center">
  <strong>A modern blogging platform for developers, featuring real-time collaboration, GitHub integration, and a sleek UI.</strong>
</p>

<p align="center">
  <a href="https://github.com/devayanm/devnode/actions/workflows/ci.yml"><img src="https://github.com/devayanm/devnode/actions/workflows/ci.yml/badge.svg" alt="CI"></a>
  <a href="https://github.com/devayanm/devnode"><img src="https://img.shields.io/github/stars/devayanm/devnode?style=social" alt="GitHub stars"></a>
  <a href="https://github.com/devayanm/devnode/issues"><img src="https://img.shields.io/github/issues/devayanm/devnode" alt="GitHub issues"></a>
  <a href="https://github.com/devayanm/devnode/blob/main/LICENSE"><img src="https://img.shields.io/github/license/devayanm/devnode" alt="GitHub license"></a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#installation">Installation</a> •
  <a href="#running-the-application">Running the Application</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a>
</p>

---

## Features

- 🎨 **Beautiful UI**: Modern, responsive design with customizable themes.
- ⚡ **Real-time Collaboration**: Edit posts with others in real-time.
- 📝 **Rich Text Editor**: Quill-powered editor with support for code, images, and more.
- 🔍 **Search & Filter**: Easily find posts by title, author, or category.
- 🔗 **GitHub Integration**: Embed GitHub gists and code snippets.
- 💾 **Auto-Save Drafts**: Never lose your work with automatic draft saving.
- 💬 **Commenting System**: Engage readers with a built-in comment section.
- 👤 **User Profiles**: Personalize profiles with avatars and bios.
- 📈 **SEO Optimized**: Get your posts noticed with built-in SEO tools.

---

## Technologies Used

<div align="center">

![React](https://img.shields.io/badge/-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/-Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Quill](https://img.shields.io/badge/-Quill-0069B4?style=for-the-badge&logo=quill&logoColor=white)

</div>

---

## Project Structure

```plaintext
DevNode/
├── client/                   # Frontend source code
│   ├── public/               # Public assets
│   ├── src/                  # Source files
│   │   ├── components/       # Reusable components
│   │   ├── pages/            # Application pages
│   │   ├── styles/           # Global styles and themes
│   │   ├── utils/            # Utility functions
│   │   └── App.js            # Root component
├── server/                   # Backend source code
│   ├── controllers/          # Route controllers
│   ├── models/               # Mongoose schemas and models
│   ├── routes/               # API route definitions
│   ├── middleware/           # Express middleware
│   └── app.js                # Main application setup
├── config/                   # Configuration files
├── docker/                   # Docker-related files
├── .env.example              # Environment variables example
├── .gitignore                # Files to ignore in Git
├── README.md                 # Project documentation
└── package.json              # Node.js dependencies and scripts
```

---

## Installation

### Prerequisites

- **Node.js** (v14 or above)
- **MongoDB** (v4 or above)
- **Docker** (optional for containerization)

### Steps

1. **Clone the repository:**

    ```bash
    git clone https://github.com/devayanm/devnode.git
    cd devnode
    ```

2. **Install dependencies:**

    For the backend:

    ```bash
    cd server
    npm install
    ```

    For the frontend:

    ```bash
    cd client
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file in the `server` directory using `.env.example` as a template and fill in the necessary variables.

---

## Running the Application

### Using Docker

1. **Build and start the Docker containers:**

    ```bash
    docker-compose up --build
    ```

2. **Access the application:**

    - Frontend: `http://localhost:3000`
    - Backend: `http://localhost:5000/api`

### Without Docker

1. **Start the backend server:**

    ```bash
    cd server
    npm run dev
    ```

2. **Start the frontend server:**

    ```bash
    cd client
    npm start
    ```

---

## Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository.**
2. **Create a feature branch:**

    ```bash
    git checkout -b feature/YourFeatureName
    ```

3. **Commit your changes:**

    ```bash
    git commit -m "Add some feature"
    ```

4. **Push to your branch:**

    ```bash
    git push origin feature/YourFeatureName
    ```

5. **Create a Pull Request.**

---

## License

This project is licensed under the MIT License.

---

## Contact

For any inquiries, issues, or feature requests, please reach out to:

<p align="center">
  <a href="https://github.com/devayanm"><img src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white"></a>
  <a href="mailto:devayan9689@gmail.com"><img src="https://img.shields.io/badge/-Email-D14836?style=for-the-badge&logo=gmail&logoColor=white"></a>
</p>
