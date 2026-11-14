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
    } catch { /* silent fail */ }
  };

  useEffect(() => { fetchWishes(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim() || !message.trim()) { setError("Nama dan pesan wajib diisi."); return; }
    setSubmitting(true);
    const optimistic: Wish = { timestamp: new Date().toISOString(), name: name.trim(), attendance: "", message: message.trim() };
    setWishes((prev) => [optimistic, ...prev]);
    try {
      const res = await fetch("/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), message: message.trim() }),
      });
      if (!res.ok) throw new Error();
      setName(""); setMessage(""); setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      await fetchWishes();
    } catch {
      setError("Gagal mengirim pesan. Silakan coba lagi.");
      setWishes((prev) => prev.filter((w) => w !== optimistic));
    } finally { setSubmitting(false); }
  };

  const inputClass = "w-full px-4 py-2.5 border border-border rounded-lg text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent/40 bg-surface";

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-fg-soft mb-1">Nama</label>
          <input
            type="text" value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama Anda" className={inputClass} maxLength={80}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-fg-soft mb-1">Pesan & Doa</label>
          <textarea
            value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Tulis ucapan dan doa untuk pasangan..."
            rows={3} className={`${inputClass} resize-none`} maxLength={500}
          />
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {submitted && <p className="text-fg-soft text-sm">Terima kasih atas ucapan Anda!</p>}
        <button
          type="submit" disabled={submitting}
          className="w-full py-3 bg-accent text-bg font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {submitting ? "Mengirim..." : "Kirim Ucapan"}
        </button>
      </form>

      {wishes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-fg-muted uppercase tracking-widest">
            Ucapan Tamu
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w, i) => (
              <div key={i} className="bg-bg-alt border border-border/40 rounded-lg px-4 py-3">
                <p className="font-medium text-fg text-sm">{w.name}</p>
                <p className="text-fg-soft text-sm mt-0.5">{w.message}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
