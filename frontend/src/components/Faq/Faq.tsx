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
                    <li>
                        <NavA to="/">Home</NavA>
                    </li>
                    
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
        <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="a1-content"
                        id="a1-header">
                        <Typography>About</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        Web app for tracking your pokemon card collection.
                        </Typography>
                    </AccordionDetails>
                    </Accordion>
                    <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="a2-content"
                        id="a2-header">
                        <Typography>Instructions</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        If there was more functionality this is where I would put actual instructions. Maybe I'll expand this after capstone.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
    </Box>
    </Main>
    )
    
}