"use client";

import { useState, useEffect } from "react";
import { config } from "@/config";
import type { Wish } from "@/lib/googleSheets";

const FORM_ACTION = config.rsvp.googleFormsUrl.replace(/\/viewform.*$/, "/formResponse");

type Attendance = "Hadir" | "Tidak Hadir";

export default function RsvpForm({ tamu }: { tamu: string }) {
  const [name, setName] = useState(tamu);
  const [attendance, setAttendance] = useState<Attendance | "">("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);

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
    if (!name.trim()) { setError("Nama wajib diisi."); return; }
    if (!attendance) { setError("Konfirmasi kehadiran wajib dipilih."); return; }

    setSubmitting(true);
    try {
      const formBody: Record<string, string> = {
        [config.rsvp.nameEntryId]: name.trim(),
        [config.rsvp.attendanceEntryId]: attendance,
      };
      if (message.trim()) formBody[config.rsvp.messageEntryId] = message.trim();

      await Promise.all([
        fetch(FORM_ACTION, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formBody).toString(),
        }),
        message.trim()
          ? fetch("/api/wishes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ name: name.trim(), message: message.trim() }),
            })
          : Promise.resolve(),
      ]);
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
      {submitted ? (
        <div className="text-center space-y-2 py-6">
          <p className="font-serif text-lg text-fg">Terima kasih, {name}!</p>
          <p className="text-fg-soft text-sm">
            {attendance === "Hadir"
              ? "Kami menantikan kehadiran Anda."
              : "Kami menghargai kabar dari Anda."}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-fg-soft mb-1">Nama Tamu</label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama Anda" className={inputClass} maxLength={80}
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

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit" disabled={submitting}
            className="w-full py-3 bg-accent text-bg font-medium rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {submitting ? "Mengirim..." : "Kirim"}
          </button>
        </form>
      )}

      {wishes.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-serif text-sm font-semibold text-fg-muted uppercase tracking-widest">
            Ucapan Tamu
          </h4>
          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {wishes.map((w, i) => (
              <div key={i} className="bg-bg border border-border/40 rounded-lg px-4 py-3">
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
