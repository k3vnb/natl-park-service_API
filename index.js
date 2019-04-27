

// https://developer.nps.gov/api/v1/parks?stateCode=HI&stateCode=NJ&limit=10&api_key=fbmBCVWzt2Q78aBWZQJIZu1qG7g3fnsENWvhPtrd" -H "accept: application/json

function handleError(err){
    $('.results').append(err.message).show();
}

function renderResults(responseJson){
    responseJson.data.forEach(item => {
        $('.results-ul').append(`
            <li class="results-li">
                <h2 class="park-title">${item.name} - ${item.states}<h2>
                <p class="park-description">${item.description}</p>
                <a class="park-url" href=${item.url} alt="${item.name}'s website">${item.url}</a>
            </li>
        `);
    })
    $('.results').show();
 }

function resetResultsField() {
    $('.results').hide();
    $('.results-ul').empty();
  }

function formatSelectedStates(selectedStates){
    stateStr = ''
    selectedStates.forEach(selectedState => {
        stateStr+= 'stateCode='+selectedState +'&'
    })
    return stateStr;
}

function handleAPICall(selectedStates, amount){ 
    const baseURL = 'https://developer.nps.gov/api/v1/parks?';
    const params = {
        api_key: 'fbmBCVWzt2Q78aBWZQJIZu1qG7g3fnsENWvhPtrd',
        limit: amount,
        getStates: formatSelectedStates(selectedStates)
    }
    fetch(`${baseURL}${params.getStates}limit=${params.limit}&api_key=${params.api_key}`)
    .then(response =>   {
        console.log(response)
        if (response.ok) {
            return response.json();
        } else {
          throw new Error('Oops. Something went wrong!');
        }
      })
      .then(responseJson => {
          renderResults(responseJson)
        })
      .catch(error => {
          handleError(error);
    })
}


function resetInputFields() {
    $('input[type=checkbox]').prop('checked',false);
    $('input[type=number]').val(10);
  }

function getCheckedItemsAndLimit(amount){
    if (typeof(amount) === undefined){
        amount = 9;
    }
    let stateArr = [];

    $.each($("input[type='checkbox']:checked"), function(){            
        stateArr.push($(this).val());
    });
    if (validateCheckBoxForm(stateArr)) {
        handleAPICall(stateArr, amount);
    } else {
        alert('You must select at least one state');
    }
}

function validateCheckBoxForm(stateArr){
    const isChecked = stateArr.length;
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
        let amount = $('input[type="number"]').val() - 1;
        getCheckedItemsAndLimit(amount);
        resetInputFields();
    })
}


$(onFormSubmit)