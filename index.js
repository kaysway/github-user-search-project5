'use strict';

let searchURL = 'https://api.github.com/users/:username/repos';

function displayResults(responseJson) {
//   if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
    // for each username in the response, add the username to the results list
  for (let i = 0; i < responseJson.length; i++){
    $('#results-list').append(`<li><h3><a href="${responseJson[i].owner.url}">${responseJson[i].name}</a></li>`);
  }
  //display the results section  
  $('#results').removeClass('hidden');
};

function getRepos() {
  //create a string with the original URL and the new parameters
  const url = searchURL.replace(':username', $('#js-search-term').val());
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        console.log(response);
        return response;
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
};
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    getRepos();
  });
}

$(watchForm);

