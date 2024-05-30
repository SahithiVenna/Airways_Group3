import React from "react";

class Logout extends React.Component {



    componentDidMount() {
        sessionStorage.clear();
    }



    render() {

        window.onload = function () {
            if (!window.location.hash) {
                window.location = window.location + '#loaded';
                window.location.reload();
            }
        }

        return (

            <div class="logoutBgImg overflow">
                <br /><br /><br /><br /><br /><br /><br /><br />
                <div className="card card-dark col-md-6 offset-md-3 animate__animated animate__jackInTheBox animate__delay-1s blurDiv-roundCorners" style={{ backgroundColor: "black", color: "white" }}>

                    <h1 className="text-center serif">You are logged out successfully</h1>
                </div>
                
            </div>
        );

    }

}

export default Logout