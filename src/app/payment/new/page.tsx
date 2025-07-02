"use client";

import React, { useRef, useEffect, useState } from "react";

type Arisan = { id: string; name: string };
type Peserta = { id: string; name: string };

export default function NewPayment() {
  const formRef = useRef<HTMLFormElement>(null);
  const [arisanList, setArisanList] = useState<Arisan[]>([]);
  const [pesertaList, setPesertaList] = useState<Peserta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [arisanRes, pesertaRes] = await Promise.all([
          fetch("http://localhost:3002/groups"),
          fetch("http://localhost:3002/participants"),
        ]);
        const arisanData = await arisanRes.json();
        const pesertaData = await pesertaRes.json();
        setArisanList(arisanData);
        setPesertaList(pesertaData);
      } catch (e) {
        alert("Gagal memuat data arisan atau peserta.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const payload = {
      id: 5,
      group_id: form.arisan.value,
      participant_id: Array.from(form.users.selectedOptions).map(
        (option) => option.value
      ),
      amount: parseInt(form.amount.value, 10),
    };
    try {
      const response = await fetch("http://localhost:3002/payments", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Gagal mengupload pembayaran");
      }
      alert("Pembayaran berhasil disimpan!");
      form.reset();
    } catch (error) {
      alert("Terjadi kesalahan saat mengupload pembayaran.");
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-base-100 rounded-xl shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6 text-base-content">
        Input Pembayaran Manual
      </h1>
      <form className="space-y-6" onSubmit={handleSubmit} ref={formRef}>
        <div>
          <label
            htmlFor="arisan"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Pilih Arisan
          </label>
          <select
            id="arisan"
            name="arisan"
            className="select text-gray-700 select-bordered w-full"
            required
          >
            <option value="">Pilih Arisan</option>
            {arisanList.map((arisan) => (
              <option key={arisan.id} value={arisan.id}>
                {arisan.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="users"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Pilih Peserta
          </label>
          <select
            id="users"
            name="users"
            className="select text-gray-700 select-bordered w-full"
            size={5}
            required
            style={{ height: "150px" }}
          >
            {pesertaList.map((peserta) => (
              <option key={peserta.id} value={peserta.id}>
                {peserta.name}
              </option>
            ))}
          </select>
          <p className="text-xs text-base-content/50 mt-1">
            Tekan Ctrl (Cmd di Mac) untuk memilih lebih dari satu.
          </p>
        </div>

        {/* Jumlah Pembayaran */}
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Jumlah Dibayar (Rp)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            className="text-gray-700 input input-bordered w-full"
            placeholder="Contoh: 200000"
            required
          />
        </div>

        {/* Bukti Pembayaran */}
        <div>
          <label
            htmlFor="proof"
            className="block text-sm font-medium text-base-content mb-1"
          >
            Upload Bukti Pembayaran
          </label>
          <input
            type="file"
            id="proof"
            name="proof"
            accept="image/*,application/pdf"
            className="file-input file-input-bordered w-full"
          />
        </div>

        {/* Tombol Submit */}
        <div className="pt-4">
          <button type="submit" className="btn btn-success w-full">
            Simpan Pembayaran
          </button>
        </div>
      </form>
    </div>
  );
}
