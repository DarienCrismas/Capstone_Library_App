// EXTERNAL
import React, {useState} from "react";
import firebase from "firebase/compat/app";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { Container, Button, Typography, Snackbar, Alert as MUIAlert, AlertProps, AlertTitle, CircularProgress } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { styled } from "@mui/system";
import { SubmitHandler, useForm} from "react-hook-form";

// INTERNAL
import bg_img from "../../assets/images/thimo-pedersen-TWCnHKKhqSo-unsplash.jpg";
import { Input, InputPassword } from "../sharedComponents";


const signinStyles = {
    googleButton: {
        backgroundColor: "#3c5aa6",
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
        borderRadius: "20px",
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
        backGroundColor: "#4caf50"
    }
};


const NavA = styled(Link)({
    display: "block",
    color: "black",
    fonFamily: "monospace",
    marginBottom: "20px"
})

const Main = styled("main")({
    backgroundImage: `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,0)), url(${bg_img})`,
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
        console.log(auth);

        if (auth.currentUser){
           
            localStorage.setItem("myAuth", "true")
            navigate("/dashboard")
        }else{
            navigate("/signin")
        }
    };

    onAuthStateChanged(auth, (user)=>{
        if (user){
            console.log(user.email)
            console.log(user.uid)
        }
    })

    const signUserOut =async () => {
        await signOut(auth);
        localStorage.setItem("myAuth", "false");
        navigate("/signin")
    };

    if (loading){
        return (<CircularProgress/>)
    };

    const myAuth = localStorage.getItem("myAuth");

   
    if (myAuth === "true"){
        return(
            <Button variant="contained" color="secondary" onClick={signUserOut}>Sign Out</Button>
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

    const navToDash = () =>{
        navigate("/dashboard")
    };

    const onSubmit: SubmitHandler<UserProps> =async (data, event) => {
        event?.preventDefault()
        console.log(data.email, data.password);

        signInWithEmailAndPassword(auth, data.email, data.password)
            .then((userCredential)=>{
                localStorage.setItem("myAuth", "true");
                const user = userCredential.user;
                navigate("/dashboard")
            })
            .catch((error)=>{
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage, errorCode)
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
                <Button type="submit" variant="contained" sx={{backgroundColor: "#ffcb05", left: "43%", borderRadius: "20px"}}>Submit</Button>
            </form>
            <NavA to="/signup" sx={{textAlign: "center", marginTop: "20px"}}>Register Now</NavA>
            <GoogleButton open={open} onClick={handleSnackClosed}/>
            <Snackbar message="success" open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
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

    const navToDash = () =>{
        navigate("/dashboard")
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
                    <InputPassword {...register("password")} name="passsword" placeholder="Enter Password Here"/>
                </div>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
            <GoogleButton open={open} onClick={handleSnackClosed}/>
            <Snackbar message="success" open={alertOpen} autoHideDuration={3000} onClose={navToDash}>
                <div>
                    <Alert severity="success">
                        <AlertTitle>Successful Sign Up. Redirecting.</AlertTitle>
                    </Alert>
                </div>
            </Snackbar>
        </Container>
    )
};