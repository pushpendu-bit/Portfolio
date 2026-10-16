/* React part of the portfolio. Uses React.createElement so no build tools are needed. */
const h = React.createElement;
const { useState, useEffect, useRef } = React;

/* ===== Your details: edit here ===== */
const DATA = {
    first: "Pushpendu",
    last: "Ghosh",
    tag: "Computer Science · Data Science",
    lead: "I'm a Computer Science (Data Science) student at Heritage Institute of Technology, Kolkata.",
    college: "Heritage Institute of Technology, Kolkata",
    cgpa: "8.86",
    about:
        "I'm a Computer Science (Data Science) student who likes turning ideas into working programs. I started with C and C++, moved on to data structures and algorithms, and now build for the web with HTML, CSS, JavaScript and React. Away from the screen, I draw.",
    github: "https://github.com/pushpendu-bit", 
    linkedin: "https://www.linkedin.com/in/Pushpendu-ghosh83",
    email: "ghoshn2026@gmail.com"
};

/* Link helpers: add https:// if missing, and open Gmail compose for the email button */
const fixUrl = (u) => (u ? (/^(https?:\/\/|mailto:)/i.test(u.trim()) ? u.trim() : "https://" + u.trim().replace(/^\/+/, "")) : "");
const mailHref = (e) => (e ? "https://mail.google.com/mail/?view=cm&fs=1&to=" + encodeURIComponent(e.trim()) : "");

const REACT_ICON = h("svg", { viewBox: "-12 -12 24 24", "aria-hidden": true },
    h("g", { fill: "none", stroke: "#fff", strokeWidth: 1.2 },
        h("ellipse", { rx: 10, ry: 4 }),
        h("ellipse", { rx: 10, ry: 4, transform: "rotate(60)" }),
        h("ellipse", { rx: 10, ry: 4, transform: "rotate(120)" })),
    h("circle", { r: 1.9, fill: "#fff" }));

const SKILLS = [
    { n: "C++", c: "#00599C", i: "C++" },
    { n: "C", c: "#5C6BC0", i: "C" },
    { n: "HTML", c: "#E44D26", i: "</>" },
    { n: "CSS", c: "#1572B6", i: "{ }" },
    { n: "JavaScript", c: "#C9A400", i: "JS" },
    { n: "React", c: "#087EA4", i: REACT_ICON },
    { n: "Git", c: "#E0482B", i: "Git" },
    { n: "GitHub", c: "#24292F", i: "GH" },
    { n: "Linux", c: "#3B3F46", i: ">_" }
];

const TIMELINE = [
    ["B.Tech, CSE (Data Science)", DATA.college, "Completed first year with an overall CGPA of " + DATA.cgpa + "."],
    ["Hackathon", "First year", "Took part in a hackathon at college."],
    ["Higher Secondary (12th), Science", "Bandipur High School", "Scored 86%."],
    ["Secondary (10th)", "Bandipur High School", "Scored 76%."]
];

const SECTIONS = [["home", "Home"], ["about", "About"], ["skills", "Skills"], ["projects", "Projects"], ["education", "Education"], ["contact", "Contact"]];

/* ===== Components ===== */
function Nav({ active }) {
    const GH = h("svg", { viewBox: "0 0 24 24", "aria-hidden": true }, h("path", { d: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 12 2z" }));
    const MAIL = h("svg", { viewBox: "0 0 24 24", "aria-hidden": true }, h("path", { d: "M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1.5 2.2V17h15V7.2l-7.5 5.3-7.500-5.300z" }));
    const soc = [["GitHub", fixUrl(DATA.github), GH], ["LinkedIn", fixUrl(DATA.linkedin), "in"], ["Email", mailHref(DATA.email), MAIL]].filter((x) => x[1]);
    return h("header", { className: "bar" }, h("div", { className: "wrap" },
        h("nav", { className: "links", "aria-label": "Sections" },
            SECTIONS.map(([id, label]) => h("a", { key: id, href: "#" + id, className: active === id ? "on" : "" }, label))),
        h("div", { className: "soc" }, soc.map(([n, u, ic]) => h("a", { key: n, href: u, target: "_blank", rel: "noopener noreferrer", "aria-label": n }, ic)))));
}

function Heading({ small, children }) {
    return h("div", { className: "head" }, h("small", null, small), h("h2", null, children));
}

function Hero() {
    const cv = useRef(null);
    useEffect(() => initScene(cv.current), []);
    return h("section", { id: "home", className: "hero-sec" },
        h("canvas", { ref: cv, className: "hero-cv", "aria-hidden": true }),
        h("div", { className: "wrap" }, h("div", { className: "hero" },
            h("h1", null, "Hi, I'm " + DATA.first + "."),
            h("p", { className: "lead" }, DATA.lead),
            h("div", { className: "btns" },
                h("a", { className: "btn", href: "#skills" }, "View skills"),
                h("a", { className: "btn", href: "#contact" }, "Get in touch")))));
}

function About() {
    return h("section", { id: "about", className: "section" }, h("div", { className: "wrap" },
        h(Heading, { small: "Who I am" }, "About me"),
        h("div", { className: "about" },
            h("div", { className: "card" }, h("p", null, DATA.about)),
            h("div", { className: "stats" },
                h("div", { className: "card stat" }, h("b", null, DATA.cgpa), h("span", null, "CGPA after first year")),
                h("div", { className: "card stat" }, h("b", null, "86%"), h("span", null, "12th grade, Science"))))));
}

function SkillCard({ s }) {
    const ref = useRef(null);
    const move = (e) => {
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.setProperty("--ry", x * 14 + "deg");
        ref.current.style.setProperty("--rx", -y * 14 + "deg");
    };
    const leave = () => { ref.current.style.setProperty("--rx", "0deg"); ref.current.style.setProperty("--ry", "0deg"); };
    return h("li", { className: "card skill", ref, onPointerMove: move, onPointerLeave: leave },
        h("i", { style: { background: s.c }, "aria-hidden": true }, s.i), h("span", null, s.n));
}

function Skills() {
    return h("section", { id: "skills", className: "section" }, h("div", { className: "wrap" },
        h(Heading, { small: "What I work with" }, "Skills"),
        h("ul", { className: "skills" }, SKILLS.map((s) => h(SkillCard, { key: s.n, s }))),
        h("p", { className: "learn" }, "Currently learning: strings, plus more data structures and algorithms.")));
}

function Projects() {
    return h("section", { id: "projects", className: "section" }, h("div", { className: "wrap" },
        h(Heading, { small: "My work" }, "Projects"),
        h("div", { className: "card empty" },
            h("b", null, "Projects coming soon"),
            h("p", null, "Nothing here yet. Your first project will appear in this space."))));
}

function Education() {
    return h("section", { id: "education", className: "section" }, h("div", { className: "wrap" },
        h(Heading, { small: "My journey" }, "Education & experience"),
        h("ul", { className: "tl" }, TIMELINE.map(([t, s, d]) =>
            h("li", { key: t }, h("div", { className: "card" }, h("h3", null, t), h("small", null, s), h("p", null, d)))))));
}

function Contact() {
    const links = [["GitHub", fixUrl(DATA.github)], ["LinkedIn", fixUrl(DATA.linkedin)], ["Email", mailHref(DATA.email)]].filter((l) => l[1]);
    return h("section", { id: "contact", className: "section" }, h("div", { className: "wrap" },
        h("div", { className: "card contact" },
            h(Heading, { small: "Get in touch" }, "Let's work together"),
            h("p", null, "Interested in a project, an internship, or just want to say hello? Reach out."),
            h("div", { className: "btns" }, links.map(([n, u], i) =>
                h("a", { key: n, className: i === 0 ? "btn main" : "btn", href: u, target: "_blank", rel: "noopener noreferrer" }, n))))));
}

function App() {
    const [active, setActive] = useState("home");
    useEffect(() => {
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" });
        document.querySelectorAll("section").forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, [])
    return h(React.Fragment, null,
        h(Nav, { active }),
        h("main", null, h(Hero), h(About), h(Skills), h(Projects), h(Education), h(Contact)),
        h("footer", null, "© " + new Date().getFullYear() + " Pushpendu Ghosh"));
}

ReactDOM.createRoot(document.getElementById("root")).render(h(App));