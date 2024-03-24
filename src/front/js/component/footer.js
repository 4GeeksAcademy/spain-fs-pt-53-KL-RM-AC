import React, { Component } from "react";
import "../../styles/footer.css";

export const Footer = () => {
	return(
		<footer className="footer mt-auto py-3 text-center">
			<p>
				Made by{" "}
				<a className="enlace" href="https://github.com/adrianacp10"> <i className="fa-brands fa-github"></i> Adriana </a>
				<a className="enlace" href="https://github.com/Karelyon"><i className="fa-brands fa-github"></i> Karen </a>
				<a className="enlace" href="https://github.com/Rociosantos18"><i class="fa-brands fa-github"></i> Rocio</a>
				
			</p>
		</footer>
	)
	};
