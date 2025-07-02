'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

const data = [
  {
    periode: 'Periode 1',
    tanggal: '1 Juli 2025',
    peserta: [
      { nama: 'Ani', status: 'Sudah Bayar', pemenang: true },
      { nama: 'Budi', status: 'Belum Bayar', pemenang: false },
    ],
  },
  {
    periode: 'Periode 2',
    tanggal: '1 Agustus 2025',
    peserta: [
      { nama: 'Cici', status: 'Sudah Bayar', pemenang: true },
      { nama: 'Deni', status: 'Sudah Bayar', pemenang: false },
    ],
  },
  {
    periode: 'Periode 3',
    tanggal: '1 September 2025',
    peserta: [
      { nama: 'Eka', status: 'Belum Bayar', pemenang: false },
      { nama: 'Fajar', status: 'Sudah Bayar', pemenang: true },
    ],
  },
];

export default function DetailGroupPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <main className="bg-gray-50 p-6 font-sans min-h-screen">
      <div className="max-w-md mx-auto space-y-4">
        
        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-bold">Dashboard</h1>
            <button
            className="text-gray-600 flex items-center"
            onClick={() => window.history.back()}
            aria-label="Kembali"
            >
            <svg
              className="h-5 w-5 mr-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span className="sr-only">Kembali</span>
            </button>
        </div>

        {/* Informasi Arisan */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-6">
          <h2 className="text-gray-700 text-xl font-bold mb-4">Informasi Arisan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div>
              <p><span className="font-semibold">Nama Arisan:</span> Arisan RT 07</p>
              <p><span className="font-semibold">Total Peserta:</span> 10 Orang</p>
              <p><span className="font-semibold">Nominal Iuran:</span> Rp 200.000</p>
            </div>
            <div>
              <p><span className="font-semibold">Total Periode:</span> 12 Bulan</p>
              <p><span className="font-semibold">Tanggal Mulai:</span> 1 Juli 2025</p>
              <p>
                <span className="font-semibold">Status:</span>{' '}
                <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Aktif</span>
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <ul className="flex space-x-4 overflow-x-auto text-sm font-medium">
            {data.map((periode, index) => (
              <li key={index}>
                <button
                  onClick={() => setActiveTab(index)}
                  className={`tab-btn py-2 px-4 border-b-2 ${
                    activeTab === index
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {periode.periode}
                  <br />
                  <span className="text-xs text-gray-400">{periode.tanggal}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Tab Content */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="text-gray-700 text-lg font-semibold mb-4">
            {data[activeTab].periode} - {data[activeTab].tanggal}
          </h2>
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-gray-600 p-2 text-left">Nama Peserta</th>
                <th className="text-gray-600 p-2 text-left">Status Pembayaran</th>
                <th className="text-gray-600 p-2 text-left">Pemenang?</th>
              </tr>
            </thead>
            <tbody>
              {data[activeTab].peserta.map((peserta, idx) => (
                <tr key={idx} className="border-t">
                  <td className="text-gray-500 p-2">{peserta.nama}</td>
                  <td
                    className={`p-2 font-medium ${
                      peserta.status === 'Sudah Bayar' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {peserta.status}
                  </td>
                  <td className="p-2">{peserta.pemenang ? '✅' : '❌'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
