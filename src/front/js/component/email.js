// import React, { useState } from "react";
// import emailjs from "emailjs-com";

// export const Email = () => {
//     const frmContact = {
//         userEmail: "",
//         concernCategory: "",
//         emailTitle: "",
//         emailDetails: ""
//     };
//     const [contact, setContact] = useState(frmContact);
//     const [showMessage, setShowMessage] = useState(false);

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setContact({ ...contact, [name]: value });
//     };

//     const handleSubmit = e => {
//         e.preventDefault();

//         emailjs
//             .send("service_8u2jvcw", "template_bu9rbda", contact, "<YOUR USER ID>")
//             .then(
//                 response => {
//                     console.log("SUCCESS!", response.status, response.text);
//                     setContact(frmContact);
//                     setShowMessage(true);
//                 },
//                 err => {
//                     console.log("FAILED...", err);
//                 }
//             );
//     };

//     return (
//         <div className="container pt-2 text-center">
//             <div className="alert alert-light" role="alert">
//                 <a href="https://tupaginaonline.net/tutorial-para-enviar-correo-con-react-js-hooks-y-emailjs">
//                     Tutorial para enviar correo con React.js (Hooks) y emailJS
//                 </a>
//             </div>

//             {showMessage ? (
//                 <div className="alert alert-success col-md-5 mx-auto" role="alert">
//                     Email Send Success!!
//                 </div>
//             ) : (
//                 ``
//             )}

//             <form onSubmit={handleSubmit}>
//                 <div className="pt-3">
//                     <h3 className="font-weight-bold"> Contact Us !! </h3>
//                 </div>
//                 <div className="pt-3 col-md-5 mx-auto">
//                     <div className="form-group text-left">
//                         {" "}
//                         <b>Your Email</b> <br />
//                         <input
//                             required
//                             type="text"
//                             value={contact.userEmail}
//                             name="userEmail"
//                             onChange={handleChange}
//                             className="form-control"
//                             placeholder="Your email"
//                         />
//                     </div>
//                 </div>
//                 <div className="pt-3 col-md-5 mx-auto">
//                     <div className="form-group text-left">
//                         {" "}
//                         <b>Concern Category</b> <br />
//                         <select
//                             required
//                             className="form-control"
//                             value={contact.concernCategory}
//                             onChange={handleChange}
//                             name="concernCategory"
//                         >
//                             <option value="">Select</option>
//                             <option value="info">Info</option>
//                             <option value="buy">Buy</option>
//                             <option value="play tennis">Play tennis</option>
//                             <option value="other">Other</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="pt-3 col-md-5 mx-auto">
//                     <div className="form-group text-left">
//                         {" "}
//                         <b>Title</b> <br />
//                         <input
//                             value={contact.emailTitle}
//                             required
//                             type="text"
//                             name="emailTitle"
//                             onChange={handleChange}
//                             className="form-control"
//                             placeholder="Your email"
//                         />
//                     </div>
//                 </div>
//                 <div className="pt-3 col-md-5 mx-auto">
//                     <div className="form-group text-left">
//                         {" "}
//                         <b>Describe your concerns</b> <br />
//                         <textarea
//                             required
//                             name="emailDetails"
//                             onChange={handleChange}
//                             className="form-control"
//                             placeholder="Describe your concerns"
//                             value={contact.emailDetails}
//                         ></textarea>
//                     </div>
//                 </div>
//                 <div className="pt-3 col-md-5 mx-auto text-left">
//                     <button className="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//             <div className="pt-5 font-weight-bold">tupaginaonline.net</div>
//         </div>
//     );
// };
