# Test Handoff — "Here's what to test"

## Objective
Whenever something becomes testable, hand it off with a short, plain-language summary of **what changed** and **how to test it**. No file paths. Describe what the user can see.

## When to Run
Automatically, without being asked, after:

1. **CMPD** (commit → merge → push → deploy)
2. **A localhost link** is given
3. **A deploy** finishes (`tools/deploy.sh`)

## Surfaces
- Site: https://upsquadconnect.com
- Admin: https://upsquadconnect.com/admin/login
- Local site: http://localhost:3000 (Next)
- Local API: http://localhost:3100 (Express)

## Output Format

```
✅ Deployed — here's what to test:

📍 Where: https://upsquadconnect.com/<route>

What changed:
- <user-visible behavior>

How to test:
1. <step>
2. <what they should see>
```

For localhost, use `🔗 Running locally` and the exact URL.

## Notes
- Cover everything that shipped in the deploy range, not only this session's commits.
- If a hard refresh is needed, say so.
