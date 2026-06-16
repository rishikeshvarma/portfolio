import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCode, FiBriefcase, FiAward, FiFolder, FiMapPin, FiChevronLeft, FiChevronRight, FiGithub, FiLinkedin, FiMail, FiBookOpen, FiShield, FiExternalLink } from 'react-icons/fi';

export default function Portfolio() {
  const [data, setData] = useState(null);
  const [activeProject, setActiveProject] = useState(0);

  useEffect(() => {
    fetch('/data.json')
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("Error reading portfolio metrics:", err));
  }, []);

  if (!data) {
    return (
      <div className="h-screen w-screen bg-[#0A0A0A] flex items-center justify-center text-zinc-500 font-mono tracking-widest text-xs">
        INITIALIZING_CORE_DATA_STREAM...
      </div>
    );
  }

  // Fallback programmatic handler if browser intercepts inline mailto execution blocks
  const handleEmailRedirect = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${data.profile.email}`;
  };

  return (
    <div className="min-h-screen bg-[#070708] text-zinc-100 font-sans antialiased selection:bg-white selection:text-black w-full overflow-x-hidden">
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#111113_1px,transparent_1px),linear-gradient(to_bottom,#111113_1px,transparent_1px)] bg-[size:5rem_5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)] pointer-events-none z-0" />

      <div className="relative w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 py-12 z-10 space-y-24">

        {/* Profile Card & Header Node */}
        <header className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-12">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group shrink-0">
              <img
                src={data.profile.avatarUrl}
                alt={data.profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-500 scale-105 group-hover:scale-100"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800/80 bg-zinc-950 text-[11px] font-mono tracking-wider text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ACTIVE_SYSTEM_ONLINE
              </div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">{data.profile.name}</h1>
              <p className="text-md sm:text-lg font-medium text-zinc-400 tracking-wide">{data.profile.title}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-500 font-mono">
                <span className="flex items-center gap-1"><FiMapPin /> {data.profile.location}</span>
                <span>•</span>
                <span className="text-zinc-400">Learning German (A1)</span>
              </div>
            </div>
          </motion.div>

          {/* Social Gateways */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex flex-wrap gap-3 w-full md:w-auto">
            <a href={data.profile.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-sm font-medium tracking-wide transition-all w-full sm:w-auto">
              <FiGithub /> GitHub
            </a>
            <a href={data.profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-sm font-medium tracking-wide transition-all w-full sm:w-auto">
              <FiLinkedin /> LinkedIn
            </a>
            <button onClick={handleEmailRedirect}>
              <a
                href={"mailto:" + data.profile.email}
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-800 text-sm font-medium tracking-wide transition-all w-full sm:w-auto"
              >
                <FiMail /> Contact
              </a>
            </button>
          </motion.div>
        </header>

        {/* Bio */}
        <section className="w-full flex justify-center text-center">
          <p className="text-xl sm:text-2xl text-zinc-400 leading-relaxed max-w-4xl font-normal">
            {data.profile.bio}
          </p>
        </section>

        {/* Dynamic Project Slider Architecture */}
        <section className="w-full space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white">
              <FiFolder className="text-zinc-500" /> Key Engineering Architectures
            </h2>
            <div className="flex gap-2">
              <button onClick={() => setActiveProject((prev) => (prev - 1 + data.projects.length) % data.projects.length)} className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition">
                <FiChevronLeft size={18} />
              </button>
              <button onClick={() => setActiveProject((prev) => (prev + 1) % data.projects.length)} className="p-2.5 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 text-zinc-400 hover:text-white transition">
                <FiChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative min-h-[400px] sm:min-h-[300px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 sm:p-8 rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900/40 via-zinc-900/10 to-transparent backdrop-blur-md flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{data.projects[activeProject].title}</h3>
                      <p className="text-xs font-mono text-zinc-500">{data.projects[activeProject].subtitle}</p>
                    </div>

                    {/* Inline Conditional Links Generation Engine */}
                    <div className="flex items-center gap-3 shrink-0">
                      {data.projects[activeProject].links?.github && (
                        <a href={data.projects[activeProject].links.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800 transition">
                          <FiGithub size={14} /> Repository
                        </a>
                      )}
                      {data.projects[activeProject].links?.live && (
                        <a href={data.projects[activeProject].links.live} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 bg-zinc-950 px-3 py-1.5 rounded-md border border-zinc-800 transition">
                          <FiExternalLink size={14} /> Live Deployment
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-5xl">{data.projects[activeProject].description}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-900/60">
                  <div className="flex flex-wrap gap-1.5">
                    {data.projects[activeProject].tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-zinc-400 bg-zinc-950/60 px-2.5 py-1 rounded border border-zinc-800/60">{tag}</span>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">{data.projects[activeProject].metrics}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* Capabilities & Interactive Intellectual Property Link Framework */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 w-full">
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white"><FiCode className="text-zinc-500" /> Capabilities Engine</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(data.skills).map(([category, list], idx) => (
                <div key={idx} className="p-5 rounded-xl border border-zinc-900/60 bg-zinc-900/10 space-y-3">
                  <h3 className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{category}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {list.map((skill, i) => <span key={i} className="text-xs text-zinc-300 bg-zinc-900/60 border border-zinc-800/80 px-2 py-0.5 rounded">{skill}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Publications Nodes */}
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white"><FiShield className="text-zinc-500" /> IP & Publications</h2>
            <div className="space-y-4">
              {data.publications.map((pub, idx) => (
                <a
                  key={idx}
                  href={pub.url}
                  target="_blank"
                  rel="noreferrer"
                  className="block p-5 rounded-xl border border-zinc-900/60 bg-zinc-900/10 hover:border-zinc-700/80 hover:bg-zinc-900/20 transition-all duration-300 group space-y-2 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase bg-zinc-950 px-2 py-0.5 rounded border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                      {pub.type}
                    </span>
                    <FiExternalLink size={12} className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors leading-snug">{pub.title}</h4>
                  <p className="text-[11px] font-mono text-zinc-500">{pub.meta}</p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Tracking Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white"><FiBriefcase className="text-zinc-500" /> Professional Track</h2>
            <div className="space-y-8 border-l border-zinc-800 pl-4 ml-2">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative space-y-2">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="text-base font-bold text-zinc-100">{exp.role}</h3>
                      <p className="text-xs text-zinc-400">{exp.company} • <span className="text-zinc-500 italic">{exp.type}</span></p>
                    </div>
                    <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-400 list-disc list-inside pt-2">
                    {exp.highlights.map((h, i) => <li key={i} className="leading-relaxed">{h}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white"><FiBookOpen className="text-zinc-500" /> Academic Matrix</h2>
            <div className="space-y-6">
              {data.education.map((edu, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-zinc-900/60 bg-zinc-900/10 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-zinc-200">{edu.institution}</h3>
                    <p className="text-xs text-zinc-400">{edu.degree}</p>
                    <p className="text-xs font-mono text-emerald-400/90 pt-1">{edu.score}</p>
                  </div>
                  <span className="text-xs font-mono text-zinc-500 shrink-0">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Global Honors Footer */}
        <section className="w-full space-y-6 border-t border-zinc-900 pt-12">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2.5 text-white"><FiAward className="text-zinc-500" /> Performance Benchmarks & Honors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.achievements.map((ach, idx) => (
              <div key={idx} className="p-5 rounded-xl border border-zinc-900 bg-zinc-900/5 space-y-1">
                <h4 className="text-sm font-bold text-zinc-200">{ach.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{ach.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}