let close_error_message = document.querySelector('#closeErrorMessage');
let error_message = document.querySelector('#errorMessage');

close_error_message.addEventListener('click', () => {
	error_message.parentNode.removeChild(error_message);

	close_error_message = null;
	error_message = null;
});