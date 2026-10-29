import { createRoot } from "react-dom/client";

// Relic Protocol landing page. React + Tailwind CSS (v3), built by `npm run build` into assets/.
// Fonts: Oswald (display), Inter (body), JetBrains Mono (stats) from Google Fonts.

const DISCORD_URL = null; // Set to the invite link once the server exists; until then the button shows "coming soon".
const DEVLOG_BASE = "devlog/";

const PILLARS = [
	{
		tag: "01 / MOBILITY",
		title: "Zero Mobility",
		body: "Positioning is absolute. No blinks, no leaps. Fight your way out.",
		glyph: "M4 12h16M12 4v16",
	},
	{
		tag: "02 / GEOMETRY",
		title: "Physical Geometry",
		body: "Minions are solid walls. Trap your enemies in raw 5v5 warfare.",
		glyph: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
	},
	{
		tag: "03 / THE ALTAR",
		title: "The Altar Cage",
		body: "Walled, transparent arenas that limit snowballing leaders and block abilities from outside.",
		glyph: "M12 3l9 9-9 9-9-9z",
	},
];

const DEVLOGS = [
	{
		n: "005",
		date: "2026-10-29",
		title: "The stickman look",
		summary: "All ten heroes as stickmen, a cartoon forest map, and an effect for every attack and skill.",
		href: DEVLOG_BASE + "005-the-stickman-look.html",
	},
	{
		n: "004",
		date: "2026-10-24",
		title: "First heroes in full art",
		summary: "Orin Ash and Kira Vex get real models, animations and ability effects.",
		href: DEVLOG_BASE + "004-first-heroes-in-full-art.html",
	},
	{
		n: "003",
		date: "2026-10-24",
		title: "Online play and relic arenas",
		summary: "Dedicated servers, walled relic arenas in the jungle, ten heroes, a real map, and the first hero model.",
		href: DEVLOG_BASE + "003-online-play-and-relic-arenas.html",
	},
	{
		n: "002",
		date: "2026-10-23",
		title: "Six heroes and fog of war",
		summary: "Hero select, five new heroes, and fog of war without wards.",
		href: DEVLOG_BASE + "002-six-heroes-and-fog-of-war.html",
	},
	{
		n: "001",
		date: "2026-10-22",
		title: "A MOBA with no shop",
		summary: "The idea behind the game, its two hard rules, and the first playable prototype.",
		href: DEVLOG_BASE + "001-a-moba-with-no-shop.html",
	},
];

// Heroes start with no attribute points; players spend them on level-up.
// Leave an attribute as null to show the slot without a number.
// quote: a short line in the hero's own voice; null hides it.
// portrait: concept art (or an in-game render) with a transparent background; null shows the placeholder.
const SPOTLIGHT = [
	{
		name: "Orin Ash",
		role: "Mage",
		primary: "INT",
		attributes: { STR: null, AGI: null, INT: null },
		kit: ["Fireball", "Flame Wall", "Scorch", "Meteor"],
		quote: null,
		portrait: "img/orin_ash_concept.webp",
		accent: "from-orange-500/25",
	},
	{
		name: "Kira Vex",
		role: "Assassin",
		primary: "AGI",
		attributes: { STR: null, AGI: null, INT: null },
		kit: ["Shadow Bind", "Smoke Veil", "Crescent Slash", "Execute"],
		quote: null,
		portrait: "img/kira_vex_concept.webp",
		accent: "from-fuchsia-500/25",
	},
];

function GlassButton({ href, children, tone = "glass" }) {
	const tones = {
		glass: "border-cyan-300/40 bg-white/5 text-cyan-50 hover:bg-cyan-300/10 hover:border-cyan-200/70",
		crimson: "border-rose-400/60 bg-rose-600/25 text-rose-50 hover:bg-rose-600/40 hover:border-rose-300",
	};
	return (
		<a
			href={href}
			className={`inline-flex items-center gap-3 border px-6 py-3 font-display text-sm uppercase tracking-[0.2em] backdrop-blur-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 ${tones[tone]}`}
		>
			{children}
			<span aria-hidden="true">→</span>
		</a>
	);
}

function Glass({ className = "", children }) {
	return (
		<div className={`relative border border-cyan-200/20 bg-slate-900/40 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${className}`}>
			{children}
		</div>
	);
}

function Hero() {
	return (
		<section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28">
			<p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">5v5 · Godot · In development</p>
			<h1 className="mt-6 font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl [text-wrap:balance]">
				No dashes.<br />No shops.<br />
				<span className="text-cyan-300">Pure spatial brutality.</span>
			</h1>
			<p className="mt-8 max-w-2xl text-lg text-slate-300 sm:text-xl">
				Enter Relic Protocol: a 5v5 tactical arena where minion geometry and spatial control dictate survival.
			</p>
			<div className="mt-10 flex flex-wrap gap-4">
				<GlassButton href="#heroes">View Heroes</GlassButton>
				{DISCORD_URL ? (
					<GlassButton href={DISCORD_URL} tone="crimson">Join the Discord</GlassButton>
				) : (
					<span className="inline-flex items-center gap-3 border border-rose-400/40 bg-rose-600/10 px-6 py-3 font-display text-sm uppercase tracking-[0.2em] text-rose-100/70 backdrop-blur-md">
						Discord · coming soon
					</span>
				)}
			</div>
		</section>
	);
}

function Pillars() {
	return (
		<section aria-labelledby="pillars-title" className="py-16">
			<h2 id="pillars-title" className="font-display text-sm uppercase tracking-[0.3em] text-slate-400">Core pillars</h2>
			<div className="mt-8 grid gap-6 md:grid-cols-3">
				{PILLARS.map((p) => (
					<Glass key={p.title} className="p-6">
						<div className="flex items-center justify-between">
							<span className="font-mono text-xs text-cyan-300/70">{p.tag}</span>
							<svg viewBox="0 0 24 24" className="h-6 w-6 text-cyan-300" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
								<path d={p.glyph} />
							</svg>
						</div>
						<h3 className="mt-6 font-display text-2xl font-bold uppercase text-white">{p.title}</h3>
						<p className="mt-3 text-slate-300">{p.body}</p>
					</Glass>
				))}
			</div>
		</section>
	);
}

const SHOTS = [
	{ src: "img/laning-stickmen.webp", caption: "Laning", alt: "Blue and red stickman heroes and minion waves fighting on a sandy lane" },
	{ src: "img/tower-fight.webp", caption: "Tower dive", alt: "Red heroes attacking a striped blue tower as fire effects explode along the lane" },
	{ src: "img/relic-arena.webp", caption: "Relic arena", alt: "A purple relic arena open in the river with a glowing relic at its centre" },
];

function InGame() {
	return (
		<section aria-labelledby="ingame-title" className="py-16">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<h2 id="ingame-title" className="font-display text-sm uppercase tracking-[0.3em] text-slate-400">In the game today</h2>
				<span className="font-mono text-xs text-slate-500">Pre-release build</span>
			</div>
			<Glass className="mt-8 p-4 sm:p-6">
				<img src="img/stickman-roster.webp" alt="The ten heroes as coloured stickmen, each with their own weapon" className="w-full max-w-full" loading="lazy" />
			</Glass>
			<div className="mt-6 grid gap-6 md:grid-cols-3">
				{SHOTS.map((s) => (
					<figure key={s.src} className="min-w-0">
						<Glass className="overflow-hidden">
							<img src={s.src} alt={s.alt} className="aspect-video w-full max-w-full object-cover" loading="lazy" />
						</Glass>
						<figcaption className="mt-2 font-mono text-xs uppercase tracking-widest text-slate-400">{s.caption}</figcaption>
					</figure>
				))}
			</div>
		</section>
	);
}

function AttributeCell({ label, value, primary }) {
	return (
		<div className={`border px-3 py-3 text-center ${primary ? "border-cyan-300/60 bg-cyan-300/10" : "border-white/10 bg-white/[0.03]"}`}>
			<div className={`font-mono text-xs tracking-widest ${primary ? "text-cyan-200" : "text-slate-400"}`}>{label}</div>
			<div className="mt-1 font-mono text-2xl tabular-nums text-white">{value ?? "—"}</div>
			{primary && <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-cyan-300">Primary</div>}
		</div>
	);
}

function HeroCard({ hero }) {
	const initials = hero.name.split(" ").map((w) => w[0]).join("");
	return (
		<Glass className="grid overflow-hidden md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
			<div className={`relative aspect-[4/5] max-w-full bg-gradient-to-b ${hero.accent ?? "from-slate-800"} via-slate-900 to-black md:aspect-auto md:min-h-[26rem]`}>
				{hero.portrait ? (
					<>
						<img src={hero.portrait} alt={`${hero.name} concept art`} className="absolute inset-0 h-full w-full object-contain p-4" loading="lazy" />
						<span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-widest text-slate-400">Concept art</span>
					</>
				) : (
					<div className="absolute inset-0 grid place-items-center">
						<div className="grid h-40 w-40 place-items-center border border-cyan-200/30 rotate-45">
							<span className="-rotate-45 font-display text-5xl font-bold text-cyan-100/80">{initials}</span>
						</div>
						<span className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-slate-500">Portrait placeholder</span>
					</div>
				)}
			</div>
			<div className="min-w-0 p-6 sm:p-8">
				<p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-300/80">{hero.role} · {hero.primary}</p>
				<h3 className="mt-2 font-display text-4xl font-bold uppercase text-white">{hero.name}</h3>
				<div className="mt-6 grid grid-cols-3 gap-3">
					{Object.entries(hero.attributes).map(([k, v]) => (
						<AttributeCell key={k} label={k} value={v} primary={k === hero.primary} />
					))}
				</div>
				<ul className="mt-6 flex flex-wrap gap-2">
					{hero.kit.map((a, i) => (
						<li key={a} className="border border-white/10 px-3 py-1 font-mono text-xs text-slate-300">
							<span className="text-cyan-300">{"QWER"[i]}</span> {a}
						</li>
					))}
				</ul>
				{hero.quote && <blockquote className="mt-8 border-l-2 border-rose-500/70 pl-4 italic text-slate-300">“{hero.quote}”</blockquote>}
			</div>
		</Glass>
	);
}

function Spotlight() {
	return (
		<section id="heroes" aria-labelledby="heroes-title" className="py-16 scroll-mt-8">
			<div className="flex flex-wrap items-end justify-between gap-4">
				<h2 id="heroes-title" className="font-display text-sm uppercase tracking-[0.3em] text-slate-400">Hero spotlight</h2>
				<span className="font-mono text-xs text-slate-500">10 heroes in the roster</span>
			</div>
			<div className="mt-8 grid gap-8">
				{SPOTLIGHT.map((h) => (
					<HeroCard key={h.name} hero={h} />
				))}
			</div>
		</section>
	);
}

function Devlogs() {
	return (
		<section aria-labelledby="devlog-title" className="py-16">
			<h2 id="devlog-title" className="font-display text-sm uppercase tracking-[0.3em] text-slate-400">Devlog</h2>
			<ol className="mt-8 grid gap-4">
				{DEVLOGS.map((d) => (
					<li key={d.n}>
						<a href={d.href} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
							<Glass className="grid gap-2 p-5 transition group-hover:border-cyan-200/50 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-6">
								<div className="font-mono text-xs text-slate-400">
									<div className="text-cyan-300">#{d.n}</div>
									<time dateTime={d.date}>{d.date}</time>
								</div>
								<div className="min-w-0">
									<h3 className="font-display text-xl font-bold uppercase text-white group-hover:text-cyan-200">{d.title}</h3>
									<p className="mt-1 text-slate-300">{d.summary}</p>
								</div>
							</Glass>
						</a>
					</li>
				))}
			</ol>
		</section>
	);
}

function RelicProtocolLanding() {
	return (
		<div className="relative min-h-full overflow-hidden bg-[#070a0d] font-body text-slate-200">
			{/* Structural grid overlay */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 opacity-[0.07]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(103,232,249,1) 1px, transparent 1px), linear-gradient(90deg, rgba(103,232,249,1) 1px, transparent 1px)",
					backgroundSize: "48px 48px",
				}}
			/>
			{/* Jungle glow */}
			<div aria-hidden="true" className="pointer-events-none absolute -top-40 right-[-10%] h-[36rem] w-[36rem] rounded-full bg-emerald-900/30 blur-3xl" />
			<div aria-hidden="true" className="pointer-events-none absolute top-[40rem] left-[-15%] h-[30rem] w-[30rem] rounded-full bg-cyan-900/20 blur-3xl" />

			<div className="relative mx-auto max-w-6xl px-4 sm:px-8">
				<header className="flex items-center justify-between py-6">
					<span className="font-display text-xl font-bold uppercase tracking-[0.2em] text-white">Relic Protocol</span>
					<nav className="flex gap-6 font-mono text-xs uppercase tracking-widest text-slate-400">
						<a href="#heroes" className="hover:text-cyan-200">Heroes</a>
						<a href="#devlog-title" className="hover:text-cyan-200">Devlog</a>
						<a href="timeline.html" className="hover:text-cyan-200">Timeline</a>
					</nav>
				</header>
				<Hero />
				<Pillars />
				<InGame />
				<Spotlight />
				<Devlogs />
				<footer className="border-t border-white/10 py-10 font-mono text-xs text-slate-500">
					© 2026 Ynairally · Every devlog is dated and backed by a published hash of the game's source. See the <a href="timeline.html" className="text-cyan-300 hover:text-cyan-200">timeline</a>.
				</footer>
			</div>
		</div>
	);
}

createRoot(document.getElementById("root")).render(<RelicProtocolLanding />);
