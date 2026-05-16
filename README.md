# Market MVP App

Mobile marketplace app where users can post products with photo and manage favorites.

React Native / Expo / TypeScript / React Query / Zustand / React Navigation


---


<img src="./assets/demo.gif" width="100" />


## Focused on

Maintainable mobile structure with clear responsibility separation.

```txt
Screen      → UI and user intent
Hooks       → feature logic and side effects
Zustand     → client state and persisted state
React Query → server state and cache invalidation
API Client  → authenticated requests and token refresh
```


## Reliability details

Focused on smoother mobile UX and handling unstable network situations.

- Product submission is queued and retried on failure.
- Favorite toggle uses optimistic cache updates for immediate UI feedback.
- Draft inputs are persisted locally and restored when returning to the screen.


## Run

```bash
npm install
npm start
```
