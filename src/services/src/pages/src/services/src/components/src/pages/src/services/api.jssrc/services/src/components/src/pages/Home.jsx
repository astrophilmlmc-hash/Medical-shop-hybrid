<code class="language-jsx">import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {</code>
  <code class="language-jsx">return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <header className="bg-blue-600 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Health, Delivered.</h1>
                <p className="text-lg opacity-90 mb-8">Order medicines online or pick them up from the nearest store in 30 minutes.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">Shop Now</button>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">Upload Prescription</button>
                </div>
            </header>
            <section className="py-12 px-6 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Pain Relief', 'Diabetes', 'Heart Care', 'Wellness'].map(cat => (
                        <div key={cat} className="p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center cursor-pointer hover:border-blue-500 transition">
                            <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center text-blue-600 font-bold">{cat[0]}</div>
                            <span className="font-medium text-gray-700">{cat}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
export default Home;
</code>
