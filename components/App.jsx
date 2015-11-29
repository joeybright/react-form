
// components/App.jsx
var React = require('react')
var ContactForm = require('./ContactForm.jsx')
// styles
var styles = require('../styles/app.scss')

var App = React.createClass({
  // Initial state is empty
  render: function () {
    return (
      <div className="w500 ma">
        <h1>Testing a form thing with React</h1>
        <ContactForm />
      </div>
    )
  }
});

module.exports = App
