Book Catalog Backend API

Steps:
1. Rename .env.example → .env
2. Add MongoDB URI + JWT secret
3. npm install
4. npm start

APIs:
POST /api/users/register
POST /api/users/login
GET /api/books
GET /api/books/:id
POST /api/books (JWT required)
PUT /api/books/:id (JWT required)
DELETE /api/books/:id (JWT required)
