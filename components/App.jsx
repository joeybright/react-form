
// components/App.jsx
var React = require('react')
var ContactForm = require('./Form.jsx')
// styles
var styles = require('../styles/app.scss')

var App = React.createClass({
  handleContactFormError: function(e) {
    console.log(e);
  },
  handleContactFormSubmit: function(e) {
    console.log(e);
  },
  render: function () {
    return (
      <div className="w500 ma">
        <h1>Testing a form thing with React</h1>
        <ContactForm
          data = {""}
          onError = {this.handleContactFormError}
          onSubmit = {this.handleContactFormSubmit} />
      </div>
    )
  }
});

module.exports = App
