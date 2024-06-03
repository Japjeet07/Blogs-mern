import './create.css';
import { Box,styled,FormControl,InputBase, Button , TextareaAutosize} from '@mui/material';
import { useState,useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { DataContext } from '../../context/dataprovider';
import { API } from '../../service/api';


const Image=styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});

const Container=styled(Box)`
 margin: 50px 100px
`

const Styledformcontrol=styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row
`;

const InputTextField=styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:40px
`;

const Textarea=styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size:18px;
    border:none;
     &:focus-visible{
        outline:none;
     }
`;

const initialPost={
    title:'',
    description:'',
    username:'',
    categories:'',
    createdDate: new Date()
}


const CreatePost=()=>{

    const url='https://www.aprompt.co.uk/uploads/blog/bloggers-wiltshire.jpg';

    const[post,setPost]=useState(initialPost);
    const {account}= useContext(DataContext);
    const navigate=useNavigate();
    const location = useLocation();


    const savePost = async() => {
      
       let response= await API.CreatePost(post);
      
       if(response.isSuccess){
        navigate('/');
       }
    
    };

    
    


    const handleChange=(e)=>{
        setPost({...post,[e.target.name]:e.target.value,
        categories: location.search?.split('=')[1] || 'All',
          username: account.username})

    };

    

    return (
        <div className='createheading'>
            <Container>
                <Image src={url} alt="banner" />

                <Styledformcontrol>

                <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title"/>
                <Button variant='contained' onClick={savePost}>Post</Button>

                </Styledformcontrol>

              <Textarea
                minRows={5}
                placeholder='Write about your blog'
                onChange={(e) => handleChange(e)} name="description"
              />


            </Container>
           
        </div>
    )
}

export default CreatePost;