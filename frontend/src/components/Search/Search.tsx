// EXTERNAL
import React, {useState} from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, Grid, IconButton, IconButtonProps, Typography, styled } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";


// INTERNAL
import { Input } from "../sharedComponents";
import { BookState, chooseAuthor, chooseCover, chooseDescription, chooseFirstPublished, chooseKey, chooseOwned, chooseStatus, chooseTitle, chooseUserNotes, chooseUserScore } from "../../redux/slices/rootSlice";
import { useDispatch, useStore } from "react-redux";
import { serverCalls } from "../../api";
import { useNavigate } from "react-router";
import bg_img from "../../assets/layered-peaks-haikei.svg"


interface setSearch{
    query:string
}

const NavBar = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "black",
});

const Logo = styled("h1")({
  margin: "0 0 0 0.45em",
});

const LogoA = styled(Link)({
  color: "white",
  listStyle: "none",
  textTransform: "uppercase",
  textDecorationLine: "none"
});

const LogoNav = styled("ul")({
  listStyle: "none",
  textTransform: "uppercase",
  display: "flex",
});

const NavA = styled(Link)({
  display: "block",
  padding: "1.5vw",
  color: "white",
  textDecorationLine: "none",
});



const MainText = styled("div")({
  textAlign: "center",
  position: "relative",
  top: "15%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  color: "black",
  lineHeight: 2
})

const Main = styled("main")({
  backgroundImage: `url(${bg_img})`,
  width: "100%",
  height: "100%",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  position: "absolute"
});

export const Search = () => {
    
    const [searchData, addSearchData] = useState<{ [x: string]: string; }[]>([]);
    const {register, handleSubmit} = useForm<setSearch>({})
    const store = useStore()
    

    const getList:SubmitHandler<setSearch> = async (search) => {
        if (typeof search.query === "string"){
            let book = search.query.replace(" ", "%20")
            let response = await axios.get(`https://openlibrary.org/search.json?q=${book}`)
            // console.log(response);

            let x = response.data.docs.slice(0,6);
            // console.log(x)
        //     x.forEach((element: { [x: string]: string; }) => {
        //         let desc = getDescription(element["key"])
        //         element["description"] = desc as unknown as string
        //         addSearchData((searchData) => [...searchData, element]);
                
        // });
        for (const work of x){
          let desc = await getDescription(work["key"])
          work["description"] = desc as unknown as string
          addSearchData((searchData) => [...searchData, work]);
        }
        }
    }
    const getDescription = async (key:string) => {
        let response = await axios.get(`https://openlibrary.org${key}.json`)
        // console.log(response)
        let desc = ""
        if (response.data.description){
          if(typeof response.data.description === "object"){
            desc = response.data.description.value.slice(0,500)
          }else{
            desc = response.data.description.slice(0,500)
          }
        }
        // console.log(desc)
        desc = desc.concat("...")
        return desc
    }
    console.log(searchData)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  interface ApiState {
    cover_edition_key: string;
    title: string;
    author_name: string;
    key: string;
    description: string;
    first_publish_year: string;
    status: string;
    owned: string;
    user_score: string;
    user_notes: string;
};
  
  const addToLibrary =async (work:ApiState) => {
    dispatch(chooseCover(work.cover_edition_key))
    dispatch(chooseTitle(work.title))
    dispatch(chooseAuthor(work.author_name))
    dispatch(chooseKey(work.key))
    dispatch(chooseDescription(work.description))
    dispatch(chooseFirstPublished(work.first_publish_year))
    // console.log(store.getState())

    await serverCalls.create(store.getState() as BookState)
    navigate("/library")
  }

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
//   }
  
// const ExpandMore = styled((props: ExpandMoreProps) => {
//     const { expand, ...other } = props;
//     return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//     transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
// }));
  
// function bookCard() {
//     const [expanded, setExpanded] = React.useState(false);
  
//     const handleExpandClick = () => {
//     setExpanded(!expanded);
//     }; 
// }
  const myAuth = localStorage.getItem("myAuth");
    return(
        <div>
          <NavBar>
                <Logo>
                    <LogoA to="/">
                        Home
                    </LogoA>
                </Logo>
                <LogoNav>
                    <li>
                        <NavA to="/faq">FAQ</NavA>
                    </li>
                    
                    {myAuth === "true" ? 
                        <>
                        <li>
                        <NavA to="/library">Library</NavA>
                       </li><li>
                            <NavA to="/signin">Sign Out</NavA>
                        </li></>
                        :
                         <><li>
                         <NavA to="/signin">Sign In</NavA>
                        </li><li>
                             <NavA to="/signup">Sign Up</NavA>
                         </li></>
                    };
                </LogoNav>
            </NavBar>
        <Main>
          <MainText>
            
            <h1>Search</h1>
            <form onSubmit={handleSubmit(getList)}>
            <div>
                <Input {...register('query')} sx={{width:"50%"}} name='query' placeholder='Name of Work' />   
            </div>
                <Button type='submit' color="primary" variant="contained">Submit</Button>
            </form>
          </MainText>
           
            <Grid sx = {{mt:1}} container spacing={5}>
                {searchData.length > 0 ? searchData.map((book, index)=>(
                <Grid item key={index} sm={12} md={3} lg={2}>
                    <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                    {/* <CardMedia
                    //   component="img"
                    //   height="194"
                    //   image="/static/images/cards/paella.jpg"
                    //   alt="Paella dish"
                    /> */}
                    <CardContent>
                      <Typography variant="h5" color="text.secondary">
                        {book.title}
                      </Typography>
                      <Typography sx={{mt:1}} paragraph>
                        {book.author_name[0]}
                        </Typography>
                        <Typography paragraph>
                        {book.description}
                        </Typography>
                        <Typography paragraph>
                        {book.first_publish_year}
                        </Typography>
                        <Box m={1} display="flex" justifyContent="center" alignItems="center">
                        <Button color="primary" variant="contained" sx={{justifyContent: 'center'}} onClick= {()=>{addToLibrary(book as unknown as ApiState)}}>
                          Add to Library
                        </Button>
                        </Box>
                    </CardContent>
                    {/* <CardActions disableSpacing>
                      <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit> */}
                      <CardContent>
                        {/* <Button onClick={}>
                            Add to Library
                        </Button> */}
                      </CardContent>
                    {/* </Collapse> */}
                    
                  </Card>
                 </Grid>
                    )) : <div></div>
                    }
              </Grid>
        </Main>
        </div>
    ) 
}