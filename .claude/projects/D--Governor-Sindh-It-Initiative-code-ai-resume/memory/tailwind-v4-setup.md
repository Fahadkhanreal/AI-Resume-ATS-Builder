---
name: tailwind-v4-setup
description: Fixed CSS compilation by creating tailwind.config.ts with v4 syntax and updating globals.css
metadata:
  type: feedback
---

## Tailwind CSS v4 Setup Fix

**Problem**: Dev server running but no CSS styling appeared on frontend.

**Root Cause**: 
1. Missing `tailwind.config.ts` file entirely
2. `globals.css` using old v3 syntax (`@tailwind` directives)
3. Tailwind v4 requires config file to know which files to scan for classes

**Solution Applied**:

1. **Created tailwind.config.ts** with v4 syntax:
   - Used `export default {...} satisfies Config;`
   - Configured content paths: `./app/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`
   - Added custom colors (slate, emerald, cyan, blue palettes)
   - Added custom fonts (Geist Sans, Geist Mono)

2. **Updated globals.css** to v4 syntax:
   - Changed from `@tailwind base; @tailwind components; @tailwind utilities;`
   - To: `@import "tailwindcss";`
   - Kept custom scrollbar styling

**Verification**:
- Dev server restarted after changes
- CSS utilities compiled (2344 lines of CSS)
- Styling appeared on all pages
- Animations and responsive design working

**Why**: Tailwind v4 is a major version with breaking changes. Old v3 syntax doesn't work with v4.

**How to apply**: When upgrading Tailwind versions, always check for syntax changes in official docs. Config file is mandatory for v4.
