var employeeArray = [];

$(document).ready(function(){

	$("#employeeinfo").submit(function(event){
		event.preventDefault();

		//Object that contains all information of an employee
		var employeeInfoObj = {};

		//Store input information in employeeInfoObj
		$.each($("#employeeinfo").serializeArray(), function(i, field){
			employeeInfoObj[field.name] = field.value;
		});

		//Clears out form after clicking submit button
		$("#employeeinfo").find("input[type=text]").val("");

		//Store all employee information in employeeArray
		employeeArray.push(employeeInfoObj);

		appendDom(employeeInfoObj);
		calculateMonthlySalaryTotal(employeeArray);
	});

	deleteEmployee();

});

function appendDom(employee){
	$("#container").append("<div class='employee' data-identifyemployeedelete = '" + employee.employeenumber + "' ></div>");
	var $el = $("#container").children().last();

	$el.append("<p>" + employee.employeename + "</p>");
	$el.append("<p class='employeeId'>" + employee.employeenumber + "</p>");
	$el.append("<p>" + employee.jobtitle + "</p>");
	$el.append("<p class='employeesalary'>" + employee.salary + "</p>");
	$el.append("<button class='deleteemployee'>Delete Employee</button>");
}

function calculateMonthlySalaryTotal(array){
	var monthlySalaryTotal = 0;

	for(var i = 0; i < array.length; i++){
		monthlySalaryTotal += ((array[i].salary)/12);	
	}
	
	//Update monthly salary total cost whenever an employee is submitted
	$("span").replaceWith("<span>" + monthlySalaryTotal.toFixed(2) + "</span>");

	//Store monthly salary total cost in span element
	$("span").data("cost", monthlySalaryTotal);

	return monthlySalaryTotal;
}

//Hard and Pro Modes!!!
//Remove employee from DOM by clicking "Delete Employee" button
//Calculate and update the total monthly salary cost when an employee is deleted

//code below is for targeting the employee clicked in the employeeArray and 
//deleting that employee information from the array.
function deleteEmployee(){
	$("#container").on("click", ".deleteemployee", function(){
		$(this).parent().remove();
		var storeEmployeeIdDelete = $(this).parent().data("identifyemployeedelete");
		
		for(var i = 0; i < employeeArray.length; i++){
			if(employeeArray[i].employeenumber == storeEmployeeIdDelete){
				employeeArray.splice(i);
			}
		}

//code below is for updating the total monthly salary cost on the DOM when an employee is deleted
		//Assign the salary (yearly) of the employee clicked to variable salary
		var salary = ($(this).siblings('.employeesalary').text());

		//Get the monthly salary total from calculateMonthlySalaryTotal function that is attached 
		//to span element and assign to variable costBeforeDelete		
		var costBeforeDelete = ($('span').data("cost"));

		//Calculate the monthly cost after an employee is deleted and
		//store result in variable costAfterDelete
		var costAfterDelete = Math.abs(costBeforeDelete - (parseInt(salary)/12));
		
		//Update the DOM with the new monthly salary cost after an employee is deleted
		$("span").replaceWith("<span>" + costAfterDelete.toFixed(2) + "</span>");

		//Store new monthly salary cost in 'span' element to be used the next time an employee is deleted
		$("span").data("cost", costAfterDelete);
		//console.log($("span").data("cost"));

		return costAfterDelete;
	});
}