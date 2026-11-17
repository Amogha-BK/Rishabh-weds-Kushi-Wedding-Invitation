import { useEffect, useRef, useState } from "react";
import {
  Flower2,
  MapPin,
  Menu,
  Music,
  Pause,
  Pointer,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { AnimatePresence, m, useIsPresent, useReducedMotion } from "motion/react";
import { Celebration, invitationConfig as config } from "./invitationConfig";
import { getCountdownParts } from "./countdown";

const indiaClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: config.calendar.timezone,
  day: "2-digit", month: "short", year: "numeric",
  hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h23",
});

const navItems = [
  ["Our Wedding", "our-wedding"],
  ["Celebrations", "celebrations"],
  ["Wardrobe", "wardrobe"],
  ["Venue", "venue"],
  ["Contact", "contact"],
] as const;


function Monogram({ className = "" }: { className?: string }) {
  return (
    <img
      className={`monogram ${className}`}
      src={config.monogram}
      srcSet={`${config.monogram.replace('.png', '-480.webp')} 480w, ${config.monogram.replace('.png', '-768.webp')} 768w`}
      sizes={className.includes('nav-') ? '50px' : className.includes('event-') ? '72px' : '(max-width: 600px) 135px, 180px'}
      width={180}
      height={180}
      decoding="async"
      alt="R and K wedding monogram for Rishabh and Khushi"
    />
  );
}

function Invocation({ className = "" }: { className?: string }) {
  return <p className={`invocation ${className}`} lang="sa"><span>॥ श्री गणेशाय नमः ॥</span><span>॥ श्री महावीराय नमः ॥</span></p>;
}

function InvitationOpening({ onOpen }: { onOpen: () => void }) {
  const reducedMotion = useReducedMotion();
  const isPresent = useIsPresent();
  const moveSeal = (event: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion || event.pointerType === "touch" || !isPresent) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--seal-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`);
    event.currentTarget.style.setProperty("--seal-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 12}px`);
  };
  return (
    <m.section
      className="invitation-opening"
      aria-label="Open Rishabh and Khushi’s wedding invitation"
      initial={{ opacity: 1 }}
      exit={{ opacity: reducedMotion ? 0 : [1, 1, 0] }}
      transition={{ duration: reducedMotion ? 0.15 : 1.65, times: [0, 0.9, 1], ease: "easeInOut" }}
      onPointerMove={moveSeal}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--seal-x", "0px");
        event.currentTarget.style.setProperty("--seal-y", "0px");
      }}
    >
      {[-1, 1].map((direction) => (
        <m.div
          key={direction}
          className={`opening-gate ${direction < 0 ? "opening-gate-left" : "opening-gate-right"}`}
          aria-hidden="true"
          exit={reducedMotion ? { opacity: 0 } : { x: `${direction * 104}%` }}
          transition={{ duration: reducedMotion ? 0.15 : 1.15, delay: reducedMotion ? 0 : 0.3, ease: [0.65, 0, 0.2, 1] }}
        />
      ))}
      <m.div className="opening-floral-backdrop" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
      <m.div className="paper-grain" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />
      <m.div className="opening-stationery-frame" aria-hidden="true" exit={{ opacity: 0, scale: reducedMotion ? 1 : 1.04 }} transition={{ duration: 0.45 }} />
      <m.div className="opening-sparkles" aria-hidden="true" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
        {Array.from({ length: 8 }, (_, index) => <i key={index} />)}
      </m.div>
      <div className="opening-welcome">
        <m.div exit={{ opacity: 0, y: reducedMotion ? 0 : -18 }} transition={{ duration: 0.35 }}>
        <Flower2 className="opening-flower" strokeWidth={1} aria-hidden="true" />
        <p className="opening-kicker">A celebration of love &amp; togetherness</p>
        </m.div>
        <h1 className="opening-names">
          <m.span exit={{ opacity: 0, x: reducedMotion ? 0 : -45 }} transition={{ duration: 0.45 }}>{config.couple.first}</m.span>
          <m.button
            type="button"
            className="opening-logo-button focus-ring"
            onClick={onOpen}
            disabled={!isPresent}
            autoFocus
            aria-label="Open Rishabh and Khushi’s wedding invitation"
            whileHover={reducedMotion ? undefined : { scale: 1.09, rotate: -3 }}
            whileTap={reducedMotion ? undefined : { scale: 0.9, rotate: 2 }}
            exit={reducedMotion ? { opacity: 0 } : { scale: [1, 0.92, 1.18], opacity: [1, 1, 0], rotate: [0, -5, 3] }}
            transition={{ duration: reducedMotion ? 0.15 : 0.6 }}
          >
            <span className="opening-logo-glow" aria-hidden="true" />
            <span className="opening-logo-orbit" aria-hidden="true" />
            <img src={config.monogram} srcSet={`${config.monogram.replace('.png', '-480.webp')} 480w, ${config.monogram.replace('.png', '-768.webp')} 768w`} sizes="(max-width: 600px) 120px, 180px" alt="" width={180} height={180} fetchPriority="high" decoding="async" />
            {!reducedMotion && <span className="opening-petal-burst" aria-hidden="true">
              {Array.from({ length: 18 }, (_, index) => (
                <m.i
                  key={index}
                  initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                  exit={{
                    x: Math.cos(index * Math.PI / 9) * (130 + index % 3 * 35),
                    y: Math.sin(index * Math.PI / 9) * (140 + index % 4 * 25),
                    rotate: index * 47,
                    scale: [0.3, 1, 0.7],
                    opacity: [0, 0.95, 0],
                  }}
                  transition={{ duration: 1.2, delay: index * 0.012, ease: "easeOut" }}
                />
              ))}
            </span>}
          </m.button>
          <m.span exit={{ opacity: 0, x: reducedMotion ? 0 : 45 }} transition={{ duration: 0.45 }}>{config.couple.second}</m.span>
        </h1>
        <m.div exit={{ opacity: 0, y: reducedMotion ? 0 : 14 }} transition={{ duration: 0.3 }}>
        <Pointer className="opening-tap-hint" strokeWidth={1.2} aria-hidden="true" />
        <p className="opening-instruction">Tap the monogram</p>
        <p className="opening-whisper">to open our invitation</p>
        <p className="opening-song-note"><Music size={11} aria-hidden="true" /> Opens with Kudmayi</p>
        <div className="opening-date-line"><span />26 November 2026<span /></div>
        <p className="opening-location">Jodhpur</p>
        </m.div>
      </div>
    </m.section>
  );
}


const wardrobeLooks = [
 { title: 'Carnival of Joy', date: '25 November 2026', image: '/assets/wardrobe-carnival.png', his: 'Printed shirts, stylish jackets, kurta sets', her: 'Fusion dresses, shararas, Indo-western co-ords', colors: ['#e5a9b7', '#d95869', '#e4bb60', '#9ba67a'] },
 { title: 'Baraat Welcome & Phere', date: '26 November 2026', image: '/assets/wardrobe-phere.png', his: 'Jacket kurta / sherwani', her: 'Lehenga, traditional Indian attire', colors: ['#e3d4bc', '#b88365', '#843c43', '#c3a36a'] },
];
function Wardrobe() {
 const [selected, setSelected] = useState(0);
 const look = wardrobeLooks[selected];
 return <section className="wardrobe-section" id="wardrobe">
  <SectionHeading eyebrow="A little inspiration for your suitcase">The wardrobe collection</SectionHeading>
  <p className="wardrobe-intro">Dress up in style, celebrate with joy & make memories forever.</p>
  <div className="wardrobe-tabs" role="tablist" aria-label="Wardrobe celebrations">{wardrobeLooks.map((item, index) => <button key={item.title} id={'outfit-tab-' + index} role="tab" aria-selected={selected === index} aria-controls="outfit-panel" tabIndex={selected === index ? 0 : -1} onClick={() => setSelected(index)} onKeyDown={event => { if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) { event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? 1 : 1 - selected; setSelected(next); document.getElementById('outfit-tab-' + next)?.focus(); } }}>{item.title}</button>)}</div>
  <div className="wardrobe-panel" id="outfit-panel" role="tabpanel" aria-labelledby={'outfit-tab-' + selected} tabIndex={0}>
   <img className="wardrobe-art" src={look.image} alt={look.title + ' outfit illustrations from the supplied wardrobe planner'} loading="lazy" width={350} height={620} decoding="async" />
   <div className="wardrobe-copy"><p className="eyebrow">{look.date}</p><h3>{look.title}</h3><div className="wardrobe-rule" /><div className="outfit-detail"><span>FOR HIM</span><p>{look.his}</p></div><div className="outfit-detail"><span>FOR HER</span><p>{look.her}</p></div><div className="wardrobe-palette" aria-label="Suggested colour inspiration">{look.colors.map(color => <span key={color} style={{ backgroundColor: color }} />)}<small>A little colour inspiration</small></div><a className="button focus-ring" href="/assets/wardrobe-planner-mobile.pdf" download>Save the wardrobe planner</a></div>
  </div>
 </section>;
}

function MusicControl({ canPlay, audio }: { canPlay: boolean; audio: React.RefObject<HTMLAudioElement | null> }) {
  const userControlled = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const hasMusic = Boolean(config.optional.musicUrl);

  useEffect(() => {
    const player = audio.current;
    if (!player || !canPlay || !hasMusic) return;
    let disposed = false;
    player.volume = 0.35;

    const removeListeners = () => {
      document.removeEventListener("pointerdown", startOnInteraction, true);
      document.removeEventListener("touchend", startOnInteraction, true);
      document.removeEventListener("keydown", startOnInteraction, true);
      window.removeEventListener("pageshow", tryAutoplay);
    };
    const tryAutoplay = () => {
      if (disposed || userControlled.current) return;
      void player.play().then(() => {
        if (!disposed) removeListeners();
      }).catch(() => {
        // If audible autoplay is blocked, retry on the first interaction.
      });
    };
    const startOnInteraction = (event: Event) => {
      if (userControlled.current) {
        removeListeners();
        return;
      }
      if (event.target instanceof Element && event.target.closest(".music-controls")) return;
      tryAutoplay();
    };

    document.addEventListener("pointerdown", startOnInteraction, true);
    document.addEventListener("touchend", startOnInteraction, true);
    document.addEventListener("keydown", startOnInteraction, true);
    window.addEventListener("pageshow", tryAutoplay);
    tryAutoplay();
    return () => {
      disposed = true;
      removeListeners();
    };
  }, [canPlay, hasMusic, audio]);

  const togglePlay = async () => {
    if (!audio.current || !canPlay || !hasMusic) return;
    userControlled.current = true;
    if (audio.current.paused) {
      try {
        await audio.current.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.current.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="music-controls">
      {hasMusic && (
        <audio
          ref={audio}
          src={config.optional.musicUrl}
          preload="none"
          loop
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onVolumeChange={() => setMuted(Boolean(audio.current?.muted))}
          onError={() => setPlaying(false)}
        />
      )}
      <button
        type="button"
        className="icon-button focus-ring"
        onClick={togglePlay}
        disabled={!hasMusic}
        aria-label={hasMusic ? (playing ? "Pause music" : "Play music") : "Music is not configured"}
        aria-pressed={playing}
        title={playing ? "Pause music" : "Play music"}
      >
        {playing ? <Pause /> : <Music />}
      </button>
      {hasMusic && (
        <button
          type="button"
          className="icon-button focus-ring"
          onClick={() => {
            if (!audio.current) return;
            audio.current.muted = !muted;
            setMuted(!muted);
          }}
          aria-label={muted ? "Unmute music" : "Mute music"}
          aria-pressed={muted}
          title={muted ? "Unmute music" : "Mute music"}
        >
          {muted ? <VolumeX /> : <Volume2 />}
        </button>
      )}
    </div>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  return (
    <nav className="site-nav" aria-label="Invitation navigation">
      <a className="nav-mark focus-ring" href="#our-wedding" aria-label="Rishabh and Khushi, home" onClick={() => setOpen(false)}>
        <Monogram className="nav-monogram" />
      </a>
      <div id="invitation-navigation" className={`nav-links ${open ? "nav-links-open" : ""}`}>
        {navItems.map(([label, id]) => (
          <a key={id} className="focus-ring" href={`#${id}`} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </div>
      <button
        ref={toggle}
        className="nav-toggle focus-ring"
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="invitation-navigation"
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </nav>
  );
}

function Countdown() {
  const target = Date.parse(config.countdownTarget);
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    const update = () => setNow(Date.now());
    const timer = window.setInterval(update, 1000);
    document.addEventListener("visibilitychange", update);
    window.addEventListener("focus", update);
    window.addEventListener("pageshow", update);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", update);
      window.removeEventListener("focus", update);
      window.removeEventListener("pageshow", update);
    };
  }, []);

  if (!Number.isFinite(target)) return null;
  const remaining = getCountdownParts(target, now);
  const values = [
    ["Days", remaining.days],
    ["Hours", remaining.hours],
    ["Minutes", remaining.minutes],
    ["Seconds", remaining.seconds],
  ];
  return (
    <div>
      <p className="countdown-label">{remaining.complete ? "Our wedding day is here!" : "Counting down to our wedding day"}</p>
      <p className="countdown-target"><time dateTime={config.countdownTarget}>26 November 2026 · 12:00 a.m. IST</time></p>
      <div className="countdown" role="timer" aria-label="Time remaining until midnight at the start of 26 November 2026, Indian Standard Time">
        {values.map(([label, value]) => (
          <div key={label}>
            <strong>{String(value).padStart(2, "0")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown-clock">Current time: <time dateTime={new Date(now).toISOString()}>{indiaClock.format(now)} IST</time></p>
    </div>
  );
}

function SectionHeading({ eyebrow, children }: { eyebrow?: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      {eyebrow && <span>{eyebrow}</span>}
      <h2>{children}</h2>
      <div className="botanical-rule" aria-hidden="true">
        <i />
        <Flower2 strokeWidth={1} />
        <i />
      </div>
    </div>
  );
}

function EventLocation({ event, className }: { event: Celebration; className: string }) {
  return (
    <div className={`event-location ${className}`}>
      <span className="event-venue">{event.venue}</span>
      <span className="event-address">{event.address}</span>
      <div className="event-actions">
        <a className="button button-outline focus-ring" href={event.mapUrl} target="_blank" rel="noreferrer">
          <MapPin /> Directions
        </a>
      </div>
    </div>
  );
}

function EventCard({ event, index }: { event: Celebration; index: number }) {
  const reducedMotion = useReducedMotion();
  return (
    <m.article
      id={event.id}
      className={`event-card scene-${event.scene}`}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : index * 0.03 }}
    >
      <div className="event-portrait">
      <img src={event.image} srcSet={`${event.image.replace('.png', '-480.webp')} 480w, ${event.image.replace('.png', '-768.webp')} 768w, ${event.image.replace('.png', '-1024.webp')} 1024w`} sizes="(max-width: 600px) calc(100vw - 44px), 620px" alt="" loading="lazy" decoding="async" width={1024} height={1536} />
      <div className="event-content">
        <span className="event-number">Rishabh &amp; Khushi · Celebration {String(index + 1).padStart(2, "0")}</span>
        <h3>{event.shortName}</h3>
        <p className="event-subtitle">{event.subtitle}</p>
        <div className="event-details">
          <strong>{event.dateLabel}</strong>
          <span>{event.timeLabel}</span>
          {event.additionalTime && <span>{event.additionalTime}</span>}
          {event.phereTime && <span>Phere: {event.phereTime}</span>}
        </div>
        <EventLocation event={event} className="event-location-in-card" />
      </div>
      </div>
      <Monogram className="event-monogram" />
      <EventLocation event={event} className="event-location-mobile" />
      <p className="event-line">{event.supportingLine}</p>
      {event.mealNote && <p className="event-meal-note">{event.mealNote}</p>}
    </m.article>
  );
}

export default function App() {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const invitationHeading = useRef<HTMLHeadingElement>(null);
  const weddingAudio = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (revealed) {
      window.scrollTo({ top: 0, behavior: "instant" });
      invitationHeading.current?.focus({ preventScroll: true });
    }
  }, [revealed]);

  useEffect(() => {
    if (revealed) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const previous = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };
    // Fixed positioning also stops background scrolling in iOS Safari.
    document.body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    return () => {
      Object.assign(body.style, previous);
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [revealed]);

  const openInvitation = () => {
    if (opened) return;
    // Start in the tap handler so mobile browsers retain user activation.
    if (weddingAudio.current) {
      weddingAudio.current.volume = 0.35;
      void weddingAudio.current.play().catch(() => {
        // The music control can retry if playback is unavailable or blocked.
      });
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    setOpened(true);
  };

  const parentsPresent =
    Boolean(config.couple.firstParents) || Boolean(config.couple.secondParents);
  const optionalDetails = Object.entries({
    Travel: config.optional.travel,
    Stay: config.optional.stay,
    Contact: config.optional.contact,
  }).filter(([, value]) => Boolean(value));

  return (
    <>
    <AnimatePresence onExitComplete={() => setRevealed(true)}>
      {!opened && <InvitationOpening key="opening" onOpen={openInvitation} />}
    </AnimatePresence>
    <div className="invitation" inert={!revealed} aria-hidden={!revealed}>
      <Navigation />
      <MusicControl canPlay={opened} audio={weddingAudio} />
      <main>
        <section className="hero" id="our-wedding">
          <div className="paper-grain" />
          <div className="hero-inner">
            <Invocation className="ganesh-invocation" />
            <Monogram className="hero-monogram" />
            <p className="eyebrow">The wedding celebrations of</p>
            <h1 ref={invitationHeading} tabIndex={-1}>
              {config.couple.first}
              <span>&</span>
              {config.couple.second}
            </h1>
            {parentsPresent && (
              <div className="parent-lines">
                {config.couple.firstParents && <p>{config.couple.firstParents}</p>}
                {config.couple.secondParents && <p>{config.couple.secondParents}</p>}
              </div>
            )}
            <div className="hero-date"><time dateTime="2026-11-26">26 November 2026</time><span className="date-divider" aria-hidden="true" /><span>Jodhpur</span></div>
          </div>
        </section>

        <section className="family-section" id="invitation">
          <div className="edge-flower edge-flower-left" aria-hidden="true" />
          <m.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <Invocation className="ganesh-invocation family-invocation" />
            <p className="family-memory">{config.memorialLine}</p>
            <p>{config.invitationLine}</p>
            <div className="invitation-families" aria-label="The couple and their families">
              <div>
                <h2>{config.couple.first}</h2>
                <p>{config.couple.brideParents}</p>
              </div>
              <span className="family-weds">weds</span>
              <div>
                <h2>{config.couple.second}</h2>
                <p>{config.couple.groomGrandparents}</p>
                <p>{config.couple.groomParents}</p>
              </div>
            </div>
            <p className="family-blessing">{config.blessingLine}</p>
            <div className="invitation-regards">
              <div><h3>R.S.V.P.</h3><p>{config.rsvp}</p></div>
              <div><h3>With best wishes from:</h3><p>{config.wishesFrom}</p></div>
            </div>
            <Monogram />
          </m.div>
        </section>

        <section className="countdown-section">
          <SectionHeading eyebrow="Until we celebrate">Our forever begins in</SectionHeading>
          <Countdown />
        </section>

        <section className="celebrations-section" id="celebrations">
          <Monogram className="celebrations-monogram" />
          <Invocation className="programme-invocation" />
          <SectionHeading eyebrow="25–26 November 2026">Five celebrations, a lifetime of love</SectionHeading>
          <div className="events">
            {config.celebrations.map((event, index) => (
              <EventCard key={event.id} event={event} index={index} />
            ))}
          </div>
        </section>

        <Wardrobe />

        <section className="venue-section" id="venue">
          <div className="venue-content">
            <SectionHeading eyebrow="Where we gather for the wedding">The wedding venue</SectionHeading>
            <MapPin className="venue-pin" />
            <h3>{config.venue.name}</h3>
            <p>{config.venue.address}</p>
            <a
              className="button button-solid focus-ring"
              href={config.venue.mapUrl}
              target="_blank"
              rel="noreferrer"
            >
              <MapPin /> Open in Google Maps
            </a>
          </div>
        </section>

        {optionalDetails.length > 0 && (
          <section className="optional-section">
            {optionalDetails.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <p>{value}</p>
              </div>
            ))}
          </section>
        )}

        <footer id="contact">
          <div className="closing-copy">
            <Monogram />
            <span>From:</span>
            <p className="closing-message">
              {config.hosts}
            </p>
            <p>{config.homeAddress}</p>
            <div className="family-contacts">
              <div className="contact-numbers" aria-label="Family contact numbers">
                <span className="contact-label">Contact:</span>
                {config.contacts.map((number, index) => (
                  <span key={number} className="contact-number">
                    {index > 0 && <span className="contact-separator" aria-hidden="true">·</span>}
                    {number.length === 10 ? (
                      <a className="focus-ring" href={`tel:+91${number}`}>{number}</a>
                    ) : number}
                  </span>
                ))}
              </div>
            </div>
            <div className="closing-rule" aria-hidden="true" />
            <p>Our celebration is complete with you.</p>
          </div>
        </footer>
      </main>
    </div>
    </>
  );
}
