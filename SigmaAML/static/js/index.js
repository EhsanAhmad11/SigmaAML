$(".step").click( function() {
	$(this).addClass("active").prevAll().addClass("active");
	$(this).nextAll().removeClass("active");
	});

	$(".step1").click( function() {
		$("#line-progress").css("width", "2%");
		$(".clientD").addClass("active").siblings().removeClass("active");
	});

	$(".step2").click( function() {
		$("#line-progress").css("width", "8%");
		$(".clientdetail").addClass("active").siblings().removeClass("active");
	});

	$(".step3").click( function() {
		$("#line-progress").css("width", "16%");
		$(".client3").addClass("active").siblings().removeClass("active");
	});

	$(".step4").click( function() {
		$("#line-progress").css("width", "24%");
		$(".benOwner").addClass("active").siblings().removeClass("active");
	});

	$(".step5").click( function() {
		$("#line-progress").css("width", "32%");
		$(".benOwner2").addClass("active").siblings().removeClass("active");
	});
	$(".step6").click( function() {
		$("#line-progress").css("width", "42%");
		$(".benOwner3").addClass("active").siblings().removeClass("active");
		populateIndividuals();
	});
	$(".step7").click( function() {
		$("#line-progress").css("width", "50%");
		$(".Directors").addClass("active").siblings().removeClass("active");
	});
	$(".step8").click( function() {
		$("#line-progress").css("width", "58%");
		$(".products").addClass("active").siblings().removeClass("active");
	});
	$(".step9").click( function() {
		$("#line-progress").css("width", "66%");
		$(".sanction").addClass("active").siblings().removeClass("active");
	});
	$(".step10").click( function() {
		$("#line-progress").css("width", "74%");
		$(".negnew").addClass("active").siblings().removeClass("active");
	});
	$(".step11").click( function() {
		$("#line-progress").css("width", "82%");
		$(".screening").addClass("active").siblings().removeClass("active");
	});
	$(".step12").click( function() {
		$("#line-progress").css("width", "90%");
		$(".Risk").addClass("active").siblings().removeClass("active");
	});
	$(".step13").click( function() {
		$("#line-progress").css("width", "100%");
		$(".report").addClass("active").siblings().removeClass("active");
	});
	


	//for benefical owner
	$(document).ready(function() {
		// Add row
		$('#addRow').click(function() {
			var newRow = '<tr class="ben-data"><td><select name="Btype"><option value="">Select Beneficial Owner type</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" name="BenName" /></td><td><input type="text" name="citizenship" /></td><td><input type="text" name="ownerpercent" /></td><td><button class="remove">-</button></td></tr>';
			$('#tbody1').append(newRow);
		});

		// Remove row
		$('table').on('click', '.remove', function() {
			$(this).closest('tr').remove();
		});
	});

	//for legal bo's
	$(document).ready(function() {
		
		// Add row
		$('#addLegal').click(function() {
			var newRow = '<tr class="legal-data"><td><select name="select-options" id="select-options" required></select></td><td><select name="Btype" id="Btype" required><option value="">Select Legal Beneficial Owner</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" id="legalName" name="legalName" required/></td><td><input type="text" id="legalinc" name="legalinc"  required/></td><td><input type="number"  id="percentage-input" class="percentage-input" name="percentage-input" required/></td><td><button class="remove">-</button></td></tr>';
			$('#legaltbody').append(newRow);
			getHolders();
			console.log('in tbdoy')
		});

		// Remove row
		$('table').on('click', '.remove', function() {
			$(this).closest('tr').remove();
		});
	});


	//for individuals BO's
	$(document).ready(function() {
		
		// Add row
		$('#addIndi').click(function() {
			var newRow = '<tr class="indi-data"><td><select name="select-indi" id="select-indi"></select></td><td><select name="Btype" id="Btype" required><option value="">Select Beneficial Owner type</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" id="IndiName" name="IndiName" required/></td><td><input type="text" id="citizenship" name="citizenship"  required/></td><td><input type="number"  id="cor" name="cor" required/></td><td><input type="text" id="addr" name="addr" required/></td><td><input type="date" id="dob" name="dob" required/></td><td><button class="remove">-</button></td></tr>';
			$('#Inditbody').append(newRow);
			getHolders();
			console.log('in tbdoy')
		});

		// Remove row
		$('table').on('click', '.remove', function() {
			$(this).closest('tr').remove();
		});
	});

//for directors
$(document).ready(function() {
	// Add row
	$('#addRow2').click(function() {
		var newRow = '<tr class="Dir-data"><td><select name="dt" id="dt"><option value="">select director type</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" name="dname" /></td><td><input type="date" name="d_dob" /></td><td><input type="text" name="d_addr" /></td><td><input type="text" name="d_city" /></td><td><input type="text" name="d_country" /></td><td><input type="checkbox" style="width:100%; transform: scale(1.5);" id="Signatory" name="Signatory" /></td><td><button class="remove btn-danger">-</button></td></tr>';
		$('#tbody2').append(newRow);
	});

	// Remove row
	$('#myTable2').on('click', '.remove', function() {
		$(this).closest('tr').remove();
	});
});

//for products
$(document).ready(function() {
	var i = 1;
	// Add row

	$('#addRow3').click(function() {
		if (i <= 5) {
			var newRow = '<tr class="prod-data"><td><p class="bg-white text-center" style="font-size: 25px;" name="precord">'+i+'</p></td><td><input type="text" name="pname" /></td><td><input type="number" name="pvolume" /></td><td><input type="number" name="pyear" /></td><td><input type="number" name="pvalue" /></td><td><button class="remove bg-danger">-</button></td></tr>';
			$('#tbody3').append(newRow);
			i++; // increment the value of i after adding a row
		}
		else{
			alert('Maximum 5 products allowed');
		}
	});

	// Remove row
	$('#myTable3').on('click', '.remove', function() {
		i--; // decrement the value of i after removing a row
		$(this).closest('tr').remove();
	});
});

//for client country percentage
$(document).ready(function() {
	var i = 1;
	// Add row
	var percentage = $('#col_percentage').val();
	console.log(percentage);
	var percentages = [];

	

	
	$('#addRow4').click(function() {

		if(i<=4){
			var newRow = '<tr class="data-row"><td><input type="text" id="col_country" name="col_country" required /></td><td><input type="checkbox" style="width:100%; transform: scale(1.5);" id="col_physical" name="col_physical" /></td><td><input type="text" id="col_percentage" name="col_percentage" required /></td><td><button class="remove bg-danger">-</button></td></tr>';
			$('#tbody4').append(newRow);
			i++;
		}
		else{
			alert('Maximum 5 countries allowed');
		}
		
	});

	// Remove row
	$('#myTable4').on('click', '.remove', function() {
		var row = $(this).closest('tr');
		var percentage = parseFloat(row.find('input[name="col_percentage"]').val());
		i -= percentage;
		console.log(i)// decrement the value of i after removing a row
		$('#addRow4').prop('disabled', false);
		$(this).closest('tr').remove();
	});
});