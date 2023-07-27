// EXTERNAL
import { Accordion, AccordionSummary, Typography, AccordionDetails} from "@mui/material"
import { Box, styled } from "@mui/system"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link } from "react-router-dom";

// INTERNAL
import bg_img from "../../assets/layered-peaks-haikei.svg"


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
    color: "white",
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

const Main = styled("main")({
    backgroundImage: `url(${bg_img})`,
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "absolute"
});


export const Faq = () =>{
    const myAuth = localStorage.getItem("myAuth");
    return(
        <Main>
        <Box>
        <NavBar>
                <Logo>
                    <LogoA to="/">
                        Home
                    </LogoA>
                </Logo>
                <LogoNav>
                    
                    {myAuth === "true" ? 
                        <>
                        <li>
                        <NavA to="/search">Search</NavA>
                        </li>
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
                    }
                </LogoNav>
            </NavBar>
            <Box mt={5} display="flex" justifyContent="center" alignItems="center">
                <Accordion sx={{width:"50%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="a1-content"
                            id="a1-header">
                            <Typography>About</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            Book collection app. You can track reading progress, whether you own a book, give your book a personal rating, and leave notes on your reading experience.
                            </Typography>
                        </AccordionDetails>
                </Accordion>
            </Box>
            <Box mt={3} display="flex" justifyContent="center" alignItems="center">
                <Accordion  sx={{width:"50%"}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="a2-content"
                            id="a2-header">
                            <Typography>Quick Tips</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                            While the personal rating field can take short comments, if you want to be able to sort by rating it would be best to use a consistent number system.
                            </Typography>
                        </AccordionDetails>
                </Accordion>
            </Box>
            
        </Box>
    </Main>
    )
    
}