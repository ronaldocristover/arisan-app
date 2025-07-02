"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [participant, setParticipant] = useState<number | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [groupList, setGroupList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [userResult, paymentResult, groupResult] = await Promise.all([
        fetch("http://localhost:8888/api/users"),
        fetch("http://localhost:8888/api/payments"),
        fetch("http://localhost:8888/api/groups"),
      ]);
      const userData = await userResult.json();
      const paymentData = await paymentResult.json();
      const groupData = await groupResult.json();

      setParticipant(userData.length);
      setHistory(paymentData.data);
      setGroupList(groupData.data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
          <span>Total Peserta</span>
          <span className="text-right">{participant}</span>
          <span>Total Iuran</span>
          <span className="text-right">Rp250.000</span>
          <span>Total Periode</span>
          <span className="text-right">12</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-xl shadow flex flex-col items-start justify-between">
          <p className="text-gray-600 text-sm">Iuran Belum Dibayar</p>
          <p className="text-gray-700 text-2xl font-bold">3</p>
          <Link
            href="/payment/new"
            className="text-sm text-blue-600 font-medium mt-1"
          >
            Lihat Detail
          </Link>
        </div>
        <div className="bg-blue-100 p-4 rounded-xl shadow">
          <p className="text-sm text-gray-600">Periode Sekarang</p>
          <p className="text-gray-700 text-lg font-semibold">Periode 5</p>
          <p className="text-sm text-gray-500">di 24 April 2024</p>
        </div>
      </div>

      <Link
        href="/payment/new"
        className="block w-full bg-blue-600 text-white font-semibold py-3 rounded-xl text-center hover:bg-blue-700 transition"
      >
        + Input Pembayaran Manual
      </Link>

      <div className="bg-white rounded-xl shadow divide-y">
        <div className="text-gray-700 p-4 font-semibold">
          History Pembayaran
        </div>
        {history.map((item, idx) => (
          <div key={idx} className="p-4 flex justify-between">
            <span className="text-gray-600">{item.user?.name}</span>
            <span className="text-sm text-green-600 font-medium">
              Rp {item.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        <div className="text-gray-700 p-4 font-semibold">Daftar Arisan</div>
        {groupList.map((item, idx) => (
          <Link
            key={idx}
            href={`/group/${item.id}`}
            className="block p-4 flex justify-between hover:bg-gray-100 transition rounded-xl"
          >
            <span className="text-gray-600">{item.name}</span>
            <span className="text-sm text-green-600 font-medium">
              {item.date}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
