# Mini Blog API

A **RESTful Mini Blog API** with authentication and a React frontend.

---

## Project Structure

```
mini-blog/
 ├─ backend/                # Express.js backend
 │   ├─ server.js
 │   ├─ routes/
 │   ├─ controllers/
 │   ├─ models/
 │   └─ middleware/
 └─ mini-blog-frontend/      # React frontend
     ├─ src/
     ├─ public/
     └─ package.json
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/mini-blog.git
cd mini-blog
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Install frontend dependencies

```bash
cd ../mini-blog-frontend
npm install
```

---

## Running the Project

### 1. Start backend server

```bash
cd backend
npm run dev
```

- Backend runs on: `http://localhost:5000`

### 2. Start frontend React app

```bash
cd ../mini-blog-frontend
npm start
```

- Frontend runs on: `http://localhost:3000`
- Make sure **backend is running** before using the frontend.

---

## API Routes (Backend)

### Authentication
- `POST /auth/register` → Register user
- `POST /auth/login` → Login user, returns JWT

### Posts
- `GET /posts` → Get all posts
- `GET /posts/:id` → Get post by ID
- `POST /posts` → Create post (authenticated)
- `PUT /posts/:id` → Update post (authenticated, owner only)
- `DELETE /posts/:id` → Delete post (authenticated, owner only)

---



## Optional Features

- Pagination: `/posts?page=1&limit=5`
- Search posts by title: `/posts?search=keyword`

---

## Technologies Used

- **Backend:** Node.js, Express.js, JWT Authentication
- **Frontend:** React.js
- **Database:** MongoDB (or your preferred database)

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
