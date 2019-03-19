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

## Database

1. Go to `firebase console` -> `database` -> `cloud firestore`. "Zacznij w trybie testowym".

2. Create collection "posts".
   - always use plurals for collections and API endpoints

3. Create first document (`id` you can add yourself or you can have it automatically generated). Use "firstpost".

```json
{
  "title": "My Firestore Post",
  "position": "[90, 90]",
  "createdAt": "...",
  "views": 1,
  "tags": {
    "awesome": true,
    "cool": true
  }
}
```

### Rules

You can secure your data using rules tab. We won't be doing it now.

### Indexes

Indexes tabs contains indexes. By default every file is indexed. But in contrary to SQL database if you want to query using multiple fields you need to create separate index for that. Luckily firebase can do that for us using error message in the application.

### Including Database Library

Replace:
```html
<script defer src="/__/firebase/5.9.0/firebase-database.js"></script>
```

With:
```html
<script defer src="/__/firebase/5.9.0/firebase-firestore.js"><script>
```

### Use Database

Inside `document.addEventListener`:
```js
const db = firebase.firestore();
const myPost = db.collection('posts').doc('firstpost');

myPost.get().then(doc => {
  const data = doc.data();
  document.write(data.title + '<br>');
  document.write(data.createdAt);
});
```

- `myPost` is a reference to to object in the database. So not actual data.
- We call `get` method to receive a `Promise`, more on that later if we have time. For now just "believe" that promise is also some-kind-of container that we need to unpack using `then` method.
- With `then` we can actual `doc`.
- We access it's data using `data` method.
- At the end we print it on the screen.

### Real time update

Firebase best selling feature is real time database. Right now if we change something in the database a user would have to refresh page to see the difference. Thanks to to firebase we can very easily implement this feature.

Replace:
```js
myPost.onSnapshot(doc => {
  const data = doc.data();
  document.write(data.title + '<br>');
  document.write(data.createdAt + '<br>');
});
```
