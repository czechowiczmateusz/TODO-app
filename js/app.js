document.addEventListener("DOMContentLoaded", function() {


    // Walidacja formularza
    var form = document.querySelector('form');
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

    // Pobieranie informacji z utworzonego formularza

    var obj;
    document.querySelector("button").addEventListener('click', function() {
    var getValues  = function(elements) {
        return Array.prototype.map.call(elements, function (element) {
            return element.value;
        });
    };
    console.log(getValues(form));
    });

});