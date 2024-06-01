import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoanList = () => {
  const { labId } = useParams();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`http://localhost:8463/pinjam/getPinjamAslab/${labId}`);
        const data = await response.json();
        setLoans(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchLoans();
  }, [labId]);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:8463/pinjam/updateKonfirmasi/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      const updatedLoan = await response.json();
      setLoans(loans.map((loan) => (loan.id === id ? updatedLoan : loan)));
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleAccept = (id) => {
    updateStatus(id, "rent");
  };

  const handleCancel = (id) => {
    updateStatus(id, "cancel");
  };

  const handleComplete = (id) => {
    updateStatus(id, "success");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">List Pinjam</h1>
      <div className="overflow-x-auto mb-10">
        <table className="w-full whitespace-nowrap rounded-lg bg-white overflow-hidden shadow-md">
          <thead className="bg-blue-200 text-gray-800">
            <tr className="text-left">
              <th className="px-4 py-3">Peminjam</th>
              <th className="px-4 py-3">Barang</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Kebutuhan</th>
              <th className="px-4 py-3">Periode</th>
              <th className="px-4 py-3">Jatuh Tempo</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loans.map((loan) => (
              <tr key={loan.id} className="text-gray-700">
                <td className="px-4 py-3">{loan.user_nama}</td>
                <td className="px-4 py-3">{loan.barang_nama}</td>
                <td className="px-4 py-3">{loan.jumlah_barang}</td>
                <td className="px-4 py-3">{loan.alasan_kebutuhan}</td>
                <td className="px-4 py-3">{loan.jangka_waktu} hari</td>
                <td className="px-4 py-3">{loan.konfirmasi === "rent" || loan.konfirmasi === "success" ? new Date(loan.jatuh_tempo).toLocaleDateString("id-ID") : "-"}</td>
                <td className={`px-4 py-3 ${loan.konfirmasi === "pending" ? "text-yellow-500" : loan.konfirmasi === "success" ? "text-green-500" : loan.konfirmasi === "rent" ? "text-orange-500" : "text-red-500"}`}>{loan.konfirmasi}</td>
                <td className="py-3">
                  {loan.konfirmasi === "pending" && (
                    <>
                      <button onClick={() => handleAccept(loan.id)} className="bg-green-500 text-white font-bold py-2 px-4 rounded-full mr-2 hover:bg-green-700 transition duration-300">
                        ✓
                      </button>
                      <button onClick={() => handleCancel(loan.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded-full hover:bg-red-700 transition duration-300">
                        X
                      </button>
                    </>
                  )}
                  {loan.konfirmasi === "rent" && (
                    <button onClick={() => handleComplete(loan.id)} className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300">
                      Selesai
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanList;
