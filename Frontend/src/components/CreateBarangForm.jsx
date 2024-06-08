import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CreateBarangForm = () => {
  // navigate state
  const navigate = useNavigate()

  //location state
  const location = useLocation();
  const lab_id = location.state.lab_id
  const currentAslabNPM = location.state.npm

  const [formData, setFormData] = useState({
    nama: "",
    lab_id: lab_id || "", // Set lab_id from state or default to empty string
    jumlah_total: "",
    image_url: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      // Upload image to Cloudinary
      const imageData = new FormData();
      imageData.append("image", imageFile);

      const uploadResponse = await axios.post("http://localhost:8463/cloudinary/upload", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (uploadResponse.status === 200) {
        const imageUrl = uploadResponse.data;

        // Add image URL to formData
        const updatedFormData = { ...formData, image_url: imageUrl };

        // Send form data to add barang
        const response = await axios.post("http://localhost:8463/barang/addBarang", updatedFormData);
        if (response.status === 201) {
          alert("Sukses menambah barang");
          setFormData({
            nama: "",
            lab_id: lab_id || "",
            jumlah_total: "",
            image_url: "",
          });
          setImageFile(null);
          navigate("/aslab/dashboard", {
            state: {
              npm: currentAslabNPM
            }
          })
        } else {
          alert("Gagal menambah barang");
        }
      } else {
        alert("Gagal mengupload gambar");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#90AEAD" }}>
      <form className="flex flex-col bg-[#FBE9D0] p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center" style={{ color: "#244855" }}>Tambah Barang</h2>
        <div className="mb-4">
          <label className="block mb-2" style={{ color: "#874F41" }}>Nama</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" style={{ color: "#874F41" }}>Jumlah Ketersediaan</label>
          <input type="number" name="jumlah_total" value={formData.jumlah_total} onChange={handleChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
        </div>
        <div className="mb-4">
          <label className="block mb-2" style={{ color: "#874F41" }}>Upload Image</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border-2 rounded" style={{ borderColor: "#E64833", color: "#244855" }} required />
        </div>
        <button type="submit" className="w-full py-2 rounded hover:bg-blue-600" style={{ backgroundColor: "#244855", color: "#FBE9D0" }}>
          Tambah Barang
        </button>

        <div className="w-fit mx-auto mt-5" onClick={() => navigate("/aslab/dashboard", { state: { npm: currentAslabNPM } })}>
          <a className="text-slate-500 hover:text-red-500 cursor-pointer duration-150">Cancel adding new Item</a>
        </div>
      </form>
    </div>
  );
};

export default CreateBarangForm;
