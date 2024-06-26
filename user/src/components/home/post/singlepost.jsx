import { Box ,Typography,styled} from "@mui/material"

const Container = styled(Box)`
    border: 1px solid #d3cede;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 160px;
    & > img, & > p {
        padding: 0 5px 5px 5px;
    }
`;

const Text = styled(Typography)`
    color: #878787
    font-size: 12px;
`;

const Heading = styled(Typography)`
    font-size: 18px;
    font-weight: 600
`;
const Details = styled(Typography)`
    font-size: 14px;
    word-break: break-word;
`;



const Post =({post})=>{
    const addEllipsis = (str, limit) => {
        return str.length > limit ? str.substring(0, limit) + '...' : str;
    } 
    return (
        <Container>
        <Text>{post.categories}</Text>
        <Heading>{addEllipsis(post.title, 20)}</Heading>
        <Text>Author: {post.username}</Text>
        <Details>{addEllipsis(post.description, 100)}</Details>
    </Container>
    )
}

export default Post;