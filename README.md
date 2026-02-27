# HTML to PDF API (Node.js)

This project exposes two endpoints:

1. `POST /api/auth/token` - generate a non-expiring access token.
2. `POST /api/pdf/generate` - authenticated endpoint to convert HTML into PDF and return it immediately.

No login/signup is required.

## Project Structure

```text
api/
  index.js
src/
  config/
    env.js
  controllers/
    authController.js
    pdfController.js
  middlewares/
    authMiddleware.js
  routes/
    authRoutes.js
    pdfRoutes.js
  services/
    tokenService.js
    pdfService.js
  app.js
  server.js
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env` from `.env.example` and set values:
   - `JWT_SECRET` (required)

## Run Locally

```bash
npm run dev
```

Health check:

```bash
GET http://localhost:3000/health
```

## Endpoints

### 1) Generate Access Token (non-expiring)

`POST /api/auth/token`


Example response:

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "tokenType": "Bearer",
  "expiresIn": null,
  "note": "This token does not expire unless JWT_SECRET is changed."
}
```

### 2) HTML to PDF (authenticated)

`POST /api/pdf/generate`

Required header:

```text
Authorization: Bearer <access_token>
```

Body options:

- JSON: `{ "html": "<html>...</html>" }`
- Raw text/html body

Returns: PDF file in the same response (`application/pdf`).

## n8n Usage

In n8n HTTP Request node for `/api/pdf/generate`:

- Method: `POST`
- Authentication: None (manual header)
- Headers:
  - `Authorization: Bearer <your_token>`
  - `Content-Type: application/json`
- Body (JSON):
  ```json
  {
    "html": "<html><body><h1>Hello from n8n</h1></body></html>"
  }
  ```
- Response Format: `File`

## Deploy to Vercel

1. Push project to a Git repository.
2. Import in Vercel.
3. Set environment variables in Vercel Project Settings:
   - `JWT_SECRET`
   - `TOKEN_PAYLOAD` (optional)
4. Deploy.

The API will be served through `api/index.js` using `serverless-http`.
