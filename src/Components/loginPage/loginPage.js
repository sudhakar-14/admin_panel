import React, { useState } from 'react'
import IMAGES from '../../images/Images'
import { styled, useTheme } from '@mui/material/styles';
import { TextField,InputAdornment,IconButton, FormControlLabel, Checkbox, Button} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { EyeOutline, EyeOffOutline } from 'mdi-material-ui'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";

const LoginPage = () => {
  const class_name = useStyles()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
    <div className='w-100 h-100 d-flex justify-content-center align-items-center'style={{backgroundColor: '#F6F6F6',minHeight: '100vh'}}>
      <div className='bg-white d-flex flex-column justify-content-center pt-3 p-5' style={{boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}}>
        <div className='d-flex justify-content-center pb-3'>
          <img src={IMAGES.company_logo} style={{width: '185px'}}/>
        </div>
        <div className='d-flex flex-column pb-4'>
          <span className='fs-4 fw-medium pb-1'>Welcome to Saudi Ocean! 👋🏻</span>
          <span className='text-secondary'>Please sign-in to your account and start the adventure</span>
        </div>
        <div className='pb-1'>
          <TextField
          sx={{paddingBottom:'18px'}}
          className={class_name.textField}
          fullWidth
          placeholder='Email'
          />
          <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          className={class_name.textField}
          placeholder='Password'
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOutline /> : <EyeOffOutline />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          />
        </div>
        <div className='d-flex justify-content-between align-items-center pb-4'>
          <FormControlLabel control={<Checkbox className={class_name.checkBox} />} label='Remember Me' />
          <span>Forgot Password?</span>
        </div>
        <div>
            <Button
              fullWidth
              size='large'
              variant='contained'
              className={class_name.button}
              onClick={()=>{navigate('/panel')}}
              // sx={{backgroundColor: 'red'}}
              // sx={{ marginBottom: 7 }}
              // onClick={() => router.push('/')}
            >
              Login
            </Button>
        </div>
      </div>
    </div>
    </>
  )
}

export default LoginPage

const useStyles = makeStyles({
  textField:{
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "black"
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#026b93"
    },
  },
  checkBox: {
    "&.Mui-checked":{
      color: '#026b93'
    }
  },
  button: {
    "&.MuiButton-contained": {
      backgroundColor: '#026b93'
    },
    "&:hover .MuiButton-contained":{
      backgroundColor: '#026b93'
    }
  }
})