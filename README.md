# Nirmaan Hackathon Website

Nirmaan is a design-led hackathon event for builders, students, mentors, sponsors, and campus communities. This website presents the event experience, tracks, schedule, sponsors, submissions, and demo-day flow.

The visual references for the site are available in the [`reference`](./reference) folder.

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the site:

```bash
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run the production build:

```bash
npm run start
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

- [`app`](./app) - Next.js app routes, layout, and global styles.
- [`components`](./components) - Reusable UI components and the main site experience.
- [`lib`](./lib) - Site data such as navigation, tracks, schedule, sponsors, and submissions.
- [`public`](./public) - Static assets, fonts, icons, and images.
- [`reference`](./reference) - Reference images for the intended visual direction.

## Contributing

1. Fork the repository.
2. Create a new branch using your name or handle:

```bash
git checkout -b your-name/feature-name
```

3. Make your changes with clean, reusable code.
4. Test the project locally:

```bash
npm run build
```

5. Push your branch:

```bash
git push origin your-name/feature-name
```

6. Raise a pull request with:
   - A clear summary of what changed.
   - Screenshots or screen recordings if the change affects UI.
   - Any testing notes, including commands you ran.

Keep pull requests focused and avoid unrelated formatting or refactor changes.
