"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Wish } from "@/lib/googleSheets";

type Attendance = "Hadir" | "Tidak Hadir";

function formatTimestamp(iso: string): string {
  if (!iso) return "";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
    hour12: false, timeZone: "Asia/Jakarta",
  }).format(new Date(iso));
}

export default function RsvpForm({ tamu }: { tamu: string }) {
  const [name, setName] = useState(tamu);
  const [isAnon, setIsAnon] = useState(false);
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);

  const fetchWishes = async () => {
    try {
      const res = await fetch(`/invitations/api/wishes?t=${Date.now()}`, {
        cache: "no-store",
      });
      const data = await res.json();
      setWishes(data.wishes ?? []);
    } catch { /* silent fail */ }
  };

  useEffect(() => { fetchWishes(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) { setError("Nama wajib diisi."); return; }
    if (!attendance) { setError("Konfirmasi kehadiran wajib dipilih."); return; }

    setSubmitting(true);
    try {
      const displayName = isAnon ? "Anonim" : name.trim();

      await fetch("/invitations/api/wishes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: displayName, attendance, message: message.trim() }),
      });

      setSubmitted(true);
      await fetchWishes();
    } catch {
      setError("Gagal mengirim. Silakan coba lagi.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 border border-border rounded-lg text-sm text-fg placeholder:text-fg-muted focus:outline-none focus:ring-2 focus:ring-accent/40 bg-surface";

  return (
    <div className="space-y-8">
      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="thanks"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center space-y-2 py-6"
          >
            <p className="font-serif text-lg text-fg">Terima kasih, {name}!</p>
            <p className="text-fg-soft text-sm">
              {attendance === "Hadir"
                ? "Kami menantikan kehadiran Anda."
                : "Kami menghargai kabar dari Anda."}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg-soft mb-1">Nama Tamu</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda" className={`${inputClass} ${isAnon ? "opacity-50 cursor-not-allowed" : ""}`}
              maxLength={80} disabled={isAnon}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-fg-soft mb-2">Kehadiran</label>
            <div className="space-y-2">
              {(["Hadir", "Tidak Hadir"] as const).map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio" name="kehadiran" value={option}
                    checked={attendance === option}
                    onChange={() => setAttendance(option)}
                    className="sr-only"
                  />
                  <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    attendance === option ? "border-accent" : "border-border"
                  }`}>
                    {attendance === option && (
                      <span className="w-2 h-2 rounded-full bg-accent" />
                    )}
                  </span>
                  <span className={`text-sm transition-colors duration-200 ${
                    attendance === option ? "text-fg" : "text-fg-soft"
                  }`}>
                    {option}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-fg-soft mb-1">
              Pesan & Doa <span className="text-fg-muted font-normal">(opsional)</span>
            </label>
            <textarea
              value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Tulis ucapan dan doa untuk pasangan..."
              rows={3} className={`${inputClass} resize-none`} maxLength={500}
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={isAnon} onChange={(e) => setIsAnon(e.target.checked)} className="sr-only" />
            <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isAnon ? "bg-accent border-accent" : "border-border"}`}>
              {isAnon && <span className="w-2 h-2 bg-bg rounded-sm" />}
            </span>
            <span className="text-sm text-fg-soft">Kirim sebagai Anonim</span>
          </label>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit" disabled={submitting}
            className="w-full py-3 bg-accent text-bg font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? "Mengirim..." : "Kirim"}
          </button>
          </motion.form>
        )}
      </AnimatePresence>

      {wishes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-fg-muted uppercase tracking-widest">
            Ucapan Tamu
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            <AnimatePresence initial={false}>
            {wishes.map((w) => (
              <motion.div
                key={w.timestamp}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-bg border border-border/40 rounded-lg px-4 py-3"
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-fg text-sm">{w.name}</p>
                  {w.attendance && w.name !== "Anonim" && (
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      w.attendance === "Hadir"
                        ? "bg-accent/15 text-accent"
                        : "bg-fg-muted/15 text-fg-muted"
                    }`}>
                      {w.attendance}
                    </span>
                  )}
                </div>
                <p className="text-fg-muted text-xs mt-0.5">{formatTimestamp(w.timestamp)}</p>
                {w.message && (
                  <p className="text-fg-soft text-sm mt-1">{w.message}</p>
                )}
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}
