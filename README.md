# The Alvian Zachry Faturrahman Portfolio Experience™

> *Warning: Contains excessive amounts of "Regional Manager" energy, mathematically generated worms, and an unnecessarily comprehensive testing infrastructure. Proceed with caution.*

Hi, I'm **Alvian Zachry**. I collect job titles like other people collect Pokémon cards (Program Manager, Technical Lead, Full Stack Engineer, Talent Acquisition Specialist... look, I just really like working, okay?).

This isn't just a portfolio; it's a **React-Vite-TypeScript-Tailwind-FramerMotion** masterpiece with more testing than a paranoid QA engineer's fever dream. I built it to make myself feel better about all the `create-react-app` projects I abandoned in 2019.

## 🌟 "Awesome" Features (That I Definitely Needed)

I got bored of having a "normal" website, so I decided to turn this simple portfolio into an enterprise-grade application for absolutely no reason.

### 🎨 The "Indecisive" Theme Engine
I couldn't decide on a color scheme, so I built a complex context provider to support all of them.
*   **Light Mode**: For people who enjoy burning their retinas.
*   **Dark Mode**: The standard developer experience.
*   **Cyberpunk Mode**: A high-contrast, neon-infused seizure warning that I added because I watched *Blade Runner* once. It changes the font to `Courier New` because "hacking".

### 🪱 The "Worm" Background (Mathematically Verified)
You noticed the squiggly lines? I call them "Worms."
*   **What it does:** I use complex Bézier curves (`Q` commands, because I'm fancy) and `Math.random()` to generate floating squiggles.
*   **Paranoid Testing:** I literally wrote **unit tests** for these lines. If a worm is straight, the build fails. I have trust issues with `Math.random()`.
*   **Tech Spec:** It renders **50** independent SVG paths that fade in and out. Yes, I am personally responsible for your laptop fan spinning up right now. You're welcome.
*   **Want to steal it?** Of course you do. Install it via npm: `npm install @alvianzf/squiggly-lines-go-brrr`. I even packaged it for you because I'm too nice.

### � The "Experience" Ecosystem
My career path was too chaotic for a simple timeline, so I built a full-blown dashboard.
*   **Tabbed Interface:** Separate views for "Roles", "Projects", and "NPM Packages" because I don't want to scroll.
*   **The "Freelance Vigilante":** A dedicated section for my 2011-2019 era of building government ERPs at 3 AM.
*   **NPM Integration:** A live list of my sarcastic npm packages with one-click install commands.

### �📱 Apocalypse-Ready PWA
*   **Offline Support**: This website caches itself. If the internet goes down, you can still read my resume while the world burns.
*   **Installable**: You can install this portfolio on your phone. Why would you want an app of *me* on your home screen? I don't know, but now you have the option.
*   **Hand-Crafted Icons**: I manually generated the PWA icons because automated tools failed me.

### 🎭 The Infinite Skill Marquee
One static list of skills wasn't enough to contain my professional ego. I needed an honest-to-god **Infinite CSS Marquee**.
*   It scrolls left. It scrolls right.
*   It pauses on hover (so you can carefully read "CodeIgniter" and wonder what year I think it is).
*   **Contains:** Everything from "NestJS" to "Project Management." If it's a buzzword, I put it in there.

### 🔥 "Get Roasted" Mentorship
I made an entire page dedicated to **roasting you**.
*   I will manually tear apart your interview skills.
*   I call it "Brutally Honest Feedback" because "Professional Criticism" sounded too boring.
*   Finally, a service for people who think LeetCode isn't painful enough.

### 🤖 SEO & AIO (Feeding the Robot Overlords)
I didn't just add meta tags; I performed a ritual summoning for the search engine bots.
*   **Dynamic Blogger API Integration**: I wrote a Node.js script that literally fetches data from the **Blogger API** to generate my XML sitemap. Yes, I use Blogger. STOP LAUGHING. It works.
*   **JSON-LD Schema with Star Ratings**: I injected structured data with a 5-star aggregateRating so Google's AI knows *exactly* who I am and that people apparently love me. I am feeding the basilisk directly.
*   **OpenGraph**: My links look so good on Slack that my coworkers might actually click them for once.

### 🧪 The Testing Pyramid That Nobody Asked For
I got paranoid about bugs, so I built a testing infrastructure that would make NASA jealous.

#### Unit & Integration Tests (Vitest)
*   **Component Testing**: Every component has tests. Yes, even the `ModernCard` that just wraps a div.
*   **Browser Mode**: Vitest runs in Playwright to test actual browser behavior because mocking the DOM is apparently "not good enough."
*   **Coverage Reports**: I track code coverage like a stock portfolio. 80%+ or it didn't happen.
*   **React Testing Library**: Testing components the way users would interact with them (if users could write TypeScript).

#### End-to-End Tests (Playwright)
*   **18 Tests Across 3 Browsers**: Chromium, Firefox, and WebKit. Because if it works in Chrome but not Safari, did you really build it?
*   **Real User Flows**: Testing navigation, mobile menus, theme toggles, and everything a recruiter might accidentally click.
*   **CI-Ready**: These run on every commit because I have commitment issues with broken deployments.

#### Component Documentation (Storybook)
*   **Interactive Component Library**: Every component documented with multiple states and variations.
*   **Visual Testing**: Because "it looks fine on my machine" is not a deployment strategy.
*   **Accessibility Checks**: Making sure my components pass a11y standards (because lawsuits are expensive).
*   **Framework**: Running Storybook 10.x with React-Vite integration because living on the bleeding edge is my love language.

### 👮 The Fun Police (Strict Linting)
*   **Husky & Lint-Staged**: I cannot commit code if it's ugly. The pre-commit hook literally runs tests.
*   **Prettier**: If I miss a semicolon, the computer yells at me.
*   **Strict ESLint**: `any` is now illegal. I have to type `unknown` and cast it like a wizard.
*   **TypeScript Strict Mode**: The compiler is more judgmental than my code reviewer.

### 🕹️ The "Stupid Playable Arcade"
Because every professional portfolio needs a way to waste the recruiter's time.
*   **Bug Squash**: Save the production database from actual bugs.
*   **Quick Sync Dodge**: Simulate the average Tuesday by dodging calendar invites.
*   **Elusive Deploy**: Try to push to production. The button runs away. Good luck.
*   **Learn Flex (Sarcastic)**: CSS is hard. We made it harder.
*   **Type Torture**: Fix `any` types or get roasted.

## 🔧 Under The Hood (How I Over-Engineered This)

I built this app with a stack that says "I have too much free time."

### Core Stack
*   **Vite**: Because waiting more than 100ms for a local server start is a personal insult to me.
*   **React 19**: I'm on the bleeding edge. If it breaks, it's a "feature."
*   **TypeScript**: Because I realized `any` is a sin (mostly).
*   **Framer Motion**: Used everywhere. If an element enters the DOM without a specialized dance routine, did it really render?
*   **Tailwind CSS**: 50 utility classes in one `className` string. Readability is subjective.
*   **React Helmet Async**: Managing document heads asynchronously because I live in the future.

### Testing Arsenal
*   **Vitest**: Unit and integration testing with browser mode via Playwright.
*   **@testing-library/react**: For testing components like a real user (if users wrote code).
*   **Playwright**: E2E testing across 3 browsers because cross-browser bugs are my arch-nemesis.
*   **Storybook**: Component documentation and visual regression testing.

### Quality Assurance
*   **ESLint**: Catches my mistakes before my pride does.
*   **Prettier**: Auto-formats everything so I can pretend I'm consistent.
*   **Husky**: Git hooks that shame me into writing better code.

## 🏃 How to Run My Masterpiece

If you truly want to run this locally and see my worms wiggle on your own localhost:

```bash
# Install the entire internet
npm install

# Install Playwright browsers (for E2E tests)
npx playwright install

# Summon the worms
npm run dev

# Generate the sitemap (and expose my Blogger secrets)
npm run generate-sitemap

# Run unit tests (prove the worms aren't broken)
npm test

# Run E2E tests (prove the whole site isn't broken)
npx playwright test

# Open Storybook (see components in isolation)
npm run storybook

# Build for production (like you're going to fork this)
npm run build
```

## 🎯 Contact

Need someone to over-engineer your portfolio? Want brutally honest feedback on your interview skills?

📧 **hello@alvianzf.id** — I actually check this one.

## 📝 License

Licensed under **MIT** (Mostly Intense TypeScript).

Feel free to steal the WormBackground (it's on npm: `@alvianzf/squiggly-lines-go-brrr`) or the testing infrastructure. I know that's the only reason you're looking at the code anyway.
