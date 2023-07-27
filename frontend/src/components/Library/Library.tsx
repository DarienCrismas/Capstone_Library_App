// EXTERNAL
import React, {useState} from "react";
import {Button,Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {ChevronRight, ChevronLeft} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

// INTERNAL
import { theme } from "../../Theme/themes";
import { Data } from "../Data";
import { UpdateForm } from "../UpdateForm";

const Root = styled("div")({
    padding: 0,
    margin: 0
});

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

  
export const Library = () => {
    const myAuth = localStorage.getItem("myAuth");
    return (
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
                        <NavA to="/faq">FAQ</NavA>
                       </li>
                        <li>
                        <NavA to="/search">Search</NavA>
                        </li>
                        
                       <li>
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
  
          <h1>Your Personal Library</h1>
          <Data/>
         
        </Box>
    )
}