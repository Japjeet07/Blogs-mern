import {Box,Typography,styled} from '@mui/material';

const Image=styled(Box)`
    background:url(https://t4.ftcdn.net/jpg/04/42/94/37/360_F_442943781_bZiAtWmRfwebMtGaKgaiswi86v3PvAQ4.jpg) center/55% repeat;
    width: 100%;
    height:50vh;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column
`;

const Heading=styled(Typography)`
    font-size:70px;
    color: #FFFFFF;
    line-height:1
`;
const SubHeading=styled(Typography)`
    font-size:20px;
    background:#FFFFFF;
`


const Banner=()=>{
    return (
        <Image>
            <Heading>BLOG</Heading>
            <SubHeading>Japjeet</SubHeading>

        </Image>
        
    )
}

export default Banner;