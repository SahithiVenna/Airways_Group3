import React, {useState} from 'react';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {TextField, Button} from '@mui/material'
import '../Phone.css';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase/setup';

function PhoneSignin() {
 const [phone, setphstate] = useState('');
 const [user,setUser] = useState(null);
 const [otp, setOtp] = useState('');

//const pad = {marginTop : '300px'}

const sendOtp = async()=>{
    try{
        const recaptcha = new RecaptchaVerifier(auth,"recaptcha",{})
        const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
        setUser(confirmation);
    }catch(err){
        console.log(err)
    }
}

const verifyOtp = async()=>{
    try{
        const data = await user.confirm(otp);
    }catch(err){
        console.log(err)
    }
}


const changeph = (ph)=>{
    setphstate("+"+ph);
}

const onchangeotp = (e) => {
    setOtp(e.target.value)
}


  return (
    <div className='phone-signin'>
      <div className='phone-content'>
        <PhoneInput
            country={'us'}
            value={phone}
            onChange={changeph}
        />
       <Button onClick={sendOtp} sx={{marginTop:"10px", marginRight:"10px"}} variant='contained'>Send OTP</Button>
       <div style={{marginTop:"20px"}} id="recaptcha"></div>
        <br/>
        <TextField onChange={onchangeotp} sx={{marginTop:"10px", width:"300px"}} variant='outlined' size='small' label='Enter OTP'/>
        <br/>
      <Button href="/" onClick={verifyOtp} sx={{marginTop:"10px"}} variant='contained' color='success'>Verify OTP</Button>
      </div>
    </div>
  )
}

export default PhoneSignin
