# Backend

## Getting Started

Install dependencies and run the backend server:

```
npm install
docker compose up
npm run seed
npm run dev
```

The backend will be available at `http://localhost:3000`.

## API Documentation (for Frontend Developers)

### Interactive API Docs (Swagger UI)

- Visit: [http://localhost:3000/api/ui](http://localhost:3000/api/ui)
- You can view all available endpoints, their parameters, and try out requests directly from the browser.

### OpenAPI (Swagger) JSON

- Visit: [http://localhost:3000/api/doc](http://localhost:3000/api/doc)
- This is the machine-readable OpenAPI 3.0 spec. You can use this to generate API clients or for IDE integration.

### How to Use in the Frontend

1. **Base URL:**
    - All API endpoints are prefixed with `/api`.
    - Example: `GET http://localhost:3000/api/draws` or `POST http://localhost:3000/api/prizes`

2. **Explore Endpoints:**
    - Use [Swagger UI](http://localhost:3000/api/ui) to see all endpoints, required parameters, and example responses.

3. **Making Requests (Example in JS/TS):**

    ```js
    // Example: Fetch all draws
    fetch('http://localhost:3000/api/draws')
        .then((res) => res.json())
        .then((data) => console.log(data))

    // Example: Initiate a draw (POST)
    fetch('http://localhost:3000/api/draws', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            /* your payload here */
        })
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
    ```

4. **TypeScript Types:**
    - You can generate types or API clients using the OpenAPI JSON at `/api/doc` with tools like [openapi-typescript](https://github.com/drwpow/openapi-typescript) or [Swagger Codegen](https://swagger.io/tools/swagger-codegen/).

5. **Error Handling:**
    - All errors are returned as JSON with an appropriate HTTP status code and error message.

## Useful Links

- [Swagger UI](http://localhost:3000/api/ui)
- [OpenAPI JSON](http://localhost:3000/api/doc)

---

```

```
