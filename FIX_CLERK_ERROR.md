# URGENT: Fix Clerk Publishable Key Error

**Error:** "Publishable key not valid"  
**Cause:** `.env.local` has placeholder Clerk keys instead of real ones  
**Solution:** Get real Clerk API keys and update `.env.local`

---

## Step 1: Get Clerk API Keys

1. Go to https://dashboard.clerk.com
2. Sign in or create account
3. Click "API Keys" in left sidebar
4. Copy **Publishable Key** (starts with `pk_test_` or `pk_live_`)
5. Copy **Secret Key** (starts with `sk_test_` or `sk_live_`)

---

## Step 2: Update `.env.local`

Replace the placeholder values in `frontend/.env.local`:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_YOUR_ACTUAL_KEY_HERE"
CLERK_SECRET_KEY="sk_test_YOUR_ACTUAL_KEY_HERE"
```

**Important:** 
- Use your ACTUAL keys from Clerk dashboard
- Do NOT commit `.env.local` to git (it's in .gitignore)
- Keep these keys SECRET

---

## Step 3: Configure Clerk Webhook

1. In Clerk dashboard, go to "Webhooks"
2. Create new webhook pointing to: `http://localhost:3000/api/auth/webhook`
3. Copy the **Signing Secret** (starts with `whsec_`)
4. Add to `.env.local`:

```
CLERK_WEBHOOK_SECRET="whsec_YOUR_ACTUAL_SECRET_HERE"
```

---

## Step 4: Restart Dev Server

```bash
cd frontend
npm run dev
```

The error should be resolved once you have real Clerk keys.

---

**Status:** Follow these steps to fix the Clerk key error
