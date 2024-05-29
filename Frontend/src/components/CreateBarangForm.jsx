import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateBarangForm = () => {
  const [formData, setFormData] = useState({
    nama: "",
    lab_id: "",
    jumlah_total: "",
    image_url: "",
  });

  const [labs, setLabs] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get("http://localhost:8463/lab/getAll");
        setLabs(response.data);
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    fetchLabs();
  }, []);

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
            lab_id: "",
            jumlah_total: "",
            image_url: "",
          });
          setImageFile(null);
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Tambah Barang</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Nama</label>
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Lab</label>
          <select name="lab_id" value={formData.lab_id} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required>
            <option value="" disabled>
              Pilih Lab
            </option>
            {labs.map((lab) => (
              <option key={lab.id} value={lab.id}>
                {lab.nama} - {lab.lokasi}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Jumlah Ketersediaan</label>
          <input type="number" name="jumlah_total" value={formData.jumlah_total} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Upload Image</label>
          <input type="file" name="image" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded" required />
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
          Tambah Barang
        </button>
      </form>
    </div>
  );
};

export default CreateBarangForm;
