"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type GroupEvent = {
  id: number;
  period_number: number;
  period_description: string;
  participants: Participant[];
};

type Participant = {
  id: number;
  name: string;
  status: string;
};

const UnpaidParticipantsPage = () => {
  const [groupEvents, setGroupEvents] = useState<GroupEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment-status");

  useEffect(() => {
    // Replace with your actual API endpoint
    fetch("http://localhost:3002/group_events")
      .then((res) => res.json())
      .then((data) => {
        setGroupEvents(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="max-w-xl mx-auto p-4">
        <h1 className="text-gray-700 text-xl font-bold mb-4">
          Daftar Pembayaran Peserta Arisan{" "}
          {paymentStatus === "unpaid" ? "(Belum Bayar)" : "(Sudah Bayar)"}
        </h1>

        <select defaultValue="Pilih Periode" className="select">
          <option disabled={true}>Pilih Periode</option>
          {groupEvents.map((event) => (
            <option key={event.id} value={event.id}>
              {event.period_description}
            </option>
          ))}
        </select>

        <ul className="text-gray-700 list bg-base-100 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
            Most played songs this week
          </li>

          <li className="list-row">
            <div>
              <img
                className="size-10 rounded-box"
                src="https://img.daisyui.com/images/profile/demo/1@94.webp"
              />
            </div>
            <div>
              <div>Dio Lupa</div>
              <div className="text-xs uppercase font-semibold opacity-60">
                Remaining Reason
              </div>
            </div>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M6 3L20 12 6 21 6 3z"></path>
                </g>
              </svg>
            </button>
            <button className="btn btn-square btn-ghost">
              <svg
                className="size-[1.2em]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                </g>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default UnpaidParticipantsPage;
