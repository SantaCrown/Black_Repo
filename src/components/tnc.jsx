import { useState } from 'react';
import axios from 'axios';
import { TextField, Typography, Box, Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Button from "../uielement/Button";
import { Label } from 'recharts';
function Tnc() {
  const [check , SetChecked] = useState(false)

function changeCheck() {
  SetChecked(!check)
}

 

  return (
    <div className="login-singup-page">
      <Container className='login-singup-page-container' maxWidth="lg">
      <Box sx={{ mt: 8}}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms And Conditions
        </Typography>
        <div className='flex flex-col gap-3 text-[#ffffff] leading-8'> 
        <p className='text-[#ffffff]'>
        1. Trial Project: The Black Lemon project is a trial initiative that utilizes the Black Lemon Token as a means to access the platform and its features. By participating, you acknowledge that this is an experimental project.
</p>
<p>
2. Access and Use Only: The Black Lemon Token should not be construed as an investment. It serves solely as a token for accessing the Black Lemon platform and its associated functionalities.
</p>
<p>
3. Team Rights: The Black Lemon AI team reserves the right to exit the project at any time without any liability to holders of the Black Lemon AI Token. Participants acknowledge this condition by engaging with the token.
</p>
<p>
4. No Solicitation to Purchase: The Black Lemon AI team has never solicited or encouraged any individuals to purchase the Black Lemon AI Token. Participation is voluntary and at the individual’s discretion.
</p>
<p>
5. No Tokens Held by Team: The Black Lemon AI team does not hold any tokens in their possession, ensuring that all transactions and holdings are managed independently by token holders.
</p>
<p>
  
6. Accredited Investors: By purchasing the Black Lemon AI Token, you confirm that you are an accredited investor and fully understand the risks outlined in these terms.
</p>
<p>
By engaging with the Black Lemon AI Token, you agree to these terms and acknowledge your understanding of the inherent risks. Always conduct your own research before participating in any project.
        </p>
        <p className='flex flex-row gap-2 items-center'>
          <input type='checkbox' onChange={changeCheck} className='w-[20px] h-[20px]'/> <p>Accept Terms And Conditions</p>
        </p>
        {check && <NavLink to="/login" buttonType="link" className="default-btn login-btn"
            
            variant="outlined"
            fullWidth
            sx={{ mt: 2 }}
          >
            Continue To Website
          </NavLink>}
        </div>
      </Box>
    </Container>
    </div>
  );
}

export default Tnc;