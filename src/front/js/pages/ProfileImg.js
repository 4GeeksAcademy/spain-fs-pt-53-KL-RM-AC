import React, { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk"; // Ajusta la importación según sea necesario


function ProfileImageUploader({ accountId }) {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    // Lee el archivo como un objeto de tipo URL para mostrar la vista previa de la imagen
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleUpload = () => {
    if (image) {
      const transformedUrl = UrlBuilder.url({
        accountId: accountId,
        filePath: image.name,
        options: {
          transformation: "image",
          transformationParams: {
            "w": 800,
            "h": 600
          }
        }
      });
      // Aquí puedes realizar la lógica de carga de la imagen utilizando la URL transformada
      console.log("URL transformada:", transformedUrl);
    } else {
      console.log("No se ha seleccionado ninguna imagen.");
    }
  };
  return (
    <div className="text-center justify-content-center">
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {/* Muestra la vista previa de la imagen seleccionada */}
      {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: "100px", maxHeight: "100px" }} />}
      <br/>
      <button type="button" className="btn btn-dark me-2" onClick={handleUpload}>Subir imagen</button>
    </div>
  );
}
export default ProfileImageUploader;