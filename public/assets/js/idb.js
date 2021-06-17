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
        //uploadPizza();
    }
};

//upon failure
request.onerror = function(event){
    //log error
    console.log(event.target.errorCode);
}