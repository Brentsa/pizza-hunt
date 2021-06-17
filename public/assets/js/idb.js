//Create a variable to hold the db connection
var db;

//establish a connection to IndexedDB database called 'pizza-hunt' and set it to version 1
const request = indexedDB.open('pizza-hunt', 1);

//This event will emit if the database version changes
request.onupgradeneeded = function(event) {
    //save a reference to the database
    const db = event.target.result;

    //create an object store (table, collection) called 'new_pizza', set it to have auto incrementing primary id
    db.createObjectStore('new_pizza', {autoIncrement: true});
}

//upon success
request.onsuccess = function(event) {
    //when db is successfully created with its object store (from onupgradeneeded)
    db = event.target.result;

    //check if app is online, if yes run uploadPizza() function to send all the local db data to the api
    if(navigator.onLine){
        uploadPizza();
    }
};

//upon failure
request.onerror = function(event){
    //log error
    console.log(event.target.errorCode);
}

//this function will be executed if we attempt to submit a new pizza but there is no internet connection
function saveRecord(record) {
    //open a new transaction with the database with read and write permission
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    //access the object store for 'new_pizza'
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //add record to your store with add method
    pizzaObjectStore.add(record);
}

function uploadPizza(){
    //open a transaction on your db
    const transaction = db.transaction(['new_pizza'], "readwrite");

    //access the new_pizza object store from the transaction
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //get all the records from the store and set to a variable
    const getAll = pizzaObjectStore.getAll();

    //upon a successful .getAll() execution, run this function
    getAll.onsuccess = function() {
        //if there is data in the store, send it to the api server
        if(getAll.result.length > 0){
            fetch('/api/pizzas', {
                method: 'POST',
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(serverResponse => {
                if(serverResponse.message){
                    throw new Error(serverResponse);
                }
                //open another transaction
                const transaction = db.transaction(['new_pizza'], "readwrite");
                //access pizza object store
                const pizzaObjectStore = transaction.objectStore('new_pizza');
                //clear contents in the local db store
                pizzaObjectStore.clear();
            })
            .catch(err => console.log(err));
        }
    }
}

//listen for app to come back online
window.addEventListener('online', uploadPizza);