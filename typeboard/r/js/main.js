/**
 * Type Board
 * Created by Andrew on 3/7/2017.
 *
 * So far IE11 is out.
 */
'use strict';


//Todo: Increase/Decrease font weight (100-900)
//Todo: Add/Remove italics
//Todo: Add invert colors


//Global Variables          I know, I know

var typeColumnArray = [];
var italics = false;
var typeSize = "1"; //in REM


//Toggles italics
function toggleItalics(toggle) {
    document.getElementById('type_board').classList.toggle('italics');
    document.getElementById('output_italics').innerHTML = String(!toggle);
    return !toggle;
}

//Updates font size
function updateSize(size){
    var newSize = document.getElementById('type_board').style.setProperty('--column-font-size', size + 'rem', null);
    document.getElementById('output_size').innerHTML = String(size + 'rem');
}

//Adds a new Type Column to the right
function addCharMapColumn() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var columnId = genColumnID();
            var columnCharMap = document.createElement('div');
            columnCharMap.className = 'type_column';
            columnCharMap.innerHTML = xhttp.responseText;
            columnCharMap.setAttribute('column_id', columnId); //Not perfectly unique
            typeColumnArray.push(columnId);
            document.getElementById('type_board').appendChild(columnCharMap);
        }
    }
    xhttp.open("GET", "../typeboard/charmap.html", true);
    xhttp.send();
}


//http://stackoverflow.com/a/2117523
function genColumnID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}


//Remove the parent column with class 'type_column'
function removeTypeColumn(childObj) {
    var testObj = childObj.parentElement;
    while(!testObj.classList.contains('type_column')) {
        testObj = testObj.parentNode;
    }
    testObj.remove();
}


window.addEventListener('load', function() {

    //Init

    addCharMapColumn();
    addCharMapColumn();


    //Init Eventlisteners

    //Remove Column
    document.getElementById('type_board').addEventListener('click', function(event) {
        if (event.target.classList.contains('column_remove')) {
            event.preventDefault();
            removeTypeColumn(event.target);
        }
    });



    document.getElementById('fontSize').addEventListener('input', function(){
        typeSize = updateSize(fontSize.value);
    }, false);


   document.getElementById('toggleItalics').addEventListener('click', function(){
        italics = toggleItalics(italics);
    }, false);

   document.getElementById('addCharMapRow').addEventListener('click', function(){
       addCharMapColumn();
    }, false);


});