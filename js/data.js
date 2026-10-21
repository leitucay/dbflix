/* ==========================================================
   DBFLIX - YOUR CONTENT LIVES HERE
   This is the only file you need to edit to add shows/videos.
   (Descriptions of each page's intro text are in js/app.js, CATS list.)

   HOW TO ADD SOMETHING
   Copy one { ... } block inside "items", paste it, and change it.

   category must be one of:
     "movies" | "series" | "music-videos" | "events" |
     "guestings" | "vlogs" | "behind-the-scenes" | "fanmade"

   Fields (all optional except id, title, category):
     id           unique, no spaces            e.g. "movie-3"
     title        name shown on the card
     category     see list above
     date         YYYY-MM-DD (newest shows first)
     year         e.g. 2026
     duration     e.g. "1h 45m"
     description  text shown in the pop-up and on the Home banner
     poster       tall image   (movies & series)  e.g. "images/posters/movie-3.jpg"
     banner       wide image   (everything else + Home banner) e.g. "images/banners/movie-3.jpg"
                  -> For YouTube videos you can leave poster/banner empty:
                     the YouTube thumbnail is used automatically.
     youtube      a YouTube link OR the 11-character video ID.
                  The video plays inside the site AND has a
                  "Watch on YouTube" button (so views still count there).
     streamUrl    link to where it streams (Netflix, Viu, iWantTFC, etc.).
                  MOVIES/SERIES with a streamUrl go straight to that link when clicked.
     platform     name shown on the button, e.g. "Netflix"
     whereToWatch text for items NOT on streaming yet, e.g. "In cinemas Dec 25"
     details      extra info as pairs, e.g. { "Date": "Dec 25, 2026", "Venue": "SM Arena" }
     tags         e.g. ["comedy", "drama"]
     episodes     (series) [ { title: "Episode 1", youtube: "VIDEO_ID_OR_LINK" }, ... ]
     featured     true = shows in the big rotating banner on Home

   NOTE: the youtube ID below ("jNQXAC9IVRw") is just a SAMPLE video
   so you can see the player working. Replace it with your own.
   ========================================================== */

window.DBFLIX = {

  site: {
    name: "DBFLIX",
    tagline: "The fan-made home of everything we love.",
    logoImage: "",   // optional: e.g. "images/logo.png" (leave "" to use the text logo)
    footer: "DBFLIX is an unofficial, fan-made website made by fans, for fans. It is not affiliated with Netflix or with the people featured here. All videos, images and names belong to their respective owners."
  },

  about: {
    title: "About DBFLIX",
    image: "images/about.jpg",   // tall photo, optional
    text: [
      "Welcome to DBFLIX - a fan-made, streaming-style home for every movie, series, music video, event, interview, vlog and behind-the-scenes moment worth rewatching.",
      "Everything here is collected and shared out of love by fans. Replace this text with your own story: who runs the page, why it started, and how fans can join in."
    ],
    links: [
      { label: "YouTube",   url: "https://youtube.com" },
      { label: "Instagram", url: "https://instagram.com" },
      { label: "X / Twitter", url: "https://x.com" },
      { label: "Facebook",  url: "https://facebook.com" }
    ]
  },

  items: [

    /* ---------------- MOVIES ---------------- */
    {
      id: "movie-1", category: "movies", title: "Love You So Bad",
      date: "2025-25-12", year: 2025, duration: "1h 52m",
      poster: "images/posters/lysb_poster.jpeg", banner: "images/banners/movie-1.jpg",
      description: "A sample movie that IS available on streaming. Clicking its poster goes straight to the streaming link. Hover and press the (i) button to see its details instead.",
      streamUrl: "https://example.com/watch/movie-one", platform: "Your Streaming Platform",
      tags: ["drama", "romance"], featured: true
    },
    {
      id: "movie-2", category: "movies", title: "Love You So Bad",
      date: "2025-12-25", year: 2025, duration: "1h 52",
      poster: "images/posters/lsyb_poster.jpeg", banner: "images/banners/movie-2.jpg",
      description: "Sassy, confident, and unapologetically herself, college senior Savannah is determined to live life on her own terms. She finds herself torn between two different men: bad boy and chich magnet L.A. who fuels her wild side, and principled and ambitious Vic who challenges her to grow. As old wounds resurface and difficult choices confront her, she must devide who she really wants to be and who she dares to love.",
      youtube: "https://www.netflix.com/search?q=love%20you%20so%20bad&jbv=82735088",
      whereToWatch: "Avaible in Netflix",
      details: { "Release": "Dec 25, 2026", "Where": "Cinemas nationwide" },
      tags: ["Romantic comedy", "Coming-of-age drama"]
    },

    /* ---------------- SERIES ---------------- */
    {
      id: "series-1", category: "series", title: "Teen Clash",
      date: "2023-03-17", year: 2023,
      poster: "images/posters/teenclash.jpg", banner: "images/banners/series-1.jpg",
      description: "An aspiring musician who is bent on joining her school's music jam in hopes of redeeming herself from a past embarrassment meets a charming songwriter who will help her overcome the struggles in her journey. Bianca De Vera as Yannie",
      episodes: [
        { title: "Episode 1", youtube: "https://www.youtube.com/watch?v=QaOsrFFQYe8" },
        { title: "Episode 2", youtube: "jNQXAC9IVRw" },
        { title: "Episode 3", youtube: "jNQXAC9IVRw" }
      ],
      tags: ["teen drama"], featured: true
    },
    {
      id: "series-2", category: "series", title: "The Secrets of Hotel 88",
      date: "2026-02-26", year: 2026,
      poster: "images/posters/h88.jpeg", banner: "images/banners/series-2.jpg",
      description: "Two estranged families reunite when Hotel 88 reopens, but the former best friends who own it are found dead. Their children must share the inheritance while uncovering buried secrets and the truth about their fathers' deaths. Bianca De Vera as Jade Almazan and Dustin Yu as Edward Arellano",
      streamUrl: "https://www.iwanttfc.com/details/843dd7ea-8324-411f-9853-4e499544523e", platform: "iWant"
    },

    /* ---------------- MUSIC VIDEOS ---------------- */
    {
      id: "mv-1", category: "music-videos", title: "Ngiti",
      date: "2026-04-25", youtube: "https://www.youtube.com/watch?v=f4Q7PTQ56Ck&list=RDf4Q7PTQ56Ck&start_radio=1",
      description: "Sa kabila ng hirap at sakit, may pag-asang darating ang dahilan para ngumiti.",
      featured: true
    },
    {
      id: "mv-2", category: "music-videos", title: "Kinakabahan",
      date: "2025-09-11", youtube: "https://www.youtube.com/watch?v=j8mlMYOLlD8&list=RDj8mlMYOLlD8&start_radio=1",
      description: "Kapag lumalalim na ang nararamdaman, kaya mo bang panindigan? Feel REAL KILIG VIBES in KINAKABAHAN Official Music Video starring Bianca De Vera and Dustin Yu #DustBia in their first ever official project together."
    },

    /* ---------------- EVENTS ---------------- */
    {
      id: "event-1", category: "events", title: "Sample Concert Livestream",
      date: "2026-11-15", youtube: "jNQXAC9IVRw",
      description: "A sample event that has a video or livestream you can watch here.",
      details: { "Date": "Nov 15, 2026", "Venue": "Your Arena, City" }
    },
    {
      id: "event-2", category: "events", title: "Sample Fan Meeting",
      date: "2026-12-05",
      description: "A sample event with no video - it just shows the details of when and where it happens.",
      whereToWatch: "Attend in person. Tickets available through the official ticketing page.",
      details: { "Date": "Dec 5, 2026", "Time": "6:00 PM", "Venue": "Your Hall, City" }
    },

    /* ---------------- GUESTINGS / INTERVIEWS ---------------- */
    {
      id: "guest-1", category: "guestings", title: "Sample Talk Show Guesting",
      date: "2026-09-02", youtube: "jNQXAC9IVRw",
      description: "A sample guesting on a talk show."
    },
    {
      id: "guest-2", category: "guestings", title: "Sample Magazine Interview",
      date: "2026-05-22", youtube: "jNQXAC9IVRw",
      description: "A sample sit-down interview."
    },

    /* ---------------- VLOGS ---------------- */
    {
      id: "vlog-1", category: "vlogs", title: "Sample Vlog: A Day With Us",
      date: "2026-10-18", youtube: "jNQXAC9IVRw",
      description: "A sample vlog."
    },
    {
      id: "vlog-2", category: "vlogs", title: "Sample Vlog: Travel Edition",
      date: "2026-08-09", youtube: "jNQXAC9IVRw",
      description: "Another sample vlog."
    },

    /* ---------------- BEHIND THE SCENES ---------------- */
    {
      id: "bts-1", category: "behind-the-scenes", title: "Sample Behind the Scenes: Movie One",
      date: "2026-09-14", youtube: "jNQXAC9IVRw",
      description: "A sample behind-the-scenes video."
    },
    {
      id: "bts-2", category: "behind-the-scenes", title: "Sample Photoshoot BTS",
      date: "2026-07-01", youtube: "jNQXAC9IVRw",
      description: "A sample photoshoot behind-the-scenes."
    },

    /* ---------------- FANMADE ---------------- */
    {
      id: "fan-1", category: "fanmade", title: "Sample Fan Edit One",
      date: "2026-10-12", youtube: "jNQXAC9IVRw",
      description: "A sample fan-made edit. Add credit to the fan who made it!",
      details: { "Made by": "@fan_username" }
    },
    {
      id: "fan-2", category: "fanmade", title: "Sample Fan Tribute",
      date: "2026-08-30", youtube: "jNQXAC9IVRw",
      description: "A sample fan tribute video.",
      details: { "Made by": "@another_fan" }
    }
  ]
};
