
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import {
  FiSearch,
  FiBell,
  FiUser,
  FiHome,
  FiShoppingCart,
  FiList,
  FiHeart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
} from 'react-icons/fi';
import axios from 'axios';
import './index.css'; // ensure tailwind directives present there

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Soft palette used in UI
const PALETTE = {
  bg: '#f7efe9', // page background
  card: '#fbf5f3',
  accent: '#c77a67', // soft brown
  accentDark: '#a65f4a',
  mutedText: '#7a6b67',
};

// Sample (mock) data -- replace with your API data
const SAMPLE_SALES = [
  { time: '09:00 AM', value: 30 },
  { time: '12:00 PM', value: 120 },
  { time: '04:00 PM', value: 230 },
  { time: '08:00 PM', value: 110 },
  { time: '12:00 PM', value: 135 },
];

const SAMPLE_TRENDING = [
  { id: 1, name: 'Cappuccino', price: '$85.00', qty: 240 },
  { id: 2, name: 'Latte', price: '$70.50', qty: 220 },
  { id: 3, name: 'Frappuccino', price: '$82.50', qty: 200 },
  { id: 4, name: 'Mocha', price: '$40.50', qty: 100 },
  { id: 5, name: 'Espresso', price: '$30.00', qty: 80 },
];

const SAMPLE_ORDERS = [
  { id: '254215', name: 'Cappuccino', date: '27 Oct 2023, 01:05 PM', table: '2B', price: '$200', payment: 'Cash' },
  { id: '124215', name: 'Americano', date: '28 Oct 2023, 10:25 PM', table: '8B', price: '$80', payment: 'Card' },
  { id: '334215', name: 'Mocha', date: '28 Oct 2023, 10:45 PM', table: '5A', price: '$40', payment: 'Card' },
];

export default function App() {
  // Replace the following states with fetched data from your backend API
  const [sales, setSales] = useState(SAMPLE_SALES);
  const [trending, setTrending] = useState(SAMPLE_TRENDING);
  const [orders, setOrders] = useState(SAMPLE_ORDERS);
  const [totalOrders, setTotalOrders] = useState(21375);
  const [newCustomers, setNewCustomers] = useState(1012);
  const [totalSales, setTotalSales] = useState(24254);

  // Chart dataset memoized
  const chartData = useMemo(() => {
    return {
      labels: sales.map((s) => s.time),
      datasets: [
        {
          label: 'Sales',
          data: sales.map((s) => s.value),
          borderColor: PALETTE.accent,
          backgroundColor: 'rgba(199,122,103,0.12)',
          fill: true,
          tension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 6,
        },
      ],
    };
  }, [sales]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: PALETTE.mutedText },
      },
      y: {
        grid: { color: 'rgba(200,200,200,0.12)' },
        ticks: { color: PALETTE.mutedText },
      },
    },
  };

  // Example: fetch from backend (uncomment & set API)
  /*
  useEffect(() => {
    axios.get('/api/dashboard')
      .then(res => {
        setSales(res.data.sales);
        setTrending(res.data.trending);
        setOrders(res.data.orders);
        setTotalOrders(res.data.totalOrders);
        setNewCustomers(res.data.newCustomers);
        setTotalSales(res.data.totalSales);
      })
      .catch(err => console.error(err));
  }, []);
  */

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_#fffaf7_0%,_#f3ece8_40%,_#eef6f2_100%)] p-6" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system' }}>
      <div className="max-w-[1300px] mx-auto bg-[rgba(255,255,255,0.9)] rounded-3xl shadow-xl p-6 grid grid-cols-[260px_1fr] gap-6">
        {/* SIDEBAR */}
        <aside className="flex flex-col gap-6 pr-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[linear-gradient(135deg,#f0dcd6,#fceeea)] flex items-center justify-center font-bold text-lg text-[#8b5a4a]">N</div>
            <div className="text-lg font-semibold text-[#6b4f47]">Nogops</div>
          </div>

          <nav className="flex-1 flex flex-col gap-2">
            {[
              { name: 'Home', icon: <FiHome /> },
              { name: 'Shoping', icon: <FiShoppingCart /> },
              { name: 'Order List', icon: <FiList /> },
              { name: 'Favorite', icon: <FiHeart /> },
              { name: 'Payment', icon: <FiCreditCard /> },
              { name: 'Settings', icon: <FiSettings /> },
            ].map((item) => (
              <button
                key={item.name}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#6b5851] hover:bg-[rgba(199,122,103,0.06)]"
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </button>
            ))}
          </nav>

          <div className="mt-auto">
            <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-[#6b5851] hover:bg-[rgba(199,122,103,0.06)]">
              <FiLogOut /> <span>Log Out</span>
            </button>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex flex-col gap-6">
          {/* Header */}
          <header className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-[#4f3f3a]">Welcome to Nogops</h1>
              <p className="text-sm text-[#8c7b76]">Choose The Category</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input type="search" placeholder="Search something" className="pl-10 pr-4 py-2 rounded-full w-80 shadow-sm border border-transparent focus:border-transparent focus:outline-none" />
                <FiSearch className="absolute left-3 top-2.5 text-[#9a8985]" />
              </div>

              <FiBell className="text-[#8a7671] text-xl" />

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[linear-gradient(135deg,#f0dcd6,#fceeea)] flex items-center justify-center"> 
                  <FiUser className="text-[#6b4f47]" />
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#8a756e]">Admin</div>
                  <div className="text-sm font-medium text-[#5a443d]">Sheilla Poetri</div>
                </div>
              </div>
            </div>
          </header>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.8)] shadow-inner">
              <div className="text-xs text-[#8a756e]">Total Order <span className="text-red-500 text-sm">-2.33%</span></div>
              <div className="text-3xl font-bold text-[#3f2f2a]">{totalOrders.toLocaleString()}</div>
              <div className="h-2 bg-[rgba(199,122,103,0.15)] rounded-full mt-3">
                <div className="h-full rounded-full" style={{ width: '60%', backgroundColor: PALETTE.accent }}></div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.8)] shadow-inner">
              <div className="text-xs text-[#8a756e]">New Customer <span className="text-green-500 text-sm">+32.40%</span></div>
              <div className="text-3xl font-bold text-[#3f2f2a]">{newCustomers.toLocaleString()}</div>
              <div className="h-2 bg-[rgba(199,122,103,0.15)] rounded-full mt-3">
                <div className="h-full rounded-full" style={{ width: '40%', backgroundColor: PALETTE.accent }}></div>
              </div>
            </div>

            <div className="rounded-xl p-4 bg-[rgba(255,255,255,0.8)] shadow-inner">
              <div className="text-xs text-[#8a756e]">Total Sales <span className="text-green-500 text-sm">+25%</span></div>
              <div className="text-3xl font-bold text-[#3f2f2a]">${totalSales.toLocaleString()}</div>
              <div className="h-2 bg-[rgba(199,122,103,0.15)] rounded-full mt-3">
                <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: PALETTE.accent }}></div>
              </div>
            </div>
          </div>

          {/* Content grid: chart + trending */}
          <div className="grid grid-cols-[2fr_1fr] gap-4">
            {/* Sales Analytics */}
            <div className="bg-[rgba(255,255,255,0.85)] p-4 rounded-xl shadow-inner">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#4b3b36]">Sales Analytics</h3>
                <a className="text-sm text-[#8a756e] hover:underline">See all</a>
              </div>

              <div style={{ height: 260 }}>
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            {/* Trending Coffee */}
            <div className="bg-[rgba(255,255,255,0.85)] p-4 rounded-xl shadow-inner flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#4b3b36]">Trending Coffee</h3>
                <a className="text-sm text-[#8a756e] hover:underline">See all</a>
              </div>

              <ul className="flex-1 divide-y">
                {trending.map((t, idx) => (
                  <li key={t.id} className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-[linear-gradient(135deg,#fff5f2,#f6e7e3)] flex items-center justify-center text-sm"> 
                        <span role="img" aria-label="coffee">☕</span>
                      </div>
                      <div>
                        <div className="font-medium text-[#433530]">{t.name}</div>
                        <div className="text-xs text-[#9a8883]">{t.price}</div>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-[#4f3f3a]">{t.qty}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Orders table */}
          <div className="bg-[rgba(255,255,255,0.85)] p-4 rounded-xl shadow-inner">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-[#4b3b36]">Recent Order</h3>
              <a className="text-sm text-[#8a756e] hover:underline">See all</a>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-sm text-[#8a756e] border-b">
                    <th className="py-2">#</th>
                    <th className="py-2">Items</th>
                    <th className="py-2">Date & Time</th>
                    <th className="py-2">Table Number</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Payment</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr key={o.id} className="text-sm text-[#5e4f4a] border-b last:border-b-0">
                      <td className="py-3">{i + 1}</td>
                      <td className="py-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-[linear-gradient(135deg,#fff5f2,#f6e7e3)] flex items-center justify-center">☕</div>
                        <div>
                          <div className="font-medium">{o.name}</div>
                          <div className="text-xs text-[#9a8883]">#{o.id}</div>
                        </div>
                      </td>
                      <td className="py-3">{o.date}</td>
                      <td className="py-3">{o.table}</td>
                      <td className="py-3 font-medium">{o.price}</td>
                      <td className="py-3">{o.payment}</td>
                      <td className="py-3"> <button className="px-2 py-1 rounded-md text-sm text-[#8a6f66]">•••</button> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
