# Implementation Plan: Fix Backend 500 Error on /api/auth/login

## Root Cause Analysis

The 500 Internal Server Error is caused by **double-wrapping the Drizzle ORM instance**:

1. In `backend/src/index.ts` line 32, a Drizzle instance is created: `const db = drizzle(sql)`
2. In line 47, the runtime environment stores the raw `sql` connection: `runtimeEnv: Env = { DB: sql, ... }`
3. In the `/api/auth/login` endpoint (line 75), the code wraps it again: `const db = drizzle(c.env.DB)`
4. This creates `drizzle(drizzle(sql))` which is invalid and throws a runtime error
5. Because the error occurs BEFORE the response is sent, CORS headers are never attached, causing the misleading CORS error in browsers

Secondary issue: The `dotenv` configuration at lines 12-13 loads from `../.env.local` which may not exist, and `bootstrapAdmin()` may fail silently if environment variables aren't loaded.

## Implementation Steps

- [ ] 1. **Fix the Drizzle double-wrapping issue throughout the codebase**
      Change `c.env.DB` to store the Drizzle instance instead of the raw SQL connection, and update all endpoints that call `drizzle(c.env.DB)` to use `c.env.DB` directly.
      Files: `backend/src/index.ts`, `backend/src/types.ts`
      Verify: Run `npm run dev` in backend directory, then test with `curl -X POST http://localhost:8787/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"tolesatesfaye273@gmail.com\",\"password\":\"702512@Tol\"}"` - should return 200 with a token, not 500.

- [ ] 2. **Fix environment variable loading for local development**
      Update the dotenv configuration to load from `.dev.vars` instead of `../.env.local` since that's the file that contains the correct environment variables.
      Files: `backend/src/index.ts`
      Verify: Check server startup logs show "Created admin account for tolesatesfaye273@gmail.com" or admin account already exists silently.

- [ ] 3. **Add error logging to the login endpoint for debugging**
      Wrap the login endpoint logic in a try-catch block that logs the actual error before returning a 500 response, so future errors are easier to diagnose.
      Files: `backend/src/index.ts`
      Verify: Trigger an error (e.g., invalid database connection) and confirm the console shows the actual error message, not just "Internal server error".

- [ ] 4. **Test the complete authentication flow**
      Test the entire flow: admin bootstrap on startup, login with correct credentials (200 + token), login with wrong credentials (401), and verify CORS headers are present in all responses.
      Files: None (verification only)
      Verify: 
      - `curl -X POST http://localhost:8787/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"tolesatesfaye273@gmail.com\",\"password\":\"702512@Tol\"}"` returns 200 with `{"email":"tolesatesfaye273@gmail.com","token":"..."}` and includes `Access-Control-Allow-Origin` header
      - `curl -X POST http://localhost:8787/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"tolesatesfaye273@gmail.com\",\"password\":\"wrong\"}"` returns 401 with CORS headers
      - Browser login from http://localhost:5173/admin works without CORS errors
      - Backend logs show "Created admin account for tolesatesfaye273@gmail.com" on first run or runs silently if admin exists

## Expected Outcome

- Backend starts without errors and creates the admin account
- POST to `/api/auth/login` with correct credentials returns 200 with JWT token
- POST to `/api/auth/login` with incorrect credentials returns 401 
- All responses include proper CORS headers
- No 500 errors
- Browser can successfully authenticate from http://localhost:5173/admin

## Technical Details

**Current Problematic Code Pattern:**
```typescript
const db = drizzle(c.env.DB);  // c.env.DB is already wrapped OR is raw sql
const admin = (await db.select().from(admins)...)[0];
```

**Correct Pattern After Fix:**
```typescript
const admin = (await c.env.DB.select().from(admins)...)[0];
// c.env.DB is now the Drizzle instance, use it directly
```

**Affected Endpoints:** All CRUD endpoints in `index.ts` that use `drizzle(c.env.DB)` pattern (login, logout, setup, all CRUD operations, profile, contact, messages, projects).
