import React from 'react';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
import EmailIcon from 'material-ui/svg-icons/communication/email';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

class Contact extends React.Component {

  state={
      showPhone: false,
      showEmail: false,
  }

  changePhone = () => {
    this.setState({showPhone: !this.state.showPhone});
  }

  changeEmail = () => {
    this.setState({showEmail: !this.state.showEmail});
  }

  render() {

    return (
      <div style={{'text-align':'center'}}>
      {this.state.showPhone?
        <TextField
        hintText="הכנס טלפון"
       />
     :null}

      <IconButton onClick={this.changePhone}>
        <PhoneIcon/>
      </IconButton>

      <br/>

      {this.state.showEmail?
        <TextField
        hintText="הכנס מייל"
       />
      :null}

      <IconButton onClick={this.changeEmail}>
        <EmailIcon/>
      </IconButton>

      </div>
    );
  }
}

export default Contact;
