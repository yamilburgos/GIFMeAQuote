console.log('form.js is working');
/*
$('.delete').on('click', function() {
	console.log("????");
	let id = $(this).parent().attr('data-id');
	axios.delete("http://localhost:3000/" + id)
	
	$(this).parent().remove();
});

$('.edit').on('click', function () {
	$(this).prev().removeAttr('readonly');
	$(this).prev().focus();
});

$('.input_item').on('change', function() {
	let id = parseInt($(this).parent().attr('data-id'));
	let val = $(this).val();
	$(this).attr('readonly', true);

	axios.patch("http://localhost:3000/" + id, {
		first: val,
		id: id
	});
});
*/