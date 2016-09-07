$(document).ready(function() {
	//our jquery code goes here
	$("#sendBtn").click(function(event) {
			event.preventDefault();
			var proceed = true;
			//simple validation at client's end
			//loop through each field and we simply change border color to red for invalid fields
			$("#messageForm input[required=true], #messageForm textarea[required=true]").each(function(){
					$(this).css('border-color','');
					if(!$.trim($(this).val())){ //if this field is empty
							$(this).css('border-color','red'); //change border color to red
							proceed = false; //set do not proceed flag
					}
					//check invalid email
					var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
					if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
							alert('E-mail not valid');
							$(this).css('border-color','red'); //change border color to red
							proceed = false; //set do not proceed flag
					}
			});
			if(proceed) //everything looks good! proceed...
			{
				$("#messageForm").slideUp();
				$("#messageProgress").hide().slideDown();
					//get input field values data to be sent to server
					post_data = {
							'name'     : $('input[name=name]').val(),
							'email'    : $('input[name=email]').val(),
							'message'  : $('textarea[name=message]').val()
					};
					var url = '/api/contact';//window.baseURL + '/api/contact';
					$.post(url, post_data, function(response){
							if(response.type == 'error'){ //load json data from server and output message
									output = '<div class="error">'+response.message+'</div>';
									$("#messageProgress").slideUp();
									$("#messageError").html('Error').html(output).hide().slideDown();
									$("#messageForm").hide().slideDown();
							} else if (response.type == 'error-maxmessages'){
								output = '<div class="error">'+response.message+'</div>';
								$("#messageProgress").slideUp();
								$("#messageError").html('Error').html(output).hide().slideDown();
							}else{
									output = '<div class="success">'+response.message+'</div>';
									//reset values in all input fields
									$("#messageForm  input[required=true], #messageForm textarea[required=true]").val('');
									$("#messageProgress").slideUp();
									$("#messageSuccess").hide().slideDown();
							}
							//.html(output)
					}, 'json')
				.fail(function(err) {
					//console.log(err);
					$("#messageProgress").slideUp();
					$("#messageError").html('Error sending message').hide().slideDown();
					$("#messageForm").hide().slideDown();
				});
			}
	});
	//reset previously set border colors and hide all message on .keyup()
	$("#messageForm  input[required=true], #messageForm textarea[required=true]").keyup(function() {
			$(this).css('border-color','');
			//$("#contact_results").slideUp();
	});
});
