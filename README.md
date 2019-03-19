# Setup

## Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Create project: `<name>-fb-classes`

## Install VSCode
https://code.visualstudio.com/

## Install NodeJS
https://nodejs.org/uk/blog/release/v8.15.0/

## Install Firebase Tools
```
npm i firebase-tools -g
firebase login
```

## Create Project
```
mkdir fb-classes
cd fb-classes
firebase init hosting
(y)
```

### Optionally:
```
firebase use --add
alias: default
```

### Git (if you know it)

# Overview

## Scripts Up

```html
<!-- update the version number as needed -->
<script defer src="/__/firebase/5.9.0/firebase-app.js"></script>
<!-- include only the Firebase features as you need -->
<script defer src="/__/firebase/5.9.0/firebase-auth.js"></script>
<script defer src="/__/firebase/5.9.0/firebase-database.js"></script>
<script defer src="/__/firebase/5.9.0/firebase-messaging.js"></script>
<script defer src="/__/firebase/5.9.0/firebase-storage.js"></script>
<!-- initialize the SDK after all desired features are loaded -->
<script defer src="/__/firebase/init.js"></script>
```

Here we are loading firebase scripts. We may exclude some of them that we do not use.
Defer means that browser will wait with the execution of script until page is loaded.

## Scripts Down

```js
document.addEventListener('DOMContentLoaded', function() {
 // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
 // // The Firebase SDK is initialized and available here!
 //
 // firebase.auth().onAuthStateChanged(user => { });
 // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
 // firebase.messaging().requestPermission().then(() => { });
 // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
 //
 // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

 try {
   let app = firebase.app();
   let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
   document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
 } catch (e) {
   console.error(e);
   document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
 }
});
```

Initialization of firebase resources. We will replace it.

## Start application
```
firebase serve
```

## Deploy application
```
firebase deploy
```

- It gives us SSL certificate.
- It also uses google’s Content Delivery Network. It will cache and serve all of the static resources in a highly performant way.

# Actual Project

Clean index.html so that it looks like that:

```html
<!DOCTYPE html>
<html>
 <head>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1">
   <title>Welcome to Firebase Hosting</title>

   <!-- update the version number as needed -->
   <script defer src="/__/firebase/5.9.0/firebase-app.js"></script>
   <!-- include only the Firebase features as you need -->
   <script defer src="/__/firebase/5.9.0/firebase-auth.js"></script>
   <script defer src="/__/firebase/5.9.0/firebase-database.js"></script>
   <script defer src="/__/firebase/5.9.0/firebase-messaging.js"></script>
   <script defer src="/__/firebase/5.9.0/firebase-storage.js"></script>
   <!-- initialize the SDK after all desired features are loaded -->
   <script defer src="/__/firebase/init.js"></script>
 </head>
 <body>
   <script src="app.js"></script>
 </body>
</html>
```

Create `app.js` file in `public` directory.

```js
document.addEventListener("DOMContentLoaded", event => {
  const app = firebase.app();
  console.log(app);
});
```

## User Authentication

### Enable Google Authentication

Go to `firebase console` -> `authentication` -> `enable google`.
We could enable more providers.

### Add Auth code

In `index.html` add:
```html
<button onclick="googleLogin()">Login with Google</button>
```

In `app.js` add:
```js
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider)
    .then(result => {
      const user = result.user;
      document.write(`Hello ${user.displayName}`);
      console.log(result);
    })
    .catch(console.log);
}
```

### Optional

- Talk about JWT and local storage.
- We could preserve user between sessions.

### Inspect user

To to `firebase console` -> `authentication` -> `users`

See created user.