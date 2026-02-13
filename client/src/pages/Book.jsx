import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/Books.css";
import NavBar from "../components/NavBar";
import BookGrid from "../components/BookGrid";

const CATEGORIES = ["All", "Thriller", "Self Help"]; 

const BOOKS = [
  { title: "Never Lie", author: "Freida McFadden", category: "Thriller", icon: "/images/neverlie.jpeg",
    description: "Newlyweds take refuge in a remote house and uncover disturbing secrets left behind." },
  { title: "The Locked Door", author: "Freida McFadden", category: "Thriller", icon: "/images/lockeddoor.jpeg",
    description: "A surgeon with a dark family history faces a fresh wave of copycat crimes." },
  { title: "Verity", author: "Colleen Hoover", category: "Thriller", icon: "/images/verity.jpeg",
    description: "A writer finds a hidden manuscript that twists truth, obsession, and danger." },
  { title: "The Housemaid", author: "Freida McFadden", category: "Thriller", icon: "/images/housemaid.jpeg",
    description: "A live-in job with strict rules, a locked room, and a picture-perfect life that isn’t." },
  { title: "The Housemaid’s Secret", author: "Freida McFadden", category: "Thriller", icon: "/images/housemaid2.jpeg",
    description: "A dream position hides a locked bedroom and a secret nobody wants exposed." },
  { title: "The Teacher", author: "Freida McFadden", category: "Thriller", icon: "/images/teacher.jpeg",
    description: "A new teacher and her students—each with something explosive to hide." },
  { title: "The Inmate", author: "Freida McFadden", category: "Thriller", icon: "/images/inmate.jpeg",
    description: "A nurse starts work at a men’s prison—where an old flame may be the real danger." },
  { title: "One by One", author: "Ruth Ware", category: "Thriller", icon: "/images/onebyone.jpeg",
    description: "A snowed-in chalet, a corporate retreat, and guests who start disappearing." },
  { title: "The Wrong Sister", author: "Claire Douglas", category: "Thriller", icon: "/images/wrongsister.jpeg",
    description: "One sister missing, shifting identities, and secrets that fracture trust." },
  { title: "The Silent Patient", author: "Alex Michaelides", category: "Thriller", icon: "/images/SilentPatient.jpeg",
    description: "After a shocking crime, a famous painter stops speaking—why?" },
  { title: "The Newcomer", author: "Mary Kay Andrews", category: "Thriller", icon: "/images/newcomer.jpeg",
    description: "On the run after finding a body, she hides at a Florida beach motel—but trouble follows." },
  { title: "The Alchemist", author: "Paulo Coelho", category: "Self Help", icon: "/images/alchemist.jpeg",
    description: "A shepherd follows a dream across the desert to discover his Personal Legend." },
  { title: "Maktub", author: "Paulo Coelho", category: "Self Help", icon: "/images/maktub.jpeg",
    description: "Short reflections and parables on fate, choice, and everyday wisdom." },
  { title: "The Secret", author: "Rhonda Byrne", category: "Self Help", icon: "/images/secret.jpeg",
    description: "A guide to the law of attraction—focused thought and gratitude to shape outcomes." },
  { title: "The Magic", author: "Rhonda Byrne", category: "Self Help", icon: "/images/magic.jpeg",
    description: "A 28-day gratitude practice to reset your mindset and daily habits." },
  { title: "The Courage to Be Disliked", author: "Ichiro Kishimi & Fumitake Koga", category: "Self Help", icon: "/images/courage-disliked.jpeg",
    description: "A dialogue on Adlerian psychology: choose freedom, accept responsibility, live without others’ approval." },
];

// util
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-"); // "Self Help" -> "self-help"

function Book() {

  const [params, setParams] = useSearchParams();
  const catFromURL = params.get("cat"); // e.g. "thriller" or "self-help"

  // pick active category from URL or default to "All"
  const active = useMemo(() => {
    if (!catFromURL) return "All";
    const match = CATEGORIES.find((c) => slug(c) === catFromURL);
    return match || "All";
  }, [catFromURL]);

  // change active + update URL
  const setActive = (next) => {
    if (next === "All") {
      params.delete("cat");
      setParams(params, { replace: true });
    } else {
      setParams({ cat: slug(next) }, { replace: true });
    }
  };

  // filter books
  const filtered = useMemo(() => {
    if (active === "All") return BOOKS;
    return BOOKS.filter((b) => b.category === active);
  }, [active]);

  return (
    <div className="homepage">
      <NavBar />

      <nav aria-label="Book categories" className="catbar">
        {CATEGORIES.map((c) => {
          const isActive = c === active;
          return (
            <button
              key={c}
              type="button"
              className={`catpill ${isActive ? "catpill--active" : ""}`}
              aria-current={isActive ? "page" : undefined}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          );
        })}
      </nav>

      <div className="books-grid">
        {filtered.length === 0 && (
          <div className="empty-state">No books in this category (yet!).</div>
        )}
        {filtered.map((b) => (
          <BookGrid
            key={b.title}
            icon={b.icon}
            title={b.title}
            author={b.author}
            description={b.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Book;
