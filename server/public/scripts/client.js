console.log('JS loaded');

$(document).ready(function(){
    console.log('JQ ready');
    getAllTasks();
    $('#listItemSubmit').on('click', addItem);
    // $('#todoList').on('click', '.deleteButton', removeItem);
    $('#todoList').on('click', '.completeButton', completeTask);
})//end document ready

function getAllTasks(){
    $.ajax({
        url: '/tasks',
        type: 'GET',
    }).then(function(response){ //using .then instead of success
        console.log('response', response);
        $('#todoList').empty();                
        response.forEach(appendToDOM);
            
    });
}

function appendToDOM(taskObject) {
    var $newListItem = $('<li></li>');
    $newListItem.append(taskObject.name);
    if(taskObject.is_completed){
        $newListItem.addClass('completed');
    }else {
        $newListItem.append('<button class="completeButton">Complete</button>');        
    }
    $newListItem.data('id', taskObject.id)
    $('#todoList').append($newListItem);
}

function addItem(){
    var newListItem = $('#newListItem').val();
    $.ajax({  
        method: 'POST',
        url: '/tasks',
        data: {
            name: newListItem,
        }
    }).then(function(response){
        console.log('response', response);
        $('#newListItem').val('');
        getAllTasks();
    });
}

function completeTask(){
    var taskToComplete = $(this).parent().data().id;

    $.ajax({
        method: 'PUT',
        url: '/tasks/complete' + taskToComplete,
    }).then(function(response){
        console.log('response', response);
        getAllTasks();
    });
}