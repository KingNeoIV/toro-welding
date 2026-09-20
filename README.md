# Toro Welding & Fabrication website

The website for Toro Welding & Fabrication (Ingleside, TX), live at https://www.toro-welding.com.

Built with React 19, TypeScript, Vite, and Tailwind CSS 4. It is a single-page site (Hero, Services, Why Toro, Work, Archive, Instagram feed, Footer) plus two plain HTML pages (Privacy Policy and Accessibility Statement). Hosted free on GitHub Pages and deployed automatically.

## Run it on your computer

You need Node.js 20 or newer and git. In a terminal, inside this folder:

```
npm install        # first time only (and after package.json changes)
npm run dev        # starts the site at http://localhost:5173 and updates as you save files
npm run build      # checks for errors and makes the real site in the dist/ folder
npm run preview    # serves the built dist/ folder so you can test the real thing
npm run lint       # checks the code for common mistakes
```

Run `npm run build` before you push. If it fails, the deploy will fail too.

## Where things are

```
index.html                  Page title, Google description, share preview, Google Analytics,
                            Instagram script, and the business data for Google (LocalBusiness)
public/                     Files copied as-is to the live site
  privacy.html              Privacy Policy (plain HTML, styled by legal.css)
  accessibility.html        Accessibility Statement
  sitemap.xml, robots.txt   For search engines. Add new pages to sitemap.xml
  thumbnail.jpg             The picture shown when the site is shared (1200 x 630)
  favicon.ico, icon-192.png, apple-touch-icon.png   Browser tab and phone icons
  CNAME                     Tells GitHub Pages the domain is toro-welding.com. Do not delete
src/
  main.tsx                  Starts the site
  App.tsx                   Page layout: skip link, navbar, sections, footer
  index.css                 Theme colors, font, and animations
  sections/                 Big page sections (Home.tsx lists them in order)
  components/               Navbar, Footer, and smaller pieces
  assets/                   Photos and videos used by the site
    slideShow/              Photos and videos for the Archive slideshow
business-forms/             Printable photo/video release form (kept out of git on purpose)
.github/workflows/          The automatic deploy
```

Most files have comments at the top and next to anything tricky. Search the code for `DRAFT` to find wording that was written as a placeholder and should be confirmed with the owner.

## Everyday changes

**Change the phone number or email.** It appears in several places, so search the project for `3612221930` and `222-1930` (phone) or `torowelding@yahoo.com` (email). Currently that is: Navbar.tsx, Hero.tsx, CtaBand.tsx, Services.tsx, ProjectSlideshow.tsx, Footer.tsx, index.html (share text and business data), privacy.html, and accessibility.html.

**Change business hours.** Edit them in the Footer (Footer.tsx) and in the `openingHoursSpecification` part of the business data in index.html. Google expects those two to match.

**Swap a photo.** Put the new image in `src/assets/` and change the `import` line at the top of the file that uses it. Where each photo is used:

- Work cards: `sections/FeaturedGallery.tsx`
- Service photos: `sections/Services.tsx`
- Background of "Why Toro Welding": `sections/WhyToro.tsx` (work3.jpg)
- Background of the Work section: `bg-work.jpg`, used in FeaturedGallery.tsx
- Footer water tower photo: `ingleside-tx.jpg`, used in Footer.tsx
- Share preview picture: replace `public/thumbnail.jpg` and keep the name and size (1200 x 630). Facebook and others remember old previews, so use the Facebook Sharing Debugger to refresh it.

**Add or remove slideshow photos and videos.** Drop `.jpg` or `.mp4` files into `src/assets/slideShow/` and they appear in the Archive slideshow automatically, in filename order. Delete a file to remove it. Rename files to reorder them. Do not use phone screenshots, since the phone's buttons and status bar show up in the gallery.

**Replace the two finished-boat videos.** Replace `final_showcase.mp4` and `final_showcase2.mp4` in `src/assets/`, and make a new still picture for each (`final_showcase-poster.jpg` and `final_showcase2-poster.jpg`, the first frame of the video):

```
ffmpeg -i final_showcase.mp4 -frames:v 1 -q:v 3 final_showcase-poster.jpg
```

Also update the short written descriptions in `sections/ProjectSlideshow.tsx`. Screen readers read those aloud.

**Replace the hero (top of page) video.** Put a new desktop video, phone video, and still picture in `src/assets/` named `hero-1080.mp4`, `hero-mobile.mp4`, and `hero-poster.jpg`. Making them small keeps the site fast:

```
ffmpeg -i original.mp4 -an -vf "scale=-2:1080" -c:v libx264 -crf 26 -preset slow -movflags +faststart hero-1080.mp4
ffmpeg -i original.mp4 -an -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -movflags +faststart hero-mobile.mp4
ffmpeg -i hero-1080.mp4 -frames:v 1 -q:v 3 hero-poster.jpg
```

The current video is from Pexels (free license, no credit needed): https://www.pexels.com/video/man-working-at-welding-in-factory-10641848/. Only use footage you own or that is licensed for business websites.

**Change wording.** Text lives right in the section files (for example `sections/Services.tsx`). Change the words between the tags and save.

**Add a menu link or a new section.** Create the section in `src/sections/`, give its top element an `id`, add it to `sections/Home.tsx`, and add a matching entry to the `links` list in `components/Navbar.tsx`.

**Add a new plain page** (like the privacy page). Put an `.html` file in `public/`, link to it with the `.html` ending (for example `/terms.html`), and add it to `public/sitemap.xml`.

## Keep files small

Big files make the site slow, especially on phones. Before adding a photo, shrink it to about 2000 pixels on the long side, aiming for 150 to 400 KB (the free site squoosh.app does this in a few clicks). Or with ffmpeg:

```
ffmpeg -i big.jpg -vf "scale='min(2000,iw)':-2" -q:v 4 smaller.jpg
```

## Put changes on the live site

The site publishes itself. When you push to the `main` branch, GitHub builds it and updates toro-welding.com, usually in 1 to 3 minutes.

```
git add -A
git commit -m "Describe what you changed"
git push
```

Watch progress on the repository's Actions tab on GitHub. A green check means it is live; a red X means the build failed (run `npm run build` on your computer to see the error). In the repository's Settings, Pages should be set to deploy from GitHub Actions.

## Things to remember

- **Privacy policy.** It names Google Analytics, Google Fonts, the Instagram feed, and GitHub hosting. If you add or remove any third-party service (a contact form, a chat widget, ads), update `public/privacy.html`.
- **Accessibility.** Keep the pause buttons on moving content, give every meaningful photo a text description, keep text easy to read against its background, and keep the site usable with a keyboard. Update `public/accessibility.html` if that changes.
- **Photos and videos of people.** Get the printable release form in `business-forms/` signed before posting customers, vessel owners, or identifiable crew.
- **Google.** `index.html` includes business details (phone, city, hours) for Google, and `sitemap.xml` lists the pages. In Google Search Console, add the site and submit `https://www.toro-welding.com/sitemap.xml`. Google's local results, including hours, mostly come from the free Google Business Profile, so claim and keep that listing up to date too.
- **Static pages in dev.** Links to pages in `public/` must end in `.html`. Without it, the local dev server shows the home page instead.
- **Do not edit `dist/` or `node_modules/`.** They are rebuilt automatically and are not saved in git.
