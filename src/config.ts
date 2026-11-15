export const config = {
  couple: {
    initials: "R & S",
    groomNickname: "Radifan",
    brideNickname: "Syifa",
    groom: {
      fullName: "Radifan Aji Karami, S.Kom.",
      fatherName: "Dr(c). Slamet Aji Pamungkas, M.Eng.",
      motherName: "Martini",
      instagram: "https://www.instagram.com/radifanaji",
      photo: "/images/radifan.jpeg",
    },
    bride: {
      fullName: "Syifa Rahmatika, S.M.",
      fatherName: "Alm. Sarwo Utomo",
      motherName: "Rodiah",
      instagram: "https://www.instagram.com/syifarahmatika_",
      photo: "/images/syifa.jpeg",
    },
  },
  event: {
    dateLabel: "Minggu, 6 Desember 2026",
    dateISO: "2026-12-06T09:00:00",
    akad: {
      time: "09.00 WIB – selesai",
      label: "Akad Nikah",
    },
    resepsi: {
      time: "11.00 – 13.00 WIB",
      label: "Resepsi Pernikahan",
    },
    venue: {
      name: "Hotel Lemo Serpong",
      address: "Jl. Raya Legok Karawaci, Kelapa Dua, Tangerang 15810",
      mapsUrl: "https://maps.google.com/?q=Hotel+Lemo+Serpong,+Jl.+Raya+Legok+Karawaci,+Kelapa+Dua,+Tangerang+15810",
      calendarUrl:
        "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Pernikahan+Radifan+%26+Syifa&dates=20261206T020000Z%2F20261206T060000Z&details=Akad+Nikah+pukul+09.00+WIB+%7C+Resepsi+11.00%E2%80%9313.00+WIB&location=Hotel+Lemo+Serpong,+Jl.+Raya+Legok+Karawaci,+Kelapa+Dua,+Tangerang+15810",
    },
  },
  heroPhoto: "/images/placeholder.jpg",
  loveStory: [
    {
      year: "2020",
      title: "Pertemuan Pertama",
      description:
        "[Cerita singkat tentang pertemuan pertama Radifan dan Syifa. Di mana, kapan, dan bagaimana kisah indah ini dimulai.]",
      photo: "https://placehold.co/400x300/222122/B7A8A1?text=Love+Story+1",
    },
    {
      year: "2021",
      title: "Mengenal Lebih Dekat",
      description:
        "[Cerita tentang proses saling mengenal, momen-momen spesial yang dilalui bersama oleh Radifan dan Syifa.]",
      photo: "https://placehold.co/400x300/141313/B7A8A1?text=Love+Story+2",
    },
    {
      year: "2025",
      title: "Lamaran",
      description:
        "[Cerita tentang momen lamaran yang tak terlupakan dan keputusan untuk bersatu selamanya dalam ikatan suci pernikahan.]",
      photo: "https://placehold.co/400x300/222122/B7A8A1?text=Love+Story+3",
    },
    {
      year: "2026",
      title: "Menuju Pelaminan",
      description:
        "[Cerita persiapan menuju hari pernikahan di 6 Desember 2026, penuh suka cita dan doa dari keluarga serta orang-orang terkasih.]",
      photo: "https://placehold.co/400x300/5D5148/B7A8A1?text=Love+Story+4",
    },
  ],
  gallery: [
    {
      src: "https://placehold.co/400x600/222122/B7A8A1?text=Gallery+1",
      alt: "Foto Pre-Wedding 1",
    },
    {
      src: "https://placehold.co/400x400/141313/B7A8A1?text=Gallery+2",
      alt: "Foto Pre-Wedding 2",
    },
    {
      src: "https://placehold.co/400x500/5D5148/B7A8A1?text=Gallery+3",
      alt: "Foto Pre-Wedding 3",
    },
    {
      src: "https://placehold.co/400x600/060707/B7A8A1?text=Gallery+4",
      alt: "Foto Pre-Wedding 4",
    },
    {
      src: "https://placehold.co/400x400/222122/B7A8A1?text=Gallery+5",
      alt: "Foto Pre-Wedding 5",
    },
    {
      src: "https://placehold.co/400x500/222122/B7A8A1?text=Gallery+6",
      alt: "Foto Pre-Wedding 6",
    },
  ],
  gift: {
    message:
      "Doa restu Anda merupakan karunia yang paling berarti bagi kami. Namun jika Anda ingin memberikan hadiah, Anda dapat mengirimkannya melalui:",
    accounts: [
      {
        type: "Bank",
        bankName: "[Nama Bank]",
        accountNumber: "[Nomor Rekening]",
        accountName: "[Nama Pemilik Rekening]",
      },
      {
        type: "E-Wallet",
        bankName: "DANA / OVO / GoPay",
        accountNumber: "[Nomor E-Wallet]",
        accountName: "[Nama Pemilik]",
      },
    ],
  },
  rsvp: {
    googleFormsUrl: process.env.NEXT_PUBLIC_RSVP_FORM_URL ?? "",
    nameEntryId: process.env.NEXT_PUBLIC_RSVP_NAME_ENTRY_ID ?? "",
    attendanceEntryId: process.env.NEXT_PUBLIC_RSVP_ATTENDANCE_ENTRY_ID ?? "",
    messageEntryId: process.env.NEXT_PUBLIC_RSVP_MESSAGE_ENTRY_ID ?? "",
  },
  closing: {
    photo: "https://placehold.co/390x500/060707/B7A8A1?text=Radifan+%26+Syifa",
    message:
      "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.",
  },
};
