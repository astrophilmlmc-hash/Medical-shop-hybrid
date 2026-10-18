import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Store, FileText, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, selectedStore } = useApp();

  const cartItem = cart.find(c => Number(c.productId) === Number(product.id));
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const storeInv =
    product.inventory?.find(i => Number(i.store_id) === Number(selectedStore.id)) ||
    product.inventory?.[0] || { quantity: 25 };

  const discountPct = Math.round(((product.mrp - product.selling_price) / product.mrp) * 100);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Top Image & Badges */}
      <Link to={`/products/${product.id}`} className="relative block bg-slate-50 p-3">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-40 object-contain rounded-xl group-hover:scale-[1.02] transition-transform duration-200"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1 pointer-events-none">
          {discountPct > 0 && (
            <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
              {discountPct}% OFF
            </span>
          )}
          {product.prescription_required ? (
            <span className="bg-red-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm ml-auto">
              <FileText className="w-3 h-3" />
              Rx • {product.schedule_type}
            </span>
          ) : (
            <span className="bg-blue-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full ml-auto shadow-sm">
              OTC
            </span>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-semibold mb-1">
            <span className="text-blue-600 uppercase tracking-wide">{product.category_name}</span>
            <span className="truncate max-w-[130px]">{product.manufacturer}</span>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="font-bold text-gray-900 hover:text-blue-600 text-base leading-snug line-clamp-1 block transition"
          >
            {product.name}
          </Link>

          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 font-medium" title={product.generic_name}>
            Salt: {product.generic_name}
          </p>

          <p className="text-[11px] text-gray-400 mt-0.5">{product.pack_size}</p>

          {/* Hybrid Store Stock Indicator */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-lg border border-emerald-100">
            <Store className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">
              {storeInv.quantity > 0 ? (
                <>
                  <strong>{storeInv.quantity} in stock</strong> • {selectedStore.pickup_ready_mins}m Pickup
                </>
              ) : (
                'Available at nearby hub'
              )}
            </span>
          </div>
        </div>

        {/* Price & CTA */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold text-gray-900">₹{product.selling_price}</span>
              <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block">
              Inclusive of all taxes
            </span>
          </div>

          {quantityInCart > 0 ? (
            <div className="flex items-center bg-blue-600 text-white rounded-xl overflow-hidden shadow-sm">
              <button
                type="button"
                onClick={() => updateCartQuantity(product.id, quantityInCart - 1)}
                className="px-2.5 py-2 hover:bg-blue-700 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 text-xs font-extrabold">{quantityInCart}</span>
              <button
                type="button"
                onClick={() => updateCartQuantity(product.id, quantityInCart + 1)}
                className="px-2.5 py-2 hover:bg-blue-700 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => addToCart(product.id, 1)}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-sm transition"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
