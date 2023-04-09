//adding date constraint
var tzOffset = new Date().getTimezoneOffset() * 60000;
var today = new Date(Date.now() - tzOffset).toISOString().split('T')[0];
// select all input tags with type attribute set to 'date'
var dateInputs = document.querySelectorAll('input[type="date"]');
// loop through each date input and log its value to the console
dateInputs.forEach(function(dateInput) {
  dateInput.setAttribute("max", today);;
});
dateInputs.forEach(function(dateInput) {
    dateInput.addEventListener('input', function(event) {
      // get the selected date from the input value
      var selectedDate = new Date(event.target.value);
      // compare selected date to current date
      if (selectedDate > new Date()) {
        // show alert message to user
        alert("Please select a date on or before today's date.");
        // reset input value to current date
        event.target.value = today;
      }
      var inputDate = event.target.value;
      if (inputDate.length < 10) {
        // show error message to user
        alert("Please enter a complete date (YYYY-MM-DD).");
        // reset input value to empty string
        event.target.value = "";
      }
    });
  });
// // loop through each date input and add event listener
// dateInputs.forEach(function(dateInput) {
//     dateInput.addEventListener('input', function(event) {
      
//     });
//   });


//beneficial owners data
var Bos={};
var copyBos={};

//array for leag and individual
var legal=[];
var individual=[];
//list of holder of
//critera is when child is legal and % is greater than 25% of parent
var holders=[];
var legalBOs={};    //this will contain all the data of legal BO's
                //like {child1:{},child2:{}....}
var IndividualBOs={};   //this will contain all the data of Individual BO's
//
var parent='';
var original=0;


const legaltbody=document.getElementById('legaltbody');
const Inditbody=document.getElementById('Inditbody');



// now coding for our beneficial owners algo
//first of all we have made two list legal and individual
//for Legal Bo's we will go to legal bos 
//and their first of all we will select our first legal entity
//then we will add its child BO's
//if child BO's are legal and its % is greater than 25% of parent then we will add its child BO's.
//after that we will check if all parent Legal Bo's child are added or not if added than we go next to individual BO's

//first function is to get all parents BO's type and names
function getBos(data){
    var tableRows = document.querySelectorAll('tr.ben-data');
        legal.length=0;
        individual.length=0;
        console.log('in getBos');
			// Loop through each row
			for (var i = 0; i < tableRows.length; i++) {
				// Find the input fields in the current row
				var bentype = tableRows[i].querySelector("select[name='Btype']").value;
				var BenName = tableRows[i].querySelector('input[name="BenName"]').value;
				var OwnerPercent = tableRows[i].querySelector('input[name="ownerpercent"]').value;
                var dummy=parseInt(OwnerPercent);
                console.log(dummy);

                if(bentype=='Legal Entity'){
                    legal.unshift(BenName,dummy);
                   
                }
                else{
                    individual.unshift(BenName,dummy);
                    
                }
			}
            console.log(individual);
        Bos=data;
        copyBos=JSON.parse(JSON.stringify(Bos));
        getHolders();
        populateHolders();
}

//function to populate individual Bo's
function populateIndividuals(){

    var tableRows = document.querySelectorAll('tr.indi-data');
    for(var j=0;j<tableRows.length;j++){
        var select = tableRows[j].querySelector('select[name="select-indi"]');
        //select.innerHTML='';
        if (select.value=='') {
            // loop through the options and add them as option tags
            for (var i = 0; i < individual.length;) {
                var option = document.createElement('option');
                option.text = individual[i];
                option.value = individual[i];
                select.add(option);
                i=i+2;
            }
        }
    }
}

function AddNewIndividualRow(){
    console.log('in AddNewIndividualRow');
    const newRow = document.createElement('tr');
    newRow.classList.add('indi-data');
    newRow.innerHTML = '<td><select name="select-indi" id="select-indi"></select></td><td><select name="Inditype" id="Inditype" required><option value="">Select Beneficial Owner type</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" id="IndiName" name="IndiName" required/></td><td><input type="text" id="Indicitizenship" name="Indicitizenship"  required/></td><td><input type="text"  id="cor" name="cor" required/></td><td><input type="text" id="addr" name="addr" required/></td><td><input type="date" id="dob" name="dob" required/></td><td><span class="remove">-</span></td>';
    Inditbody.appendChild(newRow);
    populateIndividuals();
}

//function to populate holders of legal Bo's
function populateHolders(){
    var tableRows = document.querySelectorAll('tr.legal-data');
    console.log(tableRows.length);
    for (var j = 0; j < tableRows.length;j++) {
        console.log('tablerows'+j);
        var select = tableRows[j].querySelector('select[name="select-options"]');
        console.log(select.value);
        // select.innerHTML= '';
        if (select.value=='') {
            console.log(select.value+'in if'+j);
            // loop through the options and add them as option tags
            for (var i = 0; i < holders.length;) {
                var option = document.createElement('option');
                option.text = holders[i];
                option.value = holders[i];
                select.add(option);
                i=i+2;
            }
        }
    }
}

//function to get holders
function getHolders(){
    holders=[];
    console.log(holders);

    for(key in Bos){
        
        if(Bos[key].OwnerType=='Legal Entity'){
            console.log(Bos[key].BenName);
            holders.unshift(Bos[key].BenName,parseFloat(Bos[key].originalPercent));
        }
    }
    for (key in legalBOs) {
        // console.log(legalBOs[key].type);
        holders.unshift(legalBOs[key].name,parseFloat(legalBOs[key].originalHoldings));
    }
    for(var i=0;i<holders.length;){
        if(holders[i+1]==0){
          for(var j=0;j<legal.length;j++){
            if(holders[i]==legal[j]){
              legal.splice(j,2);
            }
          }
            holders.splice(i,2);
        }
        i=i+2;
    }
    console.log(legal);
    console.log(Bos);
    console.log(holders);
    console.log(holders.length);
    populateHolders();
}

//checking original holding of child
function getoriginalPercentage(Percentage,parent){    

    for (var i = 0; i < holders.length;) {                                //legal=['name']
        if(holders[i]==parent){                                           //legal[i+1]=percentage
            var paremtpercent=holders[i+1];
            break;
        }
        i=i+2;
    }
    var original=parseFloat(paremtpercent*Percentage/100);
    console.log(original);
    

    return original;
}


function addNewRow() {
    console.log('in addNewRow');
    const newRow = document.createElement('tr');
    newRow.classList.add('legal-data');
    newRow.innerHTML = '<td><select name="select-options" id="select-options" required></select></td><td><select name="Btype" id="Btype" required><option value="">Select Legal Beneficial Owner</option><option value="Legal Entity">Legal Entity</option><option value="Individual">Individual</option></select></td><td><input type="text" id="legalName" name="legalName" required/></td><td><input type="text" id="legalinc" name="legalinc"  required/></td><td><input type="number"  id="percentage-input" class="percentage-input" name="percentage-input" required/></td><td><button class="remove">-</button></td>';
    legaltbody.appendChild(newRow);
    
}

function removeRow(row) {
    console.log(row.rowIndex);
    legaltbody.deleteRow(row.rowIndex);
}

//adding a new row if criteria is met and will add holder of tag
legaltbody.addEventListener("keydown", function(e) {
    if (e.target.classList.contains("percentage-input") && e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const newPercentage = parseFloat(e.target.value);
      const row = e.target.closest("tr");
  
      parent = row.querySelector("select[name='select-options']").value;
      const type = row.querySelector("select[name='Btype']").value;
      const name = row.querySelector('input[name="legalName"]').value;
      const inccountry = row.querySelector('input[name="legalinc"]').value;
      original = getoriginalPercentage(newPercentage, parent);
  
      const rowdata = {
        holderOf: parent,
        type: type,
        name: name,
        countryOfIncorporation: inccountry,
        percentage: newPercentage,
        originalHoldings: original
      };
  
      legalBOs[name] = rowdata;
      console.log(newPercentage);
      console.log(legalBOs);
      for(key in Bos){
        if(Bos[key].OwnerType=='Legal Entity' && Bos[key].BenName==parent){
            Bos[key].originalPercent=Bos[key].originalPercent-original;
        }
      }
      for(keys in legalBOs){
        if(legalBOs[keys].type=='Legal Entity' && legalBOs[keys].name==parent){
            legalBOs[keys].originalHoldings=legalBOs[keys].originalHoldings-original;
        }
      }
      console.log(Bos);
  
      if (original > 25) {
        addNewRow();
        getHolders();
      }
    }
  });



//tablebody eventlistner for indivudals BO's
Inditbody.addEventListener("input", function(e) {
    console.log('in indi');
    if (e.target.classList.contains("dob") ) {
      e.preventDefault(); // Prevent form submission
      var inputDate = e.target.value;
      if (inputDate.length < 10) {
        // show error message to user
        alert("Please enter a complete date (YYYY-MM-DD).");
        // reset input value to empty string
        e.target.value = "";
        return;
      }
      const row = e.target.closest("tr");
      console.log('in indi if');
  
      parent = row.querySelector("select[name='select-indi']").value;
      const type = row.querySelector("select[name='Inditype']").value;
      const name = row.querySelector('input[name="IndiName"]').value;
      const country = row.querySelector('input[name="Indicitizenship"]').value;
      const cor= row.querySelector('input[name="cor"]').value;
      const addr = row.querySelector('input[name="addr"]').value;
      const dob = row.querySelector('input[name="dob"]').value;
  
      const rowdata = {
        holderOf: parent,
        type: type,
        name: name,
        citizenship: country,
        countryOfresidence: cor,
        address: addr,
        dateOfBirth: dob
      };
  
      IndividualBOs[name] = rowdata;
      console.log(IndividualBOs);

      for (var i = 0; i < individual.length;) {                                //legal=['name']
        if(individual[i]==parent){                                           //legal[i+1]=percentage
            individual.splice(i,2);
        }
        i=i+2;
    }
  

      if(individual.length>0){
        AddNewIndividualRow();
        populateIndividuals();
      }
      else{
        alert('you have added all the individuals Beneficial Owners');
        return;
      }
      
      
    }

  });