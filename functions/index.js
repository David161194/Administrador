const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.notifyUser = functions.firestore
    .document('Documentos-Vehiculos/76AB2X/Siniestros/{Siniestros}')
    .onCreate((snap, context) => {
        msgData = snap.data();
        admin.firestore().collection('adminTok').get().then((snap) => {
            var tokens = [];
            if (snap.empty) {
                console.log('No Device');
            } else {
                for (var token of snap.docs) {
                    tokens.push(token.data().devtoken);
                }
        const payload = {
            notification: {
              title: 'Siniestro',
              body: 'El empleado ' + msgData.Numero + ' sufrió un siniestro: ' + msgData.Siniestro,
              icon: "https://firebasestorage.googleapis.com/v0/b/camsa-vpro.appspot.com/o/Periodico%20Mural%2Favatar1.jpeg?alt=media&token=d6e05c7b-77bb-465d-97e5-0a3099f7b609"
            }
          };
          return admin.messaging().sendToDevice(tokens, payload).then((response) => {
            console.log('Pushed them all');
        }).catch((err) => {
            console.log(err);
        });
    }
});
});
exports.notifyTask = functions.firestore
    .document('Checklist/{Checklist}')
    .onCreate((snap, context) => {
        msgData = snap.data();
        admin.firestore().collection('adminTok').get().then((snap) => {
            var tokens = [];
            if (snap.empty) {
                console.log('No Device');
            } else {
                for (var token of snap.docs) {
                    tokens.push(token.data().devtoken);
                }
        const payload = {
            notification: {
              title: 'Nuevo checklist',
              body: 'El empleado ' + msgData.id_empleado + ' ha enviado un nuevo checklist para su revisión ',
              icon: "https://firebasestorage.googleapis.com/v0/b/camsa-vpro.appspot.com/o/Periodico%20Mural%2Favatar1.jpeg?alt=media&token=d6e05c7b-77bb-465d-97e5-0a3099f7b609"
            }
          };
          return admin.messaging().sendToDevice(tokens, payload).then((response) => {
            console.log('Pushed them all');
        }).catch((err) => {
            console.log(err);
        });
    }
});
});
exports.supervisorWeb = functions.firestore
.document('Chats/mensajes/{eID}/{menId}')
.onCreate((snap, context) => {
    msgData = snap.data();
    admin.firestore().collection('adminTok').where('id', '==', msgData.Para).get().then((snap) => {
        var tokens = [];
        if (snap.empty) {
            console.log('No Device');
        } else {
            for (var token of snap.docs) {
                tokens.push(token.data().devtoken);
            }
            const payload = {
                notification: {
                  title: msgData.name,
                  body: msgData.message,
                  icon: "https://firebasestorage.googleapis.com/v0/b/camsa-vpro.appspot.com/o/Periodico%20Mural%2Favatar1.jpeg?alt=media&token=d6e05c7b-77bb-465d-97e5-0a3099f7b609"
                }
              };
            return admin.messaging().sendToDevice(tokens, payload).then((response) => {
                console.log('Pushed them all');
            }).catch((err) => {
                console.log(err);
            });
        }
    });
});