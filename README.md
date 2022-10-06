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

- ReactJS clientside
- React Router Dom for Protected Routing for logged in users.
- NodeJs/ExpressJs serverside
- MongoDB for DB
- Deployments to GCP
- Serverside JWT Auth
- localstorage manipulation to retain logged in user's JWT tokens.

## Full Project Functionality

- Upon first visit, users are greeted with Singin page.
  - If they have not signed up in the past, they can navigate to the Sign Up page to create an account.
  ![Screen Shot 2022-10-06 at 9 28 08 AM](https://user-images.githubusercontent.com/85166713/194231056-3bdb872c-3370-4a0e-9fd7-72180b520fa7.png)


- Once logged in, user will not need to log back in for at least 7 days as that is the JWT token expiration token duration.
![Screen Shot 2022-10-06 at 9 34 44 AM](https://user-images.githubusercontent.com/85166713/194231163-96aedd73-b3a1-484a-bbb4-c1f7711793f1.png)

- User will be nagivated to Homepage where they will have several options.
  - Edit their Profile name, about, and avatar image.
 
     ![Screen Shot 2022-10-06 at 9 36 33 AM](https://user-images.githubusercontent.com/85166713/194231710-95e8e725-7593-4015-a806-d293c0148069.png)
     
  - Add their own cards to the collective of cards.

    ![Screen Shot 2022-10-06 at 9 36 44 AM](https://user-images.githubusercontent.com/85166713/194231786-44252708-5754-4080-942b-0542fe6badaa.png)

  - View other's added cards.

  - Ability to like/dislike other's cards.

    ![Screen Shot 2022-10-06 at 9 37 05 AM (2)](https://user-images.githubusercontent.com/85166713/194231843-8a479e05-46f0-40b6-b78a-01b07f3954ce.png)


  - Ability to delete user's own cards (Trash bin only appears on cards that the specific logged in user added)

  - Zoom in to card images (modal will popup showing larger image resolution upon clicking on the card images.)

    ![Screen Shot 2022-10-06 at 9 36 52 AM](https://user-images.githubusercontent.com/85166713/194231922-53bbb84f-3bbf-483d-89b5-1c0e13dadc70.png)





## Challenges faced throughout sprint:

At times the backend return data who's shape was a little different than the way the frontend is was setup. The frontend ajustment was pretty tedious, and had a lot of corrections to make.
