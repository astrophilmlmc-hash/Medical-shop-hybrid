import React from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <header className="bg-blue-600 text-white py-16 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Your Health, Delivered.</h1>
                <p className="text-lg opacity-90 mb-8">Order medicines online or pick them up from the nearest store in 30 minutes.</p>
                <div className="flex justify-center gap-4">
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">Shop Now</button>
                    <button className="bg-green-500 text-white px-8 py-3 rounded-full font-bold hover:bg-green-600 transition">Upload
