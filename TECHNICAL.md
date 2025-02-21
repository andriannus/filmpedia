# Technical checklist

## Tasks

1. Create a web application
    - [x] State management with `useState` and `Context`
    - [x] API fetching with `axios`
    - [x] Shared components
    - [x] Helper or utility function
    - [x] Responsive design _(with notes.)_
    - [x] Server side rendering with Next.js
2. Add some third-party services
   1. Analytics by Vercel
   2. Speed insights by Vercel
3. Dummy JWT authentication by [TMDB API](https://developers.themoviedb.org/3/authentication/getting-started)
4. Add lazy loading
   1. Yes, with a `next/dynamic` for some components

## Notes

- Has more than 3 pages
- Use BEM for CSS
- Use API from [TMDB](https://developer.themoviedb.org/docs/getting-started)
- Use third-party services by Vercel
- Use DRY principle
- Deploy web aplication to [Vercel](http://vercel.com)

### How to maintain third-party services

I deployed the application to Vercel. Vercel's service for analytics and speed insights is integrated with the application and has a seamless setup and maintenance. Just follow the instructions.
