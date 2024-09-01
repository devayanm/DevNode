<p align="center">
  <img src="client/src/assets/devnode-nav.png" alt="DevNode Logo" width="200">
</p>

<h1 align="center">DevNode</h1>
<h2 align="center">Empowering Developers to Share Knowledge</h2>

<p align="center">
  <strong>A modern blogging platform for developers, featuring real-time collaboration, GitHub integration, and a sleek UI.</strong>
</p>

<p align="center">
  <a href="https://github.com/devayanm/devnode/actions/workflows/ci.yml">
    <img src="https://github.com/devayanm/devnode/actions/workflows/ci.yml/badge.svg" alt="CI">
  </a>
  <a href="https://github.com/devayanm/devnode">
    <img src="https://img.shields.io/github/stars/devayanm/devnode?style=social" alt="GitHub stars">
  </a>
  <a href="https://github.com/devayanm/devnode/issues">
    <img src="https://img.shields.io/github/issues/devayanm/devnode" alt="GitHub issues">
  </a>
  <a href="https://github.com/devayanm/devnode/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/devayanm/devnode" alt="GitHub license">
  </a>
  <a href="https://devnode.vercel.app">
    <img src="https://img.shields.io/badge/Deployed%20On-Vercel-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel">
  </a>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#technologies-used">Technologies Used</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#installation">Installation</a> •
  <a href="#running-the-application">Running the Application</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#license">License</a> •
  <a href="#contact">Contact</a>
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

## 🌟 Technologies Used

DevNode leverages a powerful stack of technologies for a seamless blogging experience:

### **Frontend**

- **React** ![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white): A JavaScript library for building user interfaces.
- **Material-UI** ![Material-UI](https://img.shields.io/badge/Material--UI-007FFF?style=flat-square&logo=material-ui&logoColor=white): A UI framework with a comprehensive set of components.
- **Quill** ![Quill](https://img.shields.io/badge/Quill-000000?style=flat-square&logo=quill&logoColor=white): A modern rich text editor for the web.
- **Formik** ![Formik](https://img.shields.io/badge/Formik-000000?style=flat-square&logo=formik&logoColor=white): A library for managing form state and validation.
- **Yup** ![Yup](https://img.shields.io/badge/Yup-000000?style=flat-square&logo=yup&logoColor=white): A schema builder for value parsing and validation.

### **Backend**

- **Node.js** ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white): A JavaScript runtime environment for server-side applications.
- **Express.js** ![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white): A minimal and flexible Node.js web application framework.
- **MongoDB** ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white): A NoSQL database for scalable and flexible data storage.
- **Mongoose** ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=flat-square&logo=mongoose&logoColor=white): ODM library for MongoDB and Node.js.

### **Image & Media Management**

- **Cloudinary** ![Cloudinary](https://img.shields.io/badge/Cloudinary-8F4DAB?style=flat-square&logo=cloudinary&logoColor=white): A cloud service for managing images and videos.

### **Authentication & Security**

- **JWT (JSON Web Tokens)** ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=json-web-tokens&logoColor=white): Compact means of representing claims between two parties.

### **Others**

- **Prettier** ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=white): Ensures consistent code formatting.
- **Vercel** ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white): Deployment platform for static sites and serverless functions.

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

    Create a `.env` file in the `server` directory using `.env.example` as a template and fill in your environment variables.

4. **Run the application:**

    - **Backend:** 
        ```bash
        cd server
        npm start
        ```

    - **Frontend:** 
        ```bash
        cd client
        npm start
        ```

    The application will be accessible at [http://localhost:3000](http://localhost:3000) by default.

5. **Optional - Run with Docker:**

    To run the application with Docker, make sure Docker is installed and then use the following commands:

    ```bash
    docker-compose up
    ```

    This will build and start the containers for both the frontend and backend.

---

## Contributing

We welcome contributions to DevNode! To get started:

1. **Fork the repository** on GitHub.
2. **Clone your forked repository** to your local machine.
3. **Create a new branch** for your changes:
    ```bash
    git checkout -b my-feature-branch
    ```
4. **Make your changes** and **commit them**:
    ```bash
    git commit -am 'Add new feature'
    ```
5. **Push your changes** to your forked repository:
    ```bash
    git push origin my-feature-branch
    ```
6. **Submit a pull request** on GitHub with a clear description of your changes.

For more details, please refer to our [Contributing Guidelines](CONTRIBUTING.md).

---

## License

DevNode is licensed under the [MIT License](LICENSE).

---

## Contact

For any questions or support, please reach out to us:

- **Email:** [support@devnode.com](mailto:support@devnode.com)
- **Twitter:** [@devnode](https://twitter.com/devnode)
- **GitHub:** [DevNode Repository](https://github.com/devayanm/devnode)

<p align="center">
  <img src="https://img.shields.io/badge/Connect%20With%20Us-@devnode-00A3E0?style=flat-square&logo=twitter&logoColor=white" alt="Twitter">
  <img src="https://img.shields.io/badge/Follow%20Us%20On%20GitHub-DevNode-000000?style=flat-square&logo=github&logoColor=white" alt="GitHub">
</p>

---

<p align="center">
  <a href="https://devnode.vercel.app">
    <img src="https://your-deployed-app-screenshot-url.com/screenshot.png" alt="DevNode Screenshot" width="800">
  </a>
</p>

---

**DevNode** – Empowering developers to share and grow together.
