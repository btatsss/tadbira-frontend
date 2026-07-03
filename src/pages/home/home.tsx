import "./home.css";
import { sendContact } from "../../services/contact.service";
import React, { useEffect, useState, useRef } from "react";

function InterestsDropdown({
    selected,
    onChange,
}: {
    selected: string[];
    onChange: (val: string[]) => void;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const options = ["Automation", "Marketing", "Finance", "Consulting"];

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleOption = (option: string) => {
        const alreadySelected = selected.includes(option);
        onChange(
            alreadySelected
                ? selected.filter((item) => item !== option)
                : [...selected, option]
        );
    };

    // بدل عرض كل الاختيارات كنص طويل، بنعرض عدد بس
    const getDisplayText = () => {
        if (selected.length === 0) return "Select options...";
        if (selected.length === 1) return selected[0];
        return `${selected.length} options selected`;
    };

    return (
        <div className="interests-dropdown" ref={dropdownRef}>
            <p className="interests-label">What are you interested in?</p>

            <div
                className={`dropdown-trigger ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={`dropdown-text ${selected.length === 0 ? "placeholder" : ""}`}>
                    {getDisplayText()}
                </span>
                <svg
                    className={`dropdown-arrow ${isOpen ? "rotated" : ""}`}
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                >
                    <path
                        d="M7 10l5 5 5-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>

            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option) => (
                        <label key={option} className="dropdown-item">
                            <input
                                type="checkbox"
                                checked={selected.includes(option)}
                                onChange={() => toggleOption(option)}
                            />
                            <span className="checkbox-custom"></span>
                            <span>{option}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}

function Home() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
        interests: [] as string[],
    });



    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("in");
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll(".card, .project, .member, .section-head, .contact-card")
            .forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // استخدم السيرفس بدل fetch مباشرة، أو سيب الـ fetch لو مفيش سيرفس جاهزة
            const data = await sendContact(formData.name, formData.email, formData.message, formData.interests);
            console.log(data);
            alert("Message sent successfully!");
            setFormData({ name: "", email: "", message: "", interests: [] });
        } catch (err) {
            console.error(err);
            alert("Something went wrong, please try again.");
        }
    };

    return (
        <>
            <header className="nav" id="nav">
                <a className="brand" href="#top" aria-label="Tadbira home">
                    <span className="mark" aria-hidden="true">
                        <svg viewBox="0 0 60 60" width="34" height="34">
                            <rect x="10" y="10" width="40" height="40" transform="rotate(45 30 30)" fill="none" stroke="#d4a651" strokeWidth="1.4" />
                            <g stroke="#d4a651" strokeWidth="2.2" strokeLinecap="round">
                                <line x1="22" y1="36" x2="22" y2="28" />
                                <line x1="27" y1="38" x2="27" y2="24" />
                                <line x1="32" y1="38" x2="32" y2="20" />
                                <line x1="37" y1="38" x2="37" y2="22" />
                            </g>
                        </svg>
                    </span>
                    <span className="wordmark">
                        <span className="title">Tadbira</span>
                        <span className="sub">Consulting &amp; Systems</span>
                    </span>
                </a>
                <nav className="links">
                    <a href="#services">Services</a>
                    <a href="#projects">Projects</a>
                </nav>
            </header>

            <section className="hero" id="top">
                <div className="hero-inner">
                    <div className="eyebrow">
                        <span className="dot"></span>
                        Strategy & Growth Partner
                    </div>
                    <h1>We help ambitious teams <em>plan, build</em> and <em>scale</em>.</h1>
                    <p className="lede">
                        Strategy, capital, marketing and automation — assembled into one focused partner.
                    </p>
                    <div className="hero-cta">
                        <button className="btn primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
                            See our work →
                        </button>
                    </div>
                </div>
                <ul className="hero-meta">
                    <li><strong>120+</strong><span>Projects Delivered</span></li>
                    <li><strong>$50M</strong><span>Capital Raised</span></li>
                    <li><strong>15+</strong><span>Years Experience</span></li>
                </ul>
                <div className="grain"></div>
            </section>

            {/* ===== SERVICES ===== */}
            <section className="section services" id="services">
                <div className="section-head">
                    <span className="section-tag">What We Do</span>
                    <h2>Our Services</h2>
                    <p className="section-lede">
                        End-to-end solutions that transform ideas into market leaders.
                    </p>
                </div>
                <div className="cards">
                    <div className="card">
                        <div className="card-icon marketing">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 20V10M18 20V4M6 20v-4" />
                            </svg>
                        </div>
                        <span className="card-num">01</span>
                        <h3>Marketing</h3>
                        <p>Brand strategy, growth campaigns, and digital presence that converts visitors into loyal customers.</p>
                        <ul>
                            <li>Brand Identity</li>
                            <li>Social Media</li>
                            <li>SEO & Content</li>
                            <li>Paid Advertising</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-icon consulting">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="card-num">02</span>
                        <h3>Business Consulting</h3>
                        <p>Strategic advisory to streamline operations, enter new markets, and maximize profitability.</p>
                        <ul>
                            <li>Market Entry</li>
                            <li>Process Optimization</li>
                            <li>Competitive Analysis</li>
                            <li>Revenue Strategy</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-icon finance">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <span className="card-num">03</span>
                        <h3>Finance Services</h3>
                        <p>Capital raising, financial modeling, and investor relations for sustainable growth.</p>
                        <ul>
                            <li>Fundraising</li>
                            <li>Financial Modeling</li>
                            <li>Investor Decks</li>
                            <li>Due Diligence</li>
                        </ul>
                    </div>
                    <div className="card">
                        <div className="card-icon automation">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="card-num">04</span>
                        <h3>Automation</h3>
                        <p>Workflow automation and AI integration to reduce costs and accelerate delivery.</p>
                        <ul>
                            <li>Workflow Design</li>
                            <li>AI Integration</li>
                            <li>CRM Setup</li>
                            <li>Analytics</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* ===== PROJECTS SLIDER ===== */}
            <section className="section projects" id="projects">
                <div className="section-head">
                    <span className="section-tag">Portfolio</span>
                    <h2>Selected Projects</h2>
                    <p className="section-lede">Real results for real businesses.</p>
                </div>

                <div className="projects-wrapper">
                    <button
                        className="scroll-arrow scroll-arrow-left"
                        onClick={() => {
                            document.querySelector(".project-grid")?.scrollBy({ left: -384, behavior: "smooth" });
                        }}
                    >
                        ←
                    </button>

                    <div className="project-grid">
                        <div className="project">
                            <div className="thumb thumb-meridian"><span>MR</span></div>
                            <div className="meta">
                                <span className="tag">Retail</span>
                                <span className="year">2024</span>
                            </div>
                            <h3>Meridian Retail</h3>
                            <p>Complete brand overhaul and e-commerce growth strategy resulting in 340% revenue increase.</p>
                        </div>
                        <div className="project">
                            <div className="thumb thumb-atlas"><span>AC</span></div>
                            <div className="meta">
                                <span className="tag">Finance</span>
                                <span className="year">2023</span>
                            </div>
                            <h3>Atlas Capital</h3>
                            <p>Strategic consulting and $12M Series A fundraising with full investor relations support.</p>
                        </div>
                        <div className="project">
                            <div className="thumb thumb-nova"><span>NV</span></div>
                            <div className="meta">
                                <span className="tag">Ventures</span>
                                <span className="year">2024</span>
                            </div>
                            <h3>Nova Ventures</h3>
                            <p>Market entry strategy and automation pipeline for a tech startup expanding to MENA region.</p>
                        </div>
                    </div>

                    <button
                        className="scroll-arrow scroll-arrow-right"
                        onClick={() => {
                            document.querySelector(".project-grid")?.scrollBy({ left: 384, behavior: "smooth" });
                        }}
                    >
                        →
                    </button>
                </div>
            </section>
            {/* ===== About US ===== */}
            <section className="About" id="about">
                <div className="section-head">
                    <span className="section-tag">About Us</span>
                    <h2>Building businesses with strategy, execution & innovation.</h2>
                    <p>
                        We provide consulting, marketing, financial services,
                        automation and digital solutions for startups and enterprises.
                        Our mission is helping businesses achieve sustainable growth.
                    </p>

                </div>


            </section>



            {/* ===== CONTACT ===== */}
            <section className="section contact" id="contact">
                <h2>Contact Us</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />

                    <textarea
                        placeholder="Message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                    />

                    <InterestsDropdown
                        selected={formData.interests}
                        onChange={(newInterests) =>
                            setFormData({ ...formData, interests: newInterests })
                        }
                    />

                    <button type="submit">Send Message</button>
                </form>
            </section>

            <footer className="footer">
                <div className="footer-container">
                    <div className="footer-box">
                        <h3>Tadbira</h3>
                        <p>
                            We provide professional consulting, marketing,
                            financial services, automation and digital
                            transformation solutions for businesses.
                        </p>
                    </div>

                    <div className="footer-box">
                        <h3>Quick Links</h3>
                        <a href="#">Home</a>
                        <a href="#about">About</a>
                        <a href="#services">Services</a>
                        <a href="#projects">Projects</a>
                        <a href="#contact">Contact</a>
                    </div>

                    <div className="footer-box">
                        <h3>Contact Info</h3>
                        <p>📍 Cairo, Egypt</p>
                        <p>📞 +20 100 123 4567</p>
                        <p>✉ info@tadbira.com</p>
                    </div>
                </div>

                <div className="copyright">
                    © 2026 Tadbira. All Rights Reserved.
                </div>
                <div className="foot-row">
                    <span className="foot-brand">Tadbira <em>Consulting & Systems</em></span>
                    <span className="foot-meta">© {new Date().getFullYear()} All rights reserved.</span>
                </div>
            </footer>
        </>
    );
}

export default Home;