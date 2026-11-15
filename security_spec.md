# IdolOrbit Security Specification

## 1. Data Invariants
- Global default-deny catch-all at `/databases/{database}/documents/{document=**}`.
- Draft and scheduled articles in `/articles/{articleId}` are strictly restricted to the verified admin (`henrywalker82009@gmail.com` with `email_verified == true` or `/admins/{uid}` record). Public readers can only `get` or `list` articles where `status == 'published'`.
- All CMS writes (`/articles`, `/cmsGroups`, `/cmsIdols`, `/siteSettings`) validate strict field allowlists (`hasAll` + `hasOnly`), bounded string sizes, valid array bounds (`<= 12` tags, `<= 12` references), and `updatedAt == request.time`.
- All user collections (`/users/{userId}`, `favorites`, `results`, `events`, `collections`) enforce strict owner isolation (`request.auth.uid == userId && ownerId == request.auth.uid`).

## 2. Adversarial "Dirty Dozen" Payloads (Expected: PERMISSION_DENIED)
1. Unauthenticated read or list of `/articles` where `status == 'draft'` -> DENIED.
2. Non-admin authenticated user attempting to publish an article in `/articles/{id}` -> DENIED.
3. Unverified email spoof (`email == 'henrywalker82009@gmail.com'`, `email_verified == false`) -> DENIED.
4. Shadow field injection on Article (`isVerifiedSource: true` extra field) -> DENIED.
5. Unbounded array injection (`tags` with 50 items) -> DENIED (`tags.size() <= 12`).
6. Oversized `bodyMarkdown` (>40,000 chars) -> DENIED.
7. Cross-user write to `/users/otherUid/favorites/fav1` -> DENIED.
8. Invalid `FavoriteItem.itemType = 'admin'` -> DENIED.
9. Client timestamp forgery (`updatedAt` != `request.time`) -> DENIED.
10. Immutable `createdAt` or `ownerId` modification on article update -> DENIED.
11. Unrecognized collection `/subscribers/email1` -> DENIED.
12. Invalid path variable `../admin` -> DENIED (`isValidId` rejects).
