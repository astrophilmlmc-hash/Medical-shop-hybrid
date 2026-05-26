<code class="language-jsx">import React from 'react';
import { Search, ShoppingCart, User, MapPin } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-600">MediShop</span>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">Hybrid</span>
            </div>
            <div className="flex-1 max-w-md mx-4 relative">
                <input type="text" placeholder="Search medicine..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            <div className="flex items-center gap-6 text-gray-600">
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600"><MapPin className="w-5 h-5" /><span className="text-sm font-medium">Stores</span></div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 relative">
                    <ShoppingCart className="w-5 h-5" /><span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
                </div>
                <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600"><User className="w-5 h-5" /><span className="text-sm font-medium">Login</span></div>
            </div>
        </nav>
    );
};
export default Navbar;
</code>
