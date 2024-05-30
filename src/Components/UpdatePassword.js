import React, { useState } from 'react';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightService from '../Service/FlightService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCheckCircle } from 'react-icons/bi'
import { VscError } from 'react-icons/vsc'
import 'animate.css'

export default function UpdatePassword() {
  const [id, setId] = useState(sessionStorage.getItem('Id'));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");


  function handleSubmit(event) {
    let LoginObj = { id, password };
    if (password === confirmPassword) {
      FlightService.updatePassword(LoginObj).then(res => {

        toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{" Password has been updated successfully"}</div>, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });

        setTimeout(function () {
          window.location.replace('/homepage');
        }, 3000);
      });
    }
    else {
      toast.error(<div>&nbsp;<VscError />&nbsp;{"Password and Confirm Password did not match"}</div>, {
        position: "top-center",
        hideProgressBar: false,
        pauseOnHover: false,
      });
    }
    event.preventDefault();
  }

  const rounded = {
    borderRadius: "20px",
    boxShadow: "1px 1px 10px 5px #778899",
    fontFamily: "serif"
  }
  return (
    <div class="changePassBgImg overflow">
      <div class="col-md-8 offset-md-2 animate__animated animate__fadeInDown blurDiv-roundCorners" align="center">
        <br></br><br></br><br />
        <div class="updatepassword" >
          <h1>Update Password</h1><br />
          <form onSubmit={handleSubmit}>
            <div class="updatepassword1">


              <div class="form-group">
                <label class="pwd2 col-md-4 " for="Name"><b>New Password</b></label>
                <div class="col-md-8">
                  <input style={rounded} type="password" value={password} placeholder="Enter New Password" class="form-control input-md" minlength="5" required onChange={(e) => setPassword(e.target.value)} />

                </div>
              </div>
              <br />

              <div class="form-group">
                <label class="pwd3 col-md-4 " for="Name"><b>Confirm Password</b></label>
                <div class="col-md-8">
                  <input style={rounded} type="password" value={confirmPassword} placeholder="Confirm Password" class="form-control input-md" required onChange={(e) => setConfirmPassword(e.target.value)} />

                </div>
              </div>
              <br />
              <div class="pwd4"> <Button style={rounded} type="submit" variant="success">Update</Button> <br /><br /></div>

            </div>
          </form>
        </div>
      </div>
      
    </div>
  );
}