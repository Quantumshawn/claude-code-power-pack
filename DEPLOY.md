# Deploying the automated storefront (Vercel)

Everything's built in `web/`. This gives you a real landing page + automated, payment-verified downloads — no manual emailing needed.

## How it works

1. Buyer clicks "Buy" on the landing page → goes to your Stripe Payment Link.
2. After paying, Stripe redirects to `success.html?session_id=...` on your deployed site.
3. `success.html` calls `/api/verify?session_id=...`, a serverless function that asks Stripe directly "was this session actually paid?" — only if yes does it return the zip. No session ID, no payment confirmation, no file. This can't be bypassed by just guessing a URL.

## Steps

### 1. Get your Stripe secret key
Stripe Dashboard → Developers → API keys → copy the **Secret key** (starts with `sk_live_...` for real payments, or use `sk_test_...` while testing). Keep this private — never put it in the HTML or commit it to git.

### 2. Push this folder to GitHub
```
git add web/ DEPLOY.md STRIPE_SETUP.md marketing/ product/ README.md claude-code-power-pack.zip
git commit -m "Add Claude Code Power Pack product and storefront"
```
Then create a repo on GitHub (private is fine — recommended, since it doesn't need to be public for Vercel to deploy it) and push:
```
gh repo create claude-code-power-pack --private --source=. --push
```
(If you don't have `gh` set up, create the repo manually on github.com and follow the push instructions it gives you.)

### 3. Deploy on Vercel
1. Go to vercel.com → sign in (GitHub login is easiest) → **Add New Project** → import the repo you just pushed.
2. **Root Directory:** set to `web` (important — that's where the app lives).
3. **Environment Variables:** add `STRIPE_SECRET_KEY` = the secret key from step 1.
4. Deploy. Vercel gives you a URL like `https://claude-code-power-pack.vercel.app`.

### 4. Point Stripe's "after payment" redirect at your new success page
Stripe Dashboard → Payment Links → your link → Edit → "After payment" → redirect to:
```
https://YOUR-VERCEL-URL.vercel.app/success.html?session_id={CHECKOUT_SESSION_ID}
```
(Stripe automatically fills in `{CHECKOUT_SESSION_ID}` — type it literally, including the curly braces.)

### 5. Put your live Payment Link into the landing page
In `web/index.html`, replace both occurrences of `STRIPE_PAYMENT_LINK_PLACEHOLDER` with your actual `https://buy.stripe.com/...` link, commit, push — Vercel auto-redeploys on push.

### 6. Test it yourself before posting anywhere
Use Stripe's test mode (toggle in the dashboard, use card `4242 4242 4242 4242`) to run through the whole flow once: buy → redirect → download actually arrives. Don't skip this — it's the difference between "automated" and "broken for the first real customer."

## Updating the product later
If you add more skills/workflows to `product/`, re-zip and re-embed:
```
powershell -c "Compress-Archive -Path 'product\*' -DestinationPath 'claude-code-power-pack.zip' -Force"
node -e "const fs=require('fs');fs.writeFileSync('web/api/_payload.js','module.exports = \"'+fs.readFileSync('claude-code-power-pack.zip').toString('base64')+'\";\n')"
git add -A && git commit -m "Update product pack" && git push
```
