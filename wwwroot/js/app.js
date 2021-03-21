var isItImportant=false;
var isDetailsVisible=true;



function toggleDetailsVisability(){
    // hide/show the capture
    // $("capture").hide();
    // $("capture").show();
    if(isDetailsVisible){
        $("#capture").hide();
        isDetailsVisible=false;
    }
    else{
        $("#capture").show();
        isDetailsVisible=true;
    };

}

function toggleimportant(){
    console.log("Icon clicked");

    if(!isItImportant){
        $("#iImportant").removeClass('far').addClass('fas');
        isItImportant=true;
    }else{
        isItImportant=false;
        $("#iImportant").removeClass('fas').addClass('far');
    };
}

function saveTask(){
    console.log("Save clicked");

    var title= $("#txtTitle").val();
    var date= $("#txtDate").val();
    var status= $("#selStatus").val();
    var location= $("#txtLocation").val();
    var color= $("#txtColor").val();
    var desc= $("#txtDesc").val();

    //console.log(title, date, status, location, color, desc);//

    var myTask = new Task(0, title, isItImportant, date, status, location, color, desc);

    console.log(myTask); // obj
    console.log(JSON.stringify(myTask)); // json string
    
    // save to server
    $.ajax({
        url: '/api/postTask',
        type:"POST",
        data: JSON.stringify(myTask),
        contentType: "application/json",

        success: function(res){
            console.log("Server says: ", res);

            // display task
            displayTask(res);
        },

        error: function(errorDet){
            console.log("Error", errorDet);
        }
    });

    
}

function clearForm(){
    
    // TODO 1: Clear screen
    // to clear an input, set its val to "", xxxxx.val('');

    $(".form-control").val('');
}

function displayTask(task) {
    console.log(task.color);
    //TODO 2: - Set the background color of the task to the color select by the user

    // create the syntax
    var syntax= `<div class='task' style="background-color:${task.color}">
        <i class="far fa-star task-star task-section-sm"></i>
        <div class='task-desc'>
            <h4>${task.title}</h4>
            <label>${task.description}</label>
            <p>${task.color}</p>
        </div>
        <lable class='task-section'>${task.dueDate}</lable>
        <label class='task-section'>${task.location}</label>

        <div class='task-section-sm'>
            <i class="fas fa-trash-alt" onclick="deleteTask(${task.id})"></i>
        </div>
    </div>`;
    
    // append the syntax to existing html
    $("#tasks-list").append(syntax);
}

function retrieveData(){

    $.ajax({
        url: "/api/getTask",
        type:"GET",
        success: function(res){
            console.log("retrieving", res);

            for(let i=0; i < res.length; i++){
                let task = res[i];
                if(task.user === "Walter"){
                displayTask(task);
            }
        }

        },
        error: function(errorDet){
            console.log("Error retrieving", errorDet);
        }
    });

}

function deleteTask(id){
    console.log("should delete a task", id);

    // TODO 3 - Delete task (optional)

    // create an ajax 
    // url: serverUrl + '/tasks/' + id

    // on the success function -> remove it from the screen

}

/** Homework class 2
 * get the values from the input fields and put them into variables
*/
  
function testRequest(){

    $.ajax({
        url:"https://restclass.azurewebsites.net/api/test",
        type:"GET",
        success: function(res){
            console.log("yeah it worked!!!!", res);
        },
        error: function(errorDetails){
            console.log("Ouucch we have and error :(", errorDetails);
        }
    });
}

function init(){

    console.log("Task Manager");

    $('#txtColor').spectrum({
        type: "component"
    });

    retrieveData();

    //Events
    $("#iImportant").click(toggleimportant);
    $("#btnSave").click(saveTask);
    $("#btnDetails").click(toggleDetailsVisability);
    $("btnDelete").click(clearForm);
}


window.onload=init;


