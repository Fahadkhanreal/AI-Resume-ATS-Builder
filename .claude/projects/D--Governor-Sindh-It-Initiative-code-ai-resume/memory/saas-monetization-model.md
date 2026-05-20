---
name: saas-monetization-model
description: Freemium tier (free resumes, limited AI), Pro tier ($9.99/mo), Enterprise custom; Stripe/Razorpay for payments
metadata:
  type: project
---

## SaaS Monetization Model

**Status**: Defined as of 2026-05-19

**Pricing Tiers**:

### Freemium Tier (Free)
- 3 free resumes per month
- Basic templates (2-3 options)
- Limited AI improvements (5 per month)
- No ATS scoring
- No job matching
- No PDF download (view only)
- Community support

### Pro Tier ($9.99/month)
- Unlimited resumes
- All templates (10+)
- Unlimited AI improvements
- Real-time ATS scoring
- Job match analysis
- PDF download & export
- Email support
- Resume versioning

### Enterprise Tier (Custom)
- Everything in Pro
- Team workspaces (5+ users)
- Advanced analytics
- Custom branding
- API access
- Dedicated support
- Volume discounts

**Payment Processing**:
- Primary: Stripe (international, credit cards)
- Secondary: Razorpay (Pakistan, local payments)
- Billing: Monthly subscription model
- Free trial: 7 days for Pro tier

**Revenue Model**:
- Freemium conversion target: 5-10% of free users → Pro
- Average revenue per user (ARPU): $5-8/month
- Churn target: < 5% monthly

**Implementation Phases**:
1. Phase 1: Freemium tier (free resumes, limited AI)
2. Phase 2: Pro tier with Stripe integration
3. Phase 3: Razorpay for Pakistan market
4. Phase 4: Enterprise tier with team workspaces

**Why**: Freemium model maximizes user acquisition while Pro tier captures revenue from power users. Razorpay enables Pakistan market penetration.

**How to apply**: Backend must track usage (resume count, AI calls) and enforce tier limits. Subscription status stored in User model.
