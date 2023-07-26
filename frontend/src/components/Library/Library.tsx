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
    backgroundColor: "red",
});

const Logo = styled("h1")({
    margin: "0 0 0 0.45em",
});

const LogoA = styled(Link)({
    color: "black",
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
    color: "black",
    textDecorationLine: "none",
});

export const Library = () => {

    return (
        <Box>

            <NavBar>
                <Logo>
                    <LogoA to="/">
                        Library
                    </LogoA>
                </Logo>
                <LogoNav>
                    <li>
                        <NavA to="/faq">FAQ</NavA>
                    </li>
                    <li>
                        <NavA to="/search">Search</NavA>
                    </li>
                    <li>
                        <NavA to="/library">Library</NavA>
                    </li>
                </LogoNav>
            </NavBar>
  
          <h1>Your Personal Library</h1>
          <Data/>
         
        </Box>
    )
}