import './home.css'
import Banner from '../banner/banner';
import Categories from './categories';
import { Grid } from '@mui/material';
import Posts from './post/post';


const Home =()=>{
    return(
        <div className='heading'>
            <>  
                <Banner/>
                <Grid container>
                    <Grid item lg={2} sm={2} xs={12}>
                     <Categories/>
                    </Grid> 
                    <Grid container item xs={12} sm={10} lg={10}>
                       
                        <Posts/>
                    </Grid>
               
                </Grid>
            </>  
        </div>
    )
}

export default Home;