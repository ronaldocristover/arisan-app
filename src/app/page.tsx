'use client';

import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function DashboardPage() {
  return (
    <main className="bg-gray-50 p-6 font-sans min-h-screen">
      <div className="max-w-md mx-auto space-y-4">

        <div className="flex justify-between items-center">
          <h1 className="text-black text-2xl font-bold">Dashboard</h1>
          <button className="text-gray-600">
            <PlusIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-700 font-medium">Arisan Aktif</p>
          <p className="text-gray-700 text-lg font-semibold">Arisan Bulanan</p>
          <div className="mt-2 text-sm text-gray-600 grid grid-cols-2 gap-y-1">
            <span>Total Peserta</span><span className="text-right">25</span>
            <span>Total Iuran</span><span className="text-right">Rp250.000</span>
            <span>Total Periode</span><span className="text-right">12</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-xl shadow flex flex-col items-start justify-between">
            <p className="text-gray-600 text-sm">Iuran Belum Dibayar</p>
            <p className="text-gray-700 text-2xl font-bold">3</p>
            <Link href="/belum-bayar-arisan" className="text-sm text-blue-600 font-medium mt-1">Lihat Detail</Link>
          </div>
          <div className="bg-blue-100 p-4 rounded-xl shadow">
            <p className="text-sm text-gray-600">Periode Sekarang</p>
            <p className="text-gray-700 text-lg font-semibold">Periode 5</p>
            <p className="text-sm text-gray-500">di 24 April 2024</p>
          </div>
        </div>

        <Link
          href="/input-pembayaran"
          className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-center hover:bg-blue-700 transition"
        >
          + Input Pembayaran Manual
        </Link>

        <div className="bg-white rounded-xl shadow divide-y">
          <div className="text-gray-700 p-4 font-semibold">History Pembayaran</div>
          <div className="p-4 flex justify-between">
            <span className='text-gray-600'>Joko</span>
            <span className="text-sm text-green-600 font-medium">Rp 300.000,-</span>
          </div>
          <div className="p-4 flex justify-between">
            <span className='text-gray-600'>Sulastri</span>
            <span className="text-sm text-green-600 font-medium">Rp 300.000,-</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow divide-y">
          <div className="text-gray-700 p-4 font-semibold">Daftar Arisan</div>
          <Link
            href="/group"
            className="block p-4 flex justify-between hover:bg-gray-100 transition rounded-xl"
          >
            <span className='text-gray-600'>Arisan Komplek</span>
            <span className="text-sm text-green-600 font-medium">Tgl 3 Juni 2025</span>
          </Link>
          <div className="p-4 flex justify-between">
            <span className='text-gray-600'>Arisan Marga</span>
            <span className="text-sm text-green-600 font-medium">Tgl 13 Juni 2025</span>
          </div>
        </div>
      </div>
    </main>
  );
}
