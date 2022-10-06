# Around US Fullstack Travelers' Photosharing App

This app enables travelers to create accounts and share their travel photos as well as indicate the city that photograph took place in.

This repository contains the full API of "Around the U.S." project that features user authorization and user registration and handles cards and users.

- Frontend repo - [https://github.com/solomonbarayev/react-around-auth]
- Backend repo - [https://github.com/solomonbarayev/around-express]

- Fullstack repo which includes integration between frontend and backend: [https://github.com/solomonbarayev/react-around-api-full]
- Fullstack live demo deployed: [https://solomon.students.nomoredomainssbs.ru/]
- Api deployed to remote GCP server: [https://api.solomon.students.nomoredomainssbs.ru/]

## Primary sprint objectives:

1.  integrate between frontend and backend repos
2.  deploy fullstack repo to Google Cloud Platform instance.

## Features

- ReactJS clientsid
- React Router Dom for Protected Routing for logged in users.
- NodeJs/ExpressJs serverside
- MongoDB for DB
- Deployments to GCP
- Serverside JWT Auth
- localstorage manipulation to retain logged in user's JWT tokens.

## Full Project Functionality

- Upon first visit, users are greeted with Singin page.

  - If they have not signed up in the past, they can navigate to the Sing Up page to create an account.

- Once logged in, user will not need to log back in for at least 7 days as that is the JWT token expiration token duration.

- User will be nagivated to Homepage where they will have several options.
  - Edit their Profile name, about, and avatar image.
  - Add their own cards to the collective of cards.
  - View other's added cards.
  - Ability to like/dislike other's cards.
  - Ability to delete user's own cards (Trash bin only appears on cards that the specific logged in user added)
  - Zoom in to card images (modal will popup showing larger image resolution upon clicking on the card images.)

## Challenges faced throughout sprint:

At times the backend return data who's shape was a little different than the way the frontend is was setup. The frontend ajustment was pretty tedious, and had a lot of corrections to make.
