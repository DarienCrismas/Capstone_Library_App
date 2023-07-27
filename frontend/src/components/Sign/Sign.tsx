// EXTERNAL
import React, {useState} from "react";
import firebase from "firebase/compat/app";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Container, Button, Typography, Snackbar, Alert as MUIAlert, AlertProps, AlertTitle, CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Box, styled } from "@mui/system";
import { SubmitHandler, useForm} from "react-hook-form";

// INTERNAL
import bg_img from "../../assets/layered-peaks-haikei.svg"
import { Input, InputPassword } from "../sharedComponents";


const signinStyles = {
    googleButton: {
        backgroundColor: "black",
        margin: "2em",
        padding: 0,
        color: "white",
        height: "50px",
        width: "250px",
        border: "none",
        textAlign: "center",
        fontSize: "16px",
        lineHeight: "48px",
        display: "block",
        borderRadius: "10px",
        fontFamily: "monospace",
        cursor: "pointer",
        left: "22%"
    },
    googleLogo: {
        width: "48px",
        height: "48px",
        display: "block"
    },
    typographyStyle:{
        fontFamily: "monospace",
        textAlign: "center",
        fontSize: "2em",
    },
    containerStyle: {
        marginTop: "2em"
    },
    snackBar: {
        color: "white",
        backGroundColor: "#black"
    }
};


const NavA = styled(Link)({
    display: "block",
    color: "black",
    fonFamily: "monospace",
    marginBottom: "20px"
})

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

const Alert = (props: AlertProps) => {
    return (<MUIAlert elevation={6} variant="filled" />)
}

interface ButtonProps {
    open?: boolean;
    onClick?: () => void;

}


export const GoogleButton = (props: ButtonProps) =>{
    const navigate = useNavigate();
    const auth = getAuth();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn =async () => {
        await signInWithGoogle();
        // console.log(auth);

        if (auth.currentUser){

            onAuthStateChanged(auth, (user)=>{
                if (user){
                    console.log(user.email)
                    console.log(user.uid)
                    localStorage.setItem("user_token", user.uid)
                }
            })

            localStorage.setItem("myAuth", "true")
            console.log(localStorage.getItem("user_token"))
            navigate("/library")
            window.location.reload()
            
        }else{
            navigate("/signin")
        }
    };

    

    const signUserOut =async () => {
        await signOut(auth);
        localStorage.setItem("myAuth", "false");
        localStorage.setItem("user_token", "")
        navigate("/signin")
    };

    if (loading){
        return (<CircularProgress/>)
    };

    const myAuth = localStorage.getItem("myAuth");

   
    if (myAuth === "true"){
        return(
            <Box m={3} display="flex" justifyContent="center" alignItems="center">
                <Button variant="contained" sx={{color:"#00000", fontSize:"20px"}} onClick={signUserOut}>Sign Out</Button>
            </Box>
            
        )
    }else{
        return(
            <Button sx={signinStyles.googleButton} onClick={signIn}>Sign In With Google</Button>
        )
    };
};

interface UserProps {
    email: string,
    password: string
}

export const SignIn = () =>{
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<UserProps>({});
    const auth = getAuth();

    const handleSnackClosed = () =>{
        setOpen(false)
        setAlertOpen(true)
    };

    const navToLibrary = () =>{
        navigate("/library")
        window.location.reload()
    };


    const onSubmit: SubmitHandler<UserProps> =async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password);

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential)=>{
                
                localStorage.setItem("myAuth", "true");

                const user = userCredential.user;
                navigate("/library")
                window.location.reload()
                
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
            })

            onAuthStateChanged(auth, (user)=>{
                if (user){
                    console.log(user.email)
                    console.log(user.uid)
                    localStorage.setItem("user_token", user.uid)
                    console.log(localStorage.getItem("user_token"))
                }
            })

    };

    return(
        <Main>
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign In
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input {...register("email")} name="email" placeholder="Enter Email Here"/>
                    <label htmlFor="password">Password</label>
                    <InputPassword {...register("password")} name="password" placeholder="Enter Password Here"/>
                </div>
                <Button type="submit" variant="contained" sx={{backgroundColor: "#00000", left: "43%", borderRadius: "5px"}}>Submit</Button>
            </form>
            <NavA to="/signup" sx={{textAlign: "center", marginTop: "20px"}}>Register Now</NavA>
            <GoogleButton open={open} onClick={handleSnackClosed}/>
            <Snackbar message="success" open={alertOpen} autoHideDuration={3000} onClose={navToLibrary}>
                <div>
                    <Alert severity="success">
                        <AlertTitle>Successful Sign In. Redirecting.</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
        </Main>
    )
};


export const SignUp = () =>{
    const [open, setOpen] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm<UserProps>({});
    const auth = getAuth();

    const handleSnackClosed = () =>{
        setOpen(false)
        setAlertOpen(true)
    };

    const navToLibrary = () =>{
        navigate("/library")
        window.location.reload()
    };

    const onSubmit: SubmitHandler<UserProps> =async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password);

        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential)=>{
                const user = userCredential.user;
                navigate("/signin")
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
            })

    };

    return(
        <Container maxWidth="sm" sx={signinStyles.containerStyle}>
            <Typography sx={signinStyles.typographyStyle}>
                Sign Up
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <Input {...register("email")} name="email" placeholder="Enter Email Here"/>
                    <label htmlFor="password">Password</label>
                    <InputPassword {...register("password")} name="password" placeholder="Enter Password Here"/>
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            <GoogleButton open={open} onClick={handleSnackClosed}/>
            <Snackbar message="success" open={alertOpen} autoHideDuration={3000} onClose={navToLibrary}>
                <div>
                    <Alert severity="success">
                        <AlertTitle>Successful Sign Up. Redirecting.</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    )
};