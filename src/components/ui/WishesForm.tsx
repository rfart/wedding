"use client";

import { useState, useEffect } from "react";
import type { Wish } from "@/lib/googleSheets";

export default function WishesForm() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      const data = await res.json();
      setWishes(data.wishes ?? []);
    } catch {
      // silent fail
    }
  };

  useEffect(() => {
    fetchWishes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !message.trim()) {
      setError("Nama dan pesan wajib diisi.");
      return;
    }
    setSubmitting(true);
    const optimistic: Wish = {
      timestamp: new Date().toISOString(),
      name: name.trim(),
      message: message.trim(),
    };
    setWishes((prev) => [optimistic, ...prev]);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error();
      setName("");
      setMessage("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      await fetchWishes();
    } catch {
      setError("Gagal mengirim pesan. Silakan coba lagi.");
      setWishes((prev) => prev.filter((w) => w !== optimistic));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Nama
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda"
            className="w-full px-4 py-2.5 border border-beige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white"
            maxLength={80}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700 mb-1">
            Pesan & Doa
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis ucapan dan doa untuk pasangan..."
            rows={3}
            className="w-full px-4 py-2.5 border border-beige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gold/40 bg-white resize-none"
            maxLength={500}
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {submitted && (
          <p className="text-green-600 text-sm">
            Terima kasih atas ucapan Anda!
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gold text-white font-medium rounded-lg hover:bg-gold/90 disabled:opacity-60 transition-colors"
        >
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      {wishes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-stone-500 uppercase tracking-widest">
            Ucapan Tamu
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w, i) => (
              <div
                key={i}
                className="bg-cream border border-beige/60 rounded-lg px-4 py-3"
              >
                <p className="font-medium text-stone-800 text-sm">{w.name}</p>
                <p className="text-stone-600 text-sm mt-0.5">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
