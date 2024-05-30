import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightService from '../Service/FlightService'
import { useHistory } from 'react-router-dom';
import 'animate.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { VscError } from 'react-icons/vsc';
import PhoneSignin from './PhoneSignin';


export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [user_Type, setUser_Type] = useState("");
  const [hideLogin, setHideLogin] = useState(true);
  let history = useHistory();



  const style1 = {
    backgroundColor: "rgba(230, 230, 230, 0.6000)",

  };

  const rounded = {
    borderRadius: "20px",
    boxShadow: "1px 1px 10px 5px #778899"
  }

  function handleSubmit(event) {
    let LoginObj = { id, password, user_Type }
    sessionStorage.setItem('Id', id);
    sessionStorage.setItem('UserType', user_Type);
    FlightService.login(LoginObj).then(res => {
      setHideLogin(!hideLogin)
      // if (user_Type === "admin") {
      //   history.push('/flights');
      //   window.location.reload(false);
      // }
      // if (user_Type === "user") {
      //   history.push('/homepage');
      //   window.location.reload(false);
      // }
    },(error) => {
        toast.error(<div>&nbsp;<VscError />&nbsp;{"Invalid credentials!!"}</div>, {
          position: "top-center",
          hideProgressBar: true,
          pauseOnHover: false,
        });
      }
    )
    event.preventDefault();
  }


  return (
  <>
  
  {hideLogin? 
  
  <div class="LoginBgImg container-fluid overflow">
      <div style={style1} class="card col-md-8 offset-md-2 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners " align="center">
        <br></br><br></br>
        <h1 class="serif">Login Form</h1>
        <br />
        <form onSubmit={handleSubmit} >


          <div class="form-group">
            <label class="col-md-4 " for="Name"><b class="serif">User ID</b></label>
            <div class="col-md-5">
              <input type="email" value={id} placeholder="example@email.com" class="form-control input-md" style={rounded} onChange={(e) => setId(e.target.value)} required />
            </div>
          </div>
          <div class="form-group">
            <br />
            <label class="col-md-4 " for="Name"><b class="serif">Password</b></label>
            <div class="col-md-5">
              <input type="password" value={password} placeholder="Password" class="form-control input-md" style={rounded} onChange={(e) => setPassword(e.target.value)} required />
            </div>
          </div>
          <br />

          <div class="form-group">
            <label class="col-md-4 control-label" for="gender"><b class="serif">Select Role</b></label>
            <br />
            <div class="col-md-6">
              <label class="radio-inline" for="role-0">
                <input type="radio" name="role" id="role-0" value="user" required onChange={(e) => setUser_Type(e.target.value)} />
                &nbsp;<h5 class="serif">User</h5>
              </label> &nbsp;  &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;

              <label class="radio-inline" for="role-1">
                <input type="radio" name="role" id="role-1" value="admin" required onChange={(e) => setUser_Type(e.target.value)} />
                &nbsp;<h5 class="serif">Admin</h5>
              </label>

            </div>
          </div>
          <br />


          <Button variant="success" style={rounded} type="Submit" >Login</Button> <br /><br />

          <h5 class="serif"> Dont have an account? </h5>   <NavLink to="/Register" exact activeStyle={{ color: 'magenta' }}>    click here</NavLink>
        </form>
      </div>
    </div>
  
  :
  <div>
    <PhoneSignin/>
  </div>
  }
  </>)
}