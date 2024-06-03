import { Box,TextareaAutosize,Button,styled } from "@mui/material";
import { useState, useEffect, useContext } from 'react';
import { API } from "../../../service/api";
import Comment from './comment';
import { DataContext } from "../../../context/dataprovider";




const Container = styled(Box)`
    margin-top: 100px;
    display: flex;
`;
const Image = styled('img')({
    width: 50,
    height: 50,
    borderRadius: '50%'
});
const StyledTextArea = styled(TextareaAutosize)`
    height: 100px !important;
    width: 100%; 
    margin: 0 20px;
`;

const initialValue = {
    name: '',
    postId: '',
    date: new Date(),
    comments: ''
}



export const Comments=({post})=>{
    const url='https://static.thenounproject.com/png/12017-200.png';
    const [comment, setComment] = useState(initialValue);
    const { account } = useContext(DataContext);
    const [comments, setComments] = useState([]);
    const [toggle, setToggle] = useState(false);



   
    const handleChange = (e) => {
        setComment({
            ...comment,
            name: account.username,
            postId: post._id,
            comments: e.target.value
        });
    }

    const addComment = async() => {

        let response= API.newComment(comment);
        if(response.isSuccess){
            setComment(initialValue);
        }
        setToggle(prevState => !prevState);

    }

    useEffect(() => {
        const getData = async () => {
            const response = await API.getAllComments(post._id);
            if (response.isSuccess) {
                setComments(response.data);
            }
        }
        if(post._id){
            getData();
         }
    }, [post,toggle]);


   
    return (
        <Box>

            <Container>
                <Image src={url} alt="dp"/>
                <StyledTextArea
                    minRows={5}
                    placeholder="Comment Please"
                    value={comment.comments}
                    onChange={(e) => handleChange(e)} 

                />
                <Button variant="contained" color="primary" size="medium"
                onClick={(e) => addComment(e)}>Post Comment</Button>
            </Container>

            <Box>
               {
                    comments && comments.length > 0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}  />
                    ))
                }
            </Box>

        </Box>
    )
}

export default Comments;