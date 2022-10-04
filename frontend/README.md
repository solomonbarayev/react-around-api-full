# Around the U.S. project on React, featuring authorization and registration.

This repository focuses on implementing authorization and registration on the frontend with React.
The frontend was borrowed from a different project, who's repo you can see here: https://github.com/solomonbarayev/around-react

### Main Objective :

To protect the homepage with a protected route that will only show if the user is logged in. The user is logged in based on two criteria:

1.  He/she is a new visitor and registered into the signup form, and then subsequently logged in with the same credentials in the login form
2.  He/she is a returning visitor, and a jwt token that is stored in the users localStorage is verified and returns valid information. If not, then most likely the token was tampered with.

If the user is logged in successfully, several things will happen:

1. He/she will be shown an information tooltip that will inform them of the login status whether it succceeded or failed
2. In the event of successful login, the user will also be redirected to the homepage.

### Technologies used:

- React JS
- Authentication, Authorization, Identication
- Javascript
- ES6
- CSS (BEM naming methodology)
- localStorage data manipulation

### View the project live:

GH pages live link: [Click here to view](https://solomonbarayev.github.io/react-around-auth/)

All authorization, registration and token requests all go through to the server running on [https://register.nomoreparties.co](https://register.nomoreparties.co/).

#### Design file used for this project:

[View Figma file](https://www.figma.com/file/yXGGl4EnWYEPzGJU2dSJ1L/Sprint-14-Registration-and-Authorization?node-id=0%3A1)

### Improvements:

- To build my own backend to connect my own server.
- Implement auth on the serverside
- To only see info that is relevant to the account that is signed in to.

#### Developer - Solomon Barayev

Visit my linkedin profile: https://www.linkedin.com/in/solomon-barayev/
