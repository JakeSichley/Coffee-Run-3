(function (window) {
    'use strict';

    var App = window.App || {};
    var $ = window.jQuery;

    var firebaseConfig = {
        apiKey: "HIDDEN",
        authDomain: "coffee-run-c2aa8.firebaseapp.com",
        databaseURL: "https://coffee-run-c2aa8.firebaseio.com",
        projectId: "coffee-run-c2aa8",
        storageBucket: "coffee-run-c2aa8.appspot.com",
        messagingSenderId: "813099354338",
        appId: "1:813099354338:web:95abb955e2e6ed1a9a36bb",
        measurementId: "G-8RDVM56MGH"
    };

    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    class RemoteDataStore {
        constructor() {
            console.log('running the Firestore function');
            this.db = firebase.firestore();   
        }

        add(key, val) {
            const ordersRef = this.db.collection('Orders');
            ordersRef.doc(key).set(val).then((ref) => {
                console.log("Added doc with ID: ", key);
            });
        }

        remove(key) {
            const ordersRef = this.db.collection('Orders');
            ordersRef.doc(key).delete().then(() => console.log("Order for ", key, " deleted"))
            .catch((error) => console.error("Error deleting document", error));
        }

        get(key) {
            console.log('Retrieving order with key: ', key);
            const ordersRef = this.db.collection('Orders');
            const specificOrder = ordersRef.doc(key);

            specificOrder.get().then((doc) => {
                if (!doc.exists) {
                    return;
                } else {
                    return doc.data();
                }
            })
        }

        async getAll() {
            console.log('Retrieving all orders');
            const ordersRef = this.db.collection('Orders');
            const snapshot = await ordersRef.get();
            return snapshot.docs.map(doc => doc.data());
        }
    }

    App.RemoteDataStore = RemoteDataStore;
    window.App = App;
    
})(window);