import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    console.log("depurando")
 response.send("Hola mundo desde Cloud Funtions!");

});

export const byeWorld = functions.https.onRequest((request, response) => {
    console.log("cerrando")
    response.send("Adios mundo desde Cloud Funtions!");
   
   });
