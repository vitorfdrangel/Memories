import { useState } from "react";

import axios from "../axios-config";

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";

// Styles
import "./AddMemory.css";

const AddMemory = () => {
  const [inputs, setInputs] = useState({});
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handdleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", inputs.title);
    formData.append("description", inputs.description);
    formData.append("image", image);

    try {
      const response = await axios.post("/memories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.msg);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setImage(e.target.files[0]);
    } else {
      setInputs({ ...inputs, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="add-memory-page">
      <h2>Crie uma nova memória</h2>
      <form onSubmit={handdleSubmit}>
        <label>
          <p>Título</p>
          <input
            type="text"
            placeholder="Defina um título"
            name="title"
            onChange={handleChange}
          />
        </label>
        <label>
          <p>Descrição</p>
          <textarea
            placeholder="Conte-nos o que aconteceu..."
            name="description"
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          <p>Foto:</p>
          <input type="file" name="image" onChange={handleChange} />
        </label>
        <input type="submit" className="btn" value="Enviar" />
      </form>
    </div>
  );
};

export default AddMemory;
