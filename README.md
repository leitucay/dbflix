# DBFLIX

A Netflix-style fanpage. Black + soft pastel yellow. Plain HTML/CSS/JS - no build step, no installs.

## What's inside

```
dbflix/
  index.html          the page shell (menu on the left, logo on the right)
  css/style.css       colors and layout (change colors at the top, in :root)
  js/data.js          >>> YOUR CONTENT: add movies, videos, links here <<<
  js/app.js           site logic + menu names / page intro text (CATS list)
  images/
    posters/          tall posters for Movies & Series (e.g. movie-1.jpg)
    banners/          wide images for the Home banner + other categories
    about.jpg         photo on the About page (optional)
    logo.png          optional image logo (then set site.logoImage in data.js)
```

## Add a movie / video (js/data.js)

Copy any `{ ... }` block inside `items`, paste it, and edit it:

```js
{
  id: "movie-3",                       // must be unique
  category: "movies",                  // movies | series | music-videos | events |
                                       // guestings | vlogs | behind-the-scenes | fanmade
  title: "My Movie",
  date: "2026-12-25",                  // newest first
  poster: "images/posters/movie-3.jpg",
  banner: "images/banners/movie-3.jpg",
  description: "Short story blurb.",
  streamUrl: "https://...",            // ON streaming -> clicking goes to this link
  platform: "Netflix",
  whereToWatch: "In cinemas Dec 25"    // NOT on streaming -> shows these details instead
}
```

- **YouTube videos:** paste the link or the 11-character ID in `youtube:`. It plays inside the site, with a
  **Watch on YouTube** button so views still count on YouTube. If you skip `poster`/`banner`, the YouTube
  thumbnail is used automatically.
- **Series:** add an `episodes: [{ title, youtube }, ...]` list - fans pick an episode and it plays on the site.
- **Events:** use `details: { "Date": "...", "Venue": "..." }`. No video needed.
- **Home banner:** set `featured: true` on anything you want in the rotating banner.
- Poster file missing? A styled placeholder with the title is shown instead, so nothing looks broken.

The video ID `jNQXAC9IVRw` in the samples is just a demo video. Replace it with yours, and delete the
sample entries you don't need.

## Picture sizes (guide)

- Posters: 600 x 900 px (2:3)
- Banners / thumbnails: 1600 x 900 px (16:9)
- About photo: 800 x 1000 px (4:5)

## Preview on your computer

Double-clicking `index.html` shows the site, but **YouTube may refuse to play embedded videos when the page
is opened as a file**. To preview correctly, run a tiny local server from inside this folder:

```
python3 -m http.server 8000
```

then open http://localhost:8000. (Or just upload it - embeds work fine on a real website.)

## Put it online

Upload the **contents of this folder** (so `index.html` is at the top level) to any static host:

- **Netlify Drop** - drag the folder onto app.netlify.com/drop
- **GitHub Pages** - push to a repo, then Settings > Pages
- **Cloudflare Pages**, **Vercel**, or any normal web hosting (`public_html`)

The site uses `#/page` links, so it works on every host without extra setup.

## Notes

- The footer says the site is unofficial and fan-made - edit it in `data.js` (`site.footer`).
- Only upload posters, images and videos you have the right to share, and credit fan creators in `details`.
