import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const sendMessage = functions.firestore
  .document('products/{productId}')
  .onCreate((snapshot, context) => {
    const docId = context.params.productId;
    const name = (snapshot.data() as any).name;

    const productRef = admin.firestore().collection('products').doc(docId);

    return productRef.update({ message: `Surprise ${name}` });
  });
