import React from 'react';
import PhoneIcon from 'material-ui/svg-icons/communication/phone';
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

      </div>
    );
  }
}

export default Contact;
