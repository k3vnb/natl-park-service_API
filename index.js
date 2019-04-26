
const apiKey = 'fbmBCVWzt2Q78aBWZQJIZu1qG7g3fnsENWvhPtrd';
// https://developer.nps.gov/api/v1/parks?stateCode=HI&stateCode=NJ&limit=10&api_key=fbmBCVWzt2Q78aBWZQJIZu1qG7g3fnsENWvhPtrd" -H "accept: application/json

function handleError(err){
    console.log(err);
}

function render(responseJson){
    console.log('render')    
 }


function handleAPICall(selectedStates){ 
    console.log(selectedStates)  
    fetch(``)
    .then(response =>   {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Oops. Something went wrong!');
        }
      })
      .then(responseJson => {
          render(responseJson)
        })
      .catch(error => {
          handleError(error);
    })
}

function resetResultsField() {
    $('.results').hide();
    $('.results-ul').empty();
  }
function resetSearchField() {
    $('input[name="state"]').val('AL');
  }

function getCheckedItems(){
    //creates a string of selected states in proper format for API params
    let stateString = '';

    $.each($("input[type='checkbox']:checked"), function(){            
        stateString+=($(this).val()) + ',';
    });
    if (validateCheckBoxForm(stateString)) {
        const checkedItems = stateString.substring(0, stateString.length - 1);
        handleAPICall(checkedItems);
    } else {
        alert('You must select at least one state');
    }
}

function validateCheckBoxForm(stateString){
    const isChecked = stateString.length;
    if(!isChecked) {
      return false;
    } else {
        return true;
    }
}

function onFormSubmit(){
    $('form').submit(() => {
        event.preventDefault();
        resetResultsField();
        getCheckedItems();
        resetSearchField();
    })
}


$(onFormSubmit)