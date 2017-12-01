        //Złapanie formularza
            var form = document.querySelector("form");

        //Tablica
            var tasks = [];

        //Konstruktor Obiektu
            var see = [];
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
                this.isCompletedTask = false;

             }

        //Local Storage odczyt
        var task = JSON.parse(localStorage.getItem('list') );

        // Tworzenie obiektu na klik
        var button = document.getElementById("btn");
        var errorMsg = document.querySelector('.error-message');

        // Dodawanie elementów
        button.addEventListener('click', function (e) {
            var taskObjects = new TasksObject();
            var error = false;


            if( form.title.value.length <= 6) {
                errorMsg.innerHTML = 'Title is too short<br>';
                error = true;
            }


            if( form.textarea.value.length <= 20) {
                errorMsg.innerHTML = 'Description is less than 20 characters<br>';
                error = true;
            }

            if (typeof form.date.value === "string") {
                var data = form.date.value.match(/(\d{4})-(\d{2})-(\d{2})/);
                var thisYear = new Date().getFullYear();
                if (data === null){
                    error = true;
                    errorMsg.innerHTML = 'You set no data<br>'
                }
                else if (data[1].length < 4 || data[1] < thisYear) {
                    error = true;
                    errorMsg.innerHTML = 'Wrong year<br>'
                }
                else if (data[2].length < 2 || data[2] < 1 || data[2] > 12){
                    error = true;
                    errorMsg.innerHTML = 'Wrong month <br>'
                }
                else if (data[3].length < 2 || data[3] < 1 || data[3] > 31) {
                    error = true;
                    errorMsg.innerHTML = 'Wrong day <br>'
                }
            }

            if(error === true) {
                e.preventDefault();
            }

            else {
                errorMsg.innerHTML = "";
                tasks.push(taskObjects);
                localStorage.setItem('list', JSON.stringify(tasks));


                // Tworzenie elementów
                var list = document.querySelector(".list");

                if (localStorage.getItem('list') === null) {
                    errorMsg.style.display = "none";
                } else {
                    var arr = JSON.parse(localStorage.getItem('list'));
                    list.innerHTML = "";

                    arr.forEach(function (obj) {
                        var newUl = document.createElement('ul');
                        var newId = document.createElement('li');
                        var newTitle = document.createElement('li');
                        var newDescribe = document.createElement('li');
                        var newDate = document.createElement('li');
                        var newPriority = document.createElement('li');
                        var newDone = document.createElement('li');
                        var newButton = document.createElement('button');
                        newButton.innerHTML = "Done";

                        newId.innerHTML = "ID: " + obj.id;
                        newId.dataset.id = obj.id;
                        newTitle.innerHTML = "Title: " + obj.titleTask;
                        newTitle.addEventListener('mouseover', function () {
                            newDescribe.style.display = "block";
                            newDescribe.innerHTML = "Description: " + obj.describeTask;
                        });
                        newTitle.addEventListener('mouseout', function () {
                            newDescribe.style.display = "none";
                        });

                        newDate.innerHTML = "Deadline: " + obj.dateTask;

                        newPriority.innerHTML = "Priority: " + obj.priorityTask;

                        if (obj.isCompletedTask === false) {
                            newDone.innerHTML = "Not done";
                            newDone.dataset.done = false;
                            newButton.addEventListener('click', function (e) {
                                newDone.innerHTML = "Done";
                                newDone.dataset.done = true;
                                newUl.classList.add("done");
                            });
                        }

                        newUl.appendChild(newId);
                        newUl.appendChild(newTitle);
                        newUl.appendChild(newDescribe);
                        newUl.appendChild(newDate);
                        newUl.appendChild(newPriority);
                        newUl.appendChild(newDone);
                        newUl.appendChild(newButton);
                        list.appendChild(newUl);

                    });
                }
            }
            console.log(tasks.sort(dynamicSort("dateTask")));
        });

        // Sortowanie po dacie
        function dynamicSort(property) {
            var sortOrder = 1;
            if(property[0] === "-") {
                sortOrder = -1;
                property = property.substr(1);
            }
            return function (a,b) {
                var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
                return result * sortOrder;
            }
        }

        var sortUp = document.querySelector("#sortUp");
        var sortDown = document.querySelector("#sortDown");


        sortUp.addEventListener("click", function (e) {
            tasks.sort(dynamicSort("dateTask"))
        });
        sortDown.addEventListener("click", function (e) {
            tasks.sort(dynamicSort("-dateTask"))
        });
