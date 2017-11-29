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
