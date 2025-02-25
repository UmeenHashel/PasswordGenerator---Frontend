# Password Generator Frontend

This is the frontend for the **Password Generator** application, built with **React** and **Tailwind CSS**. It allows users to generate random passwords based on selected parameters. The frontend is deployed on **Vercel**.

---

## Features

- Choose password length (8-50 characters).
- Include/exclude uppercase letters, lowercase letters, numbers, and symbols.
- Option to exclude similar characters (e.g., `O` vs. `0`, `l` vs. `1`).
- Copy the generated password to the clipboard.
- Fully responsive UI.

---

## Live Demo

You can access the live version of the app here:
[Live Demo](https://your-vercel-deployment-url.com)

---

## Installation & Setup

### Prerequisites
- Node.js (v16 or later recommended)
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/yourusername/password-generator-frontend.git
cd password-generator-frontend
```

### Install Dependencies
```sh
npm install
# or
yarn install
```

### Environment Variables
Create a `.env` file in the root directory and add your backend URL:
```sh
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

### Run the Development Server
```sh
npm start
# or
yarn start
```
This will start the frontend on `http://localhost:3000/`.

---

## Deployment
The frontend is deployed using **Vercel**.

### Deploy to Vercel
1. Install the Vercel CLI (if not installed):
   ```sh
   npm install -g vercel
   ```
2. Run the deployment command:
   ```sh
   vercel
   ```
3. Follow the instructions to set up and deploy the project.

---

## Technologies Used
- **React** – Frontend framework
- **Tailwind CSS** – Styling
- **Axios** – API requests
- **Vercel** – Deployment

---

## License
This project is licensed under the **MIT License**.

---

## Author
Created by **Umeen Rathnayake**. 🚀



