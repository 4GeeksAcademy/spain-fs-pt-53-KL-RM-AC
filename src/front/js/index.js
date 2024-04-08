//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";
import "../styles/footer.css";
import { StreamChat } from 'stream-chat';
import { ChatProvider } from 'stream-chat-react';

//import your own components
import Layout from "./layout";

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));
