
// helpers/InputErrorHandling.js

var inputErrorHandling = function(e, regExp, errorMessage) {
  var result = regExp.test(e.target.value);
  // If the event is an input
  if(e.type != "input") {
    // And if the password exists
    if(e.target.value !== "") {
      // And the password does not match the RegExp
      if(result === false) {
        // Then there's an error and let the user know
        return {error: errorMessage};
      }
    }
  }
  return {error: ""};
}

module.exports = inputErrorHandling
