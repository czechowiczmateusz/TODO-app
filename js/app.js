//Złapanie formularza
var form = document.querySelector("form");
//Tablica
var tasks = [];
//Konstruktor Obiektu
function getID() {
    x = tasks.length;
    return x;
}
 function TasksObject() {
     date = form.date.value;
     priority = form.priority.value;
     titles = form.title.value;
     describe = form.textarea.value;
     id = getID();
     this.id = id;
     this.dateTask = date;
     this.priorityTask = priority;
     this.titleTask = titles;
     this.describeTask = describe;
     console.log(tasks.length)
}
//Local Storage odczyt
var task = JSON.parse(localStorage.getItem('list') );
// Tworzenie obiektu na klik
var button = document.getElementById("btn");
button.addEventListener('click', function (e) {
    var taskObjects = new TasksObject();
    tasks.push(taskObjects);
    localStorage.setItem('list', JSON.stringify(tasks));
});



    // Walidacja formularza
    var errorMsg = document.querySelector('.error-message');

    form.addEventListener('submit', function(e) {
        var error = false;

        // Tytuł
        if( this.elements.title.value.length <= 6) {
            errorMsg.innerHTML += 'Title is too short<br>';
            error = true;
        };

        // Opis
        if( this.elements.textarea.value.length <= 20) {
            errorMsg.innerHTML += 'Description is less than 20 characters<br>';
            error = true;
        };

        if(error) {
            e.preventDefault();
        }
    });

    // Aktualna data
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    var date = document.getElementById("date");

    if(dd<10) {
        dd = '0'+dd
    }

    if(mm<10) {
        mm = '0'+mm
    }

    today = yyyy + "-" + mm + "-" + dd;
    date.value += today;
