import React from 'react';
import Card from 'react-bootstrap/Card'
import {Col} from 'react-bootstrap';

class About extends React.Component
{
    render()
    {   
                
        return(

            <div class="overflow">
              <br></br>
                <div class="row">
                    <div class="container-fluid col-sm-12" style={{ backgroundColor: "red", padding: "15px" }}><h1 class="animate__animated animate__fadeIn animate__delay-1s" align="right" style={{ color: "blue", fontFamily: "serif" }}>Welcome to Secure Airways</h1></div>
                </div>

              <br></br><br></br>
                <h1 className="text-center"></h1><br/>        
            </div>
        );
    }
}
export default About;