import './create.css';
import { Box,styled,FormControl,InputBase, Button , TextareaAutosize} from '@mui/material';
import { useState,useContext, useEffect } from 'react';
import { useNavigate,useLocation ,useParams} from 'react-router-dom';
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


const Update=()=>{

    const url='https://www.aprompt.co.uk/uploads/blog/bloggers-wiltshire.jpg';

    const[post,setPost]=useState(initialPost);
    const {account}= useContext(DataContext);
    const navigate=useNavigate();
    const location = useLocation();
    const {id}=useParams();


    useEffect(()=>{
        const fetchData=async()=>{
            let response= await API.getPostById(id);
            if(response.isSuccess){
                setPost(response.data);
            }
        }
        fetchData();
    },[id])

    const updateBlogPost = async() => {
      
       let response= await API.updatePost(post);
      
       if(response.isSuccess){
        navigate(`/details/${id}`);
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

                <InputTextField placeholder='Title' value={post.title} onChange={(e) => handleChange(e)} name="title"/>
                <Button variant='contained' onClick={updateBlogPost}>Update</Button>

                </Styledformcontrol>

              <Textarea
                minRows={5}
                placeholder='Write about your blog'
                onChange={(e) => handleChange(e)} name="description"
                value={post.description}
              />


            </Container>
           
        </div>
    )
}

export default Update;
