document.addEventListener("DOMContentLoaded", event => {
  getPost();
  queryPosts();
});

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

function getPost() {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');

  myPost.onSnapshot(doc => {
    const data = doc.data();
    document.querySelector('#title').innerHTML = data.title;
  });
}

function updatePost(e) {
  const db = firebase.firestore();
  const myPost = db.collection('posts').doc('firstpost');
  myPost.update({ title: e.target.value });
}

function queryPosts() {
  const db = firebase.firestore();
  const productsRef = db.collection('products');
  const query = productsRef
    .where('price', '>=', 10)
    .orderBy('price', 'desc')
    .limit(10);

  query.get().then(products => {
    let content = '';
    products.forEach(doc => {
      const data = doc.data();
      content += `${data.name} at $${data.price} <br>`
    });
    document.querySelector('#query').innerHTML = content;
  });
}

function uploadFile(files) {
  const storageRef = firebase.storage().ref();
  const imageRef = storageRef.child('image.jpg');

  const file = files.item(0);
  const task = imageRef.put(file);

  task.then(() => {
    imageRef.getDownloadURL().then(url => {
      console.log(url);
      document.querySelector('#imgUpload').setAttribute('src', url);
    });
  });
}
