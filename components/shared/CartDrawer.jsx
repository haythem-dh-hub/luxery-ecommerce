"use client";

import Image from "next/image";
import Link from "next/link";
import AddRounded from "@mui/icons-material/AddRounded";
import CloseRounded from "@mui/icons-material/CloseRounded";
import RemoveRounded from "@mui/icons-material/RemoveRounded";
import { useStore } from "@/components/shared/StoreProvider";

export default function CartDrawer() {
  const { cart, cartOpen, cartSubtotal, setCartOpen, updateQuantity } = useStore();

  return (
    <>
      <div
        aria-hidden="true"
        className={cartOpen ? "cart-overlay is-open" : "cart-overlay"}
        onClick={() => setCartOpen(false)}
      />
      <aside className={cartOpen ? "cart-drawer is-open" : "cart-drawer"}>
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-bronze/80">
              Cart Summary
            </p>
            <h2 className="mt-2 font-display text-3xl">Your bag</h2>
          </div>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="navbar-icon-button grid h-11 w-11 place-items-center rounded-2xl"
            aria-label="Close cart"
          >
            <CloseRounded />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto py-5">
          {cart.length === 0 ? (
            <div className="space-tablet rounded-[1.5rem] p-5">
              <h3 className="font-display text-2xl">Your cart is empty.</h3>
              <p className="mt-3 text-sm leading-7 text-white/64">
                Add fragrances, oils, or accessories to preview the storefront
                flow.
              </p>
            </div>
          ) : (
            cart.map((item) => (
              <article
                key={item.id}
                className="space-tablet flex gap-4 rounded-[1.5rem] p-4"
              >
                <div className="relative h-20 w-20 overflow-hidden rounded-[1rem] border border-white/10">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="font-display text-xl transition hover:text-bronze"
                    onClick={() => setCartOpen(false)}
                  >
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-white/58">${item.price}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className="navbar-icon-button grid h-9 w-9 place-items-center rounded-xl"
                        onClick={() => updateQuantity(item.id, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <RemoveRounded fontSize="small" />
                      </button>
                      <span className="min-w-6 text-center text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        className="navbar-icon-button grid h-9 w-9 place-items-center rounded-xl"
                        onClick={() => updateQuantity(item.id, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <AddRounded fontSize="small" />
                      </button>
                    </div>
                    <span className="font-display text-xl">
                      ${item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="border-t border-white/10 pt-5">
          <div className="mb-4 flex items-center justify-between text-white/72">
            <span>Subtotal</span>
            <strong className="font-display text-3xl text-bronze">
              ${cartSubtotal}
            </strong>
          </div>
          <div className="flex flex-col gap-3">
            <button
              type="button"
              className="rounded-full bg-white px-6 py-4 text-sm font-semibold text-ink transition hover:-translate-y-0.5"
            >
              Proceed to checkout
            </button>
            <Link
              href="/shop"
              className="tablet-label justify-center rounded-full px-6 py-4 text-sm font-semibold text-white/88"
              onClick={() => setCartOpen(false)}
            >
              Keep shopping
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
