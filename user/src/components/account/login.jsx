import {Box, TextField,Button,styled, Typography} from '@mui/material';
import { useState ,useContext} from 'react';
import { API } from '../../service/api';
import { DataContext } from '../../context/dataprovider';
import './login.css';
import { useNavigate } from 'react-router-dom';





const Component=styled(Box)`
width: 400px;
  margin: auto;
  backdrop-filter: blur(3px); 
  margin-top:64;
  


`;


const Image=styled('img')({
    width:200,
    margin:'auto',
    display:'flex'
})

const Wrap=styled(Box)`

padding: 25px 35px;
display:flex;
flex:1;
flex-direction:column;
& > div, & > button{
   margin-top:20px;
}
`
const BlackButton = styled(Button)`
  color: black !important; 
  background-color: white; 
`;

const signupValue={
    name:'',
    username:'',
    password:''

}

const Error=styled(Typography)`
    font-size: 10px;
    color: #ff6161;
    line-height:0;
    margin-top:10px;
    font-weight:600;
`

const loginvalues={
    username:'',
    password:''
}



const Login =({isUserAuthenticated}) =>{

    const imgurl='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKUAAACUCAMAAADF0xngAAABYlBMVEX///9LbHPSHgfoViULp7QXLjQAbYH///324Wruxyz/9fQAboD4+fsWLzTw9PZ0jI/z+/o+YWb//fYAAAju3H/S2NsAWnBQtr/g9PbrxCHP0tUAn63L4+fTHAD///T/+vjw3HMhbH4AY3jKAADGEgDH6uv37ab021sQJy315YX+/ub//+7qURfryzzfRQA6fpAADhLm6Ojqv7vjoZrv1dP05uS0wMKMoqVQWl7XbWzQRj3YmJWu3uGS0NNWdXnOGhLGMTDBUU3WgXxnv8MuSU+Ag4TDJRrrtK5FTVDWV1HFSUHRiIP799X477MlUVcAHSTWk4KKusHaPRj0zbwihI4wOz/aUAqcf33paC7ij0H1xWP27b9zGBTXWymJEwcudX0ZCAeoHxLVbDMtCAjVPyZHDgjfknPmpVMmUGHgcFPqq5VlkZ3XhHHpjGz94tLmqXJdFQ+PQCrHVy5WLSB3OyPAak3PjgYRAAAJXElEQVR4nO2ZiVsaWRbFnwKWQBVCRSLIKmixoxgWSTRxidrpgLRi7E7T9PTqBB2Znu3/n3vfUlUqSYoenZn+vnfcQKHq5zn33vcKCJGSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkvqclP81gBMpIPFDcUjMHlZjtzaf1Rs+dpMeCo/z8JRw2GCEn9oZJj4q0GxtqfgkXzu7+rz9YrOuiD/x//thKeGQ27GlnbVpntRceDkTyjfxP2vsziYS2eyr3b39Td+jVQ9SHrjdsVjsYHst6OAJgeXWSWhmZuZ17xC9rK/OohKg7OrR/nG9kXJy1ulBg26qWMx9sLMdsfCtg5m31WZrIYSMMyEt/wVW5rPsrCUwdfXN/ovNhvlE65sFVurov6Mm1mJuSxB+JMgPopDbPRVuvWSIaKXHs7EMj2gnZm+Jxf/l282GiciPwY6T7HQLuc7UjITsuG8JPd2OB4UJhPVsABBPZizlPRqN/OgOJY8fTH0u4leY4EapY6Tn53NRY9rIFRI8cN+VFT43MtxamAnZGGde5z0eTz5AGqsTKM34j2j8bEJB0EZhHlWJ5qYNXCGRpXuUCApfNHyiBiDomdsKaRpQPmmS449CivizX+FZktRFqpzXGy1OSUlgDk2iZJbG3KfNhZO7jLQq0cstsp+wM4Hugp5V+0ppYMzn5oUqQNm91ZxOtPNRSnfs/E+h+4ggdNKjae9qZvPAHNptt9vPV7N27rNy+WLAg87lctxKbzStTLdGKUEz4PuIkwBRJwzSk//6OWdKHO3Xfb6Ukqq/5f2UgA/XN++/5Q4WjO6g2y2k0Uqvt4KRT2NlhAIu2cSRz+1cC6CXtgYHSPjoffeKQWbfbJKUj0qpt/kIHb7/VtRiYVDSsc/1ohGNImaXTLfcs7KM2LTGasBOGQoEArUFW4Nr4KSm9b7nTu7VU+ikksIfvj3ETLw3K3HeKAIjfupKslsBzOii7tRL9ijW4UE1yD/hGyvVmC3wUFBVAyYlq0ronh9+ZJC7DTSy/rYNsafg40121lX9yYLUAVEvlUpJ4CQDzLzScWomPkyJsCJEOv5rZD2IYV3aKYlFyRoce/xnGnhidRMgG/vZLAyeNgCn6r+4XK4zUZJGCbIuGoV0wSiinYtRs8udurlmUkZ2DlDbEbi9jb/zhyZ7qTFGKMtfWVG2wchUmzU3vaNcloHyz5yyQ/RUkVVoGmwd0MjnnXePYs4hpFyiN2M74Cawn/s/fJhIGcozSC3f+x7BEq/AytSxmEDZF2DsuAqUPHID6rFU4LMyOuDtA4PdefcEl2yUbsvX2HlmLjOZMs/z1vIbRzTwLxtg3545OEdwNzV0uco8crBS6fJlJ+qtUMZpIoeHrdnIOGUMvIyvzIE+hCZQvs6LwAXlHphX3+WUZ66LMVBegpkJGnm6BLUorPSaooPdYeCKWB5Z4lSQuHqaAUj/00mUmugdT+83FvG+4kttvkowRper2k/5lCuMfEhHpa7rRb76RJkoZqXj2ErlIHavewAosuL3A6UVuUVpNjhQfsf6ZT/FKc8QklISpCyfpekY0pUiDzzNxCwdOC1MJRizEhdSg/H1OaScmzPNvEUp3NxgMz2BXtZ/gfWQCSlTSMkiN5JAmWaQJT2ZTOpJHEU42J1eC67ZKVX6BTjx68wco/xwlxIbXOPN88MRX3igeRq7ZxzSNYTuISMYRa4ydnkhqeslSulNw2xHUUrHa7libdORMhKngi1lkNWlFblJaVWl1vuVLeKJ57A8pv5S5pDlGx/rcbjpwi4vwiQq0Kqs4IYjKSijdC134ueSjTJyvUL1MhBUA9dopd/sckEZytvLks+e7DNoF5yQTNg8fXYPB3uuA8vjwGzwStGkTBNne8yI2065PkeVOSVB0qSUfhG5oHxnQUJZijn+BtwjVy4acvlK8fn0G+bs2V955Ekjl2MDaNFMnO7YnXi5bVGqSInF6M9cQ4HGMxQzY1LSdTxkgxRbDWjt8hWBkPujarU66mPefVGiYyzIAZhZKnijXhhCi7iSC8quM0qxTY+d4/hZpyGjl6rKKM3BzrwM4ZbNo2n2rQYdkeUxDHY1NR6PcYdJxqJERz4DzSwippGuVNID6HC23aCR604me3CJM/pXMPGVDNU1bjcE5dOFkEV5YqtKrfdbAi8ZGM6wj1s3tg9O9Ye8k8qXtCDnC7gp0pNF2GUCpOUlbt8+T8nK8hz8W4fEA6zF4xFVVcmpoIyblGotvMzV5GW5KsZPeXilEzXlU1XFd/WN2e7HpMR3wYSOIIDtgrGCMjpwQomBx/zIs86HJf/Bmge1HmiFBKWlMAS+8WPCHJGU87LfaIz7l8JI1JgoBt+xFSFppdRJQ4/jVIdlEvIvOqFcwrAZDNulAyEgksjpCrPSDzW6zCgJuUP585EdEtec6oXrompjdA3hsmHAV/DcotGF0ox6F43FShTuDorOLiqCyAhLIS7ZcUvbp2LpATVJDS/KQuFaLWypievP3/4+hMHj+rjKIzgJWxwrXrHPoN/TcLH2eT6mwPX6XEbUnyXxK9RKnBAa+cnJSe+JqQ2+C/7HP/81GrqqH0GtXuGkMew7NiAEFx0Tcs7w6TV0NhgqvOPbDHH3GpJuhuxbdL5Px3X8ieewGfaN+1+NAHQCabWOkVrLTpQGXRIvbU+jYC1+6mf+cUATmJYlYZHDZkjz2Gd678kXzZpKD6H4Gv2r0cU90iG+3E5gp5FjiJUCDVpRpqM0F/tIU4TPEAXo0zjWd4taia8S8Jme773bagXoEazz6ePjm9GwbMVfvqEvC5JCjgctXm2d2kn+Qij8iED44KlwkZFm6N/CJ9xK5uZGb6u1HLQdwDyn4qvb4q9esj/CNWPOGJTEiYjzi8e7sPT5aiR+ukLD9/PPa2Z2SLwUCC5ueFrhwKcOBfFf/oTxl/vsuCWjk3yotwXEceIQPuty2BFts/NAl+OFRH7Ds3UY5v/Vpw+jj69uRnXxWvUnnzEVpELMl76hn9bnaPg1dtowboagXVrLn3KRQSqiVBX+ZoV4cf5B32VhR8OrivXMdYDtUwMLWs9zGFbZScVbTxOfK96IsypWsTn6GIqHxbmbh81HO8t/pFs7P/WhCusxpEy49X+mR3jP8xF0b7P/R4CWkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpL6L+rfTHhn71vMJncAAAAASUVORK5CYII=';
    const[toggleaccount,toggleAccount]=useState('login');
    const[signup,setSignsup]=useState(signupValue);
    const[error,setError]=useState('');
    const[login,setLogin]=useState(loginvalues);
    const{setAccount}=useContext(DataContext);
    const navigate=useNavigate();
    
    

    const toggleSignup= ()=>{
        if(toggleaccount === 'login'){
            toggleAccount('signup');
        }
        else{
            toggleAccount('login');
        }
    }

    const oninputChange=(e)=>{
        setSignsup({...signup,[e.target.name]:e.target.value})
    }

    const signupUser = async () => {
       let response=await API.userSignup(signup);
       if(response.isSuccess){
        setError('');
        setSignsup(signupValue);
        toggleSignup('login')
       }
       else{
        setError('something went wrong');
       }
      };

      const onValueChange=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
      }

      const loginUser=async()=>{
        let response=await API.userLogin(login);
        if(response.isSuccess){
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
           
           
            setAccount({username:response.data.username,name:response.data.name});
            isUserAuthenticated(true);
            navigate('/');
        }
        else{
            setError('oops something went wrong')
        }
      }
      

 return (
    <div className='login-page'>
    <div className='login-container'>
    

    <Component>
        

        <Box style={{ backdropFilter: 'none' }}>
            <Image src={imgurl} alt='Login' />
            {
                toggleaccount=== 'login' ?
            
                <Wrap>
                <TextField variant="filled" value={login.username} label='Enter Username' onChange={(e)=> onValueChange(e)} name="username"/>
                <TextField variant="filled" value={login.password} label='Enter Password'onChange={(e)=> onValueChange(e)} name="password"/>
                <Button variant="contained" onClick={()=>loginUser()}>Login</Button>
                < BlackButton onClick={()=>toggleSignup()}>Sign Up</ BlackButton>
                </Wrap> 
                :
                  <Wrap>
                <TextField variant="filled" label='Enter Name' onChange={(e)=> oninputChange(e)} name='name'/>
                <TextField variant="filled"  label='Enter Username' onChange={(e)=> oninputChange(e)} name='username'/>
                <TextField variant="filled"  label='Enter Password' onChange={(e)=> oninputChange(e)} name='password'/>

                {error && <Typography>{error}</Typography>}
                <Button variant="contained" onClick={()=> signupUser()}>Sign Up</Button>
                < BlackButton onClick={()=>toggleSignup()}>Already Have An Account</ BlackButton>
                </Wrap>
                }
        </Box>
    </Component>

    </div>
    </div>
   
 )
}

export default Login;

