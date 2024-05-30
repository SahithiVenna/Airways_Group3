import React, { useState } from 'react';
import LoginModelClass from './LoginModelClass'
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import FlightService from '../Service/FlightService'
import 'animate.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiCheckCircle } from 'react-icons/bi'
import { VscError } from 'react-icons/vsc'
import { RiErrorWarningLine } from 'react-icons/ri'

export default function Register() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [gender, setGender] = useState("");
  const [contact, setContact] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");



  const style1 = {
    backgroundColor: "rgba(230, 230, 230, 0.6000)",

  };

  const rounded = {
    borderRadius: "20px",
    boxShadow: "1px 1px 10px 5px #778899"
  }




  function handleSubmit(event) {
    let LoginObj = new LoginModelClass(id, first_Name, last_Name, gender, contact, password);
    if (password === confirmPassword) {
      FlightService.register(LoginObj).then(res => {
        toast.success(<div>&nbsp;<BiCheckCircle />&nbsp;{"Acoount created successfully"}</div>, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          pauseOnHover: false,
        });

        setTimeout(function () {
          window.location.replace('/Login');
        }, 3000);
      },
        (error) => {
          toast.error(<div>&nbsp;<VscError />&nbsp;{"User Id not available, Please try different one!!"}</div>, {
            position: "top-center",
            hideProgressBar: true,
            pauseOnHover: false,
          });
        }
      );
    }
    else {
      toast.warn(<div>&nbsp;<RiErrorWarningLine />&nbsp;{"Password and Confirm Password did not match"}</div>, {
        position: "top-center",
        hideProgressBar: true,
        pauseOnHover: false,
      });
    }

    event.preventDefault();
  }
  return (
    <div class="regBgImg overflow" >

      <div className="animate__animated animate__fadeInDown">

        <div class="offset-md-2 card col-md-8 offset-md-2 offset-md-2 blurDiv-roundCorners" style={style1}>
          <br></br><br></br>

          <div class="container col-md-10">
            <h1 align="center" class="serif">Registration Form</h1>
            <form onSubmit={handleSubmit}>

              <div class="form-group">
                <label for="Name"><b class="serif">User ID</b></label>
                <div>
                  <input style={rounded} type="email" value={id} placeholder="example@email.com" class="form-control input-md" onChange={(e) => setId(e.target.value)} required />

                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b class="serif">First Name</b></label>

                    <input style={rounded} type="text" value={first_Name} placeholder="First Name" class="form-control input-md" required onChange={(e) => setFirst_Name(e.target.value)} />

                  </div>
                </div>

                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b class="serif">Last Name</b></label>

                    <input style={rounded} type="text" value={last_Name} placeholder="Last Name" class="form-control input-md" required onChange={(e) => setLast_Name(e.target.value)} />

                  </div>
                </div>
              </div>

              <div class="form-group">
                <br />
                <label for="Name"><b class="serif">Contact</b></label>
                <div>
                  <input style={rounded} type="text" value={contact} placeholder="Contact number" class="form-control input-md" required minLength="10" maxLength="10" pattern="(0|91)?[7-9][0-9]{9}" onChange={(e) => setContact(e.target.value)} />

                </div>
              </div>


              <div class="form-group">
                <br />
                <label class="col-md-4 control-label" for="gender"><b class="serif">Gender</b></label>
                <br />
                <div class="row">
                  <div class="col-md-4">
                    <label class="radio-inline" for="gender-0">
                      <input type="radio" name="gender" id="gender-0" value="Male" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Male
                    </label></div>
                  <div class="col-md-4" align="center">
                    <label class="radio-inline" for="gender-1">
                      <input type="radio" name="gender" id="gender-1" value="Female" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Female
                    </label></div>
                  <div class="col-md-4" align="center">
                    <label class="radio-inline" for="gender-2">
                      <input type="radio" name="gender" id="gender-2" value="other" required onChange={(e) => setGender(e.target.value)} />
                      &nbsp;Other
                    </label></div>
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class="col-md-4 " for="Name"><b class="serif">Password</b></label>

                    <input style={rounded} type="password" value={password} placeholder="Password" class="form-control input-md" required minlength="5" onChange={(e) => setPassword(e.target.value)} />

                  </div>
                </div>


                <div class="col-md-6">
                  <div class="form-group">
                    <br />
                    <label class=" " for="Name"><b class="serif">Confirm Password</b></label>

                    <input style={rounded} type="password" value={confirmPassword} placeholder="Confirm Password" class="form-control input-md" required onChange={(e) => setConfirmPassword(e.target.value)} />

                  </div>
                </div>
              </div>
              <br />

              <div align="center">
                <Button style={rounded} type="submit" variant="success" >Register</Button> <br /><br />
              </div>

            </form>
          </div>
        </div>
      </div></div>
  );
}