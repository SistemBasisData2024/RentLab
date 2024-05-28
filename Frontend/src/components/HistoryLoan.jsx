import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const HistoryLoan = () => {
  const { npm } = useParams();
  const [historyLoan, setHistoryLoan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistoryLoan = async () => {
      try {
        const response = await fetch(`http://localhost:8463/pinjam/getPinjamUser/${npm}`);
        const data = await response.json();
        setHistoryLoan(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };

    fetchHistoryLoan();
  }, [npm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-5">
      <h1 className="text-3xl font-semibold mb-8 text-center">History Loan</h1>
      <div className="overflow-x-auto">
        <table className="w-full whitespace-nowrap rounded-lg bg-white overflow-hidden shadow-md">
          <thead className="bg-blue-200 text-gray-800">
            <tr className="text-left">
              <th className="px-4 py-3">Peminjam</th>
              <th className="px-4 py-3">Barang</th>
              <th className="px-4 py-3">Jumlah</th>
              <th className="px-4 py-3">Kebutuhan</th>
              <th className="px-4 py-3">Periode</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {historyLoan.map((loan) => (
              <tr key={loan.id} className="text-gray-700">
                <td className="px-4 py-3">{loan.user_nama}</td>
                <td className="px-4 py-3">{loan.barang_nama}</td>
                <td className="px-4 py-3">{loan.jumlah_barang}</td>
                <td className="px-4 py-3">{loan.alasan_kebutuhan}</td>
                <td className="px-4 py-3">{loan.jangka_waktu} hari</td>
                <td className={`px-4 py-3 ${loan.konfirmasi === "pending" ? "text-yellow-500" : loan.konfirmasi === "accept" ? "text-green-500" : "text-red-500"}`}>{loan.konfirmasi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryLoan;
