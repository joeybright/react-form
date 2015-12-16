
// components/App.jsx
var React = require('react')
var ContactForm = require('./Form.jsx')

var contactFormData = require('../data/contact-form.json')

var contactFormStyles = {
  width: "500px",
  margin: "auto"
}
var headerStyles = {
  fontFamily: "Helvetica, sans-serif"
}

var App = React.createClass({
  handleContactFormError: function(e) {
    console.log("App Cntct Frm Errr: ", e);
  },
  handleContactFormSubmit: function(e, data) {
    console.log("App Hndl Frm Sbmt: ", data);
  },
  render: function () {
    return (
      <div style={contactFormStyles}>
        <h1 style={headerStyles}>Testing a form thing with React</h1>
        <ContactForm
          data = {contactFormData}
          onError = {this.handleContactFormError}
          onSubmit = {this.handleContactFormSubmit} />
      </div>
    )
  }
});

module.exports = App
