import React from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const LoginUser = {
  username: 'abc',
  password: 'abc'
}



const useStyles = {
  root: {
    marginBottom: 16,
    flexDirection: 'column',
    position: 'absolute', left: '50%', top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    textAlign: 'center',
    minWidth: 300,
    minHeight: 400,
    padding: 20

  },
  paperSize: {
    minWidth: 700,
  },
  textField: {
    marginLeft: 8,
    marginRight: 8,
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
};

function logout() {
  localStorage.removeItem('user');
}


class FormPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      error: '',
      submitted: false
    }
    logout();
  }

  handleFormChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  onLoginPress(e) {
    e.preventDefault();
    this.setState({
      submitted: true,
      error: ''
    }, () => {
      const { username, password } = this.state;
      if (username.length > 0 && password.length > 0) {

        if (username === LoginUser.username && password === LoginUser.password) {
          localStorage.setItem('user', JSON.stringify(LoginUser));
            this.props.history.push('/');
          } else {
              logout();
                this.setState({
                submitted: false,
                error: 'Login/ Password Incorrect!'
              });
        }
    }
    });
}


render() {
  const { username, password, submitted } = this.state;
  return (
    <Paper style={useStyles.root}>
      <p className="h4 text-center mb-4" style={{textAlign:'center', fontSize: 20}}>Sign in</p>
      <p className="h4 text-center mb-4" style={{ fontSize: 14, color: 'red' }}>{this.state.error}</p>
      <form >
        <TextField
          label="GPN"
          margin="dense"
          variant="outlined"
          type="text"
          id="defaultFormLoginEmailEx"
          className="form-control"
          style={{ marginBottom: 10 }}
          name="username" value={username} onChange={(e) => this.handleFormChange(e)}
        />
        {submitted && !username &&
          <div className="help-block" style={{ fontSize: 11, color: 'red' }}>Username is required</div>
        }
        <br/>
        <TextField
          label="Password"
          margin="dense"
          variant="outlined"
          type="password"
          id="password"
          className="form-control"
          name="password" value={password} onChange={(e) => this.handleFormChange(e)}
        />
        {submitted && !password &&
          <div className="help-block" style={{ fontSize: 11, color: 'red' }}>Password is required</div>
        }
        <br/>
        <Button className="form-control" variant="contained" type="submit" style={{ backgroundColor: '#191a19', color: 'white', marginTop: 20, textAlign: 'center' }} onClick={(e) => this.onLoginPress(e)}>Login</Button>
      </form>

    </Paper>
  );
}
}

export default FormPage;