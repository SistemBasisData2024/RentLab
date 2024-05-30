import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const EditBarangForm = () => {
  const { id } = useParams();
  const location = useLocation();
  const { lab_id } = location.state || {}; // Get lab_id from navigation state

  const [formData, setFormData] = useState({
    nama: "",
    lab_id: lab_id || "", // Set lab_id from state or default to empty string
    jumlah_ketersediaan: "",
    image_url: "",
    jumlah_rent: "",
    jumlah_total: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await axios.get(`http://localhost:8463/barang/getBarang/${id}`);
        const barang = response.data;
        setFormData({
          nama: barang.nama,
          lab_id: lab_id || barang.lab_id, // Use lab_id from state if available
          jumlah_ketersediaan: barang.jumlah_ketersediaan,
          image_url: barang.image_url,
          jumlah_rent: barang.jumlah_rent,
          jumlah_total: barang.jumlah_total,
        });
      } catch (error) {
        console.error("Error fetching barang:", error);
      }
    };

    fetchBarang();
  }, [id, lab_id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUrl = formData.image_url;

      if (imageFile) {
        // Upload image to Cloudinary
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadResponse = await axios.post("http://localhost:8463/cloudinary/upload", imageData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (uploadResponse.status === 200) {
          imageUrl = uploadResponse.data;
        } else {
          alert("Gagal mengupload gambar");
          return;
        }
      }

      // Update barang data
      const updatedFormData = { ...formData, image_url: imageUrl };
      const response = await axios.put(`http://localhost:8463/barang/editBarang/${id}`, updatedFormData);
      if (response.status === 201) {
        alert("Sukses mengedit barang");
      } else {
        alert("Gagal mengedit barang");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Internal Server Error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Edit Barang</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Ketersediaan</label>
          <input type="number" name="jumlah_ketersediaan" value={formData.jumlah_ketersediaan} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Disewa</label>
          <input type="number" name="jumlah_rent" value={formData.jumlah_rent} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Total</label>
          <input type="number" name="jumlah_total" value={formData.jumlah_total} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Image</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Edit Barang
        </button>
      </form>
    </div>
  );
};

export default EditBarangForm;
