import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/Home";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { MyProfile } from "./pages/MyProfile";
import { CreateProfile } from "./pages/CreateProfile";
import { EditProfile } from "./pages/EditProfile";
import { Password } from "./pages/Password";
import { Finder } from "./pages/finder";
import { LearnMore } from "./pages/learnmore";
import { HomeLogged } from "./pages/homelogged";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (

        <BrowserRouter basename={basename}>
            <ScrollToTop>
                <Navbar />
                <div className="containerLayout">
                    <Routes className="body">
                        <Route element={<Home />} path="/" />
                        <Route element={<MyProfile />} path="/profile" />
                        <Route element={<CreateProfile />} path="/create" />
                        <Route element={<EditProfile />} path="/edit" />
                        <Route element={<Password />} path="/password" />
                        <Route element={<Finder />} path="/finder" />
                        <Route element={<HomeLogged />} path="/homelogged" />
                        <Route element={<LearnMore />} path='/learnmore/:id' />
                        <Route element={<SignUp />} path="/user-signup" />
                        <Route element={<Login />} path="/user-login" />

                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </div>
                <Footer />
            </ScrollToTop>
        </BrowserRouter >

    );
};

export default injectContext(Layout);
