import React from 'react'
import IMAGES from '../../images/Images'
import {Button, TextField} from '@mui/material'
import { makeStyles } from "@material-ui/core/styles";

const AccSettings = () => {
    const class_name = useStyles()
  return (
    <>
    <div className='p-4 d-flex flex-column gap-4'>
        <div className=''>
            <span className='h3'>Account setting</span>
        </div>
        <div className=''>
            <img src={IMAGES.profile_icon} alt="" className='me-4' style={{width: '100px'}}/>
            <Button
            className={class_name.button}
            variant='contained'
            size='large'
            >
                Upload New Photo
            </Button>
        </div>
        <div className='d-flex gap-4'>
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Username'
            />
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Name'
            />
        </div>
        <div className='d-flex gap-4'>
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Email'
            />
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Role'
            />
        </div>
        <div className='d-flex gap-4'>
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Status'
            />
            <TextField
            className={class_name.textField}
            fullWidth
            placeholder='Active'
            />
        </div>
        <div>
            <Button
            className={class_name.button}
            variant='contained'
            size='large'
            >
                Save
            </Button>
        </div>
    </div>
    </>
  )
}

export default AccSettings

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