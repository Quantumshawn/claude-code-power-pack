# Selling the Power Pack — Stripe setup (10 minutes)

You already have Stripe, so this is the fastest path: no new account, no approval wait.

**Update:** there's now an automated, payment-verified storefront in `web/` (see `DEPLOY.md`) — once that's deployed, skip the manual delivery section below entirely. The steps below are the fallback if you want to sell before deploying the site, or as a backup if the site ever has an issue.

## 1. Create the Payment Link

1. Log into the Stripe Dashboard → **Payment links** → **+ New**.
2. Add a product: name `Claude Code Power Pack`, price **$19** one-time (one-time, not subscription).
   - If you want to test pricing, $15 and $25 are both reasonable for this category — $19 is the sweet spot for an impulse dev-tool purchase.
3. Under "After payment," set it to show a **custom message** (simplest) or redirect to a confirmation page. Custom message text:
   > "Thanks! Check your email for the download link within a few minutes — reply to that email if you don't see it."
4. Save. Stripe gives you a shareable URL like `buy.stripe.com/xxxxx` — that's the link you post everywhere.

## 2. Delivery (manual is fine at this volume)

Stripe doesn't auto-deliver files on a Payment Link. At the volume you'll get in 24 hours, manual delivery is genuinely the right call — don't spend time wiring automation for 1-10 sales.

- Turn on **email receipts** in Stripe settings if not already on, so you get notified per sale with the buyer's email.
- Keep `claude-code-power-pack.zip` (already built, in this folder) ready to send.
- When a sale notification arrives: reply to the buyer's receipt email (or email them directly) with the zip attached, or a link to it.
- **Fastest no-attachment option:** upload the zip to Google Drive (your existing Google account, zero new signup), set sharing to "anyone with the link," and paste that link in your reply template below.

### Reply template

```
Subject: Your Claude Code Power Pack

Thanks for grabbing the Power Pack! Download here: [your Drive link]

Quick start: unzip, copy the skills/ folders you want into your project's
.claude/skills/, and check README.md for the rest. Any issues, just reply
to this email.
```

## 3. If volume picks up and manual delivery becomes a chore

Move to Gumroad (free to start, ~10% fee, but fully automated digital delivery) or add a simple redirect page that links straight to the Drive file after Stripe checkout. Not needed for day one — don't build this until you actually have the problem.

## Venmo option (backup / lower-friction for social posts)

For Reddit/X posts where a friction-free DM sale might convert better than asking someone to click into Stripe: you can offer "$15 via Venmo @yourhandle, DM me and I'll send the zip immediately." Lower trust signal than Stripe checkout, but zero friction — good as a secondary option you mention, not the primary link.
