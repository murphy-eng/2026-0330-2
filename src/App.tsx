/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Menu, X, Globe, ChevronDown, ChevronRight, 
  Mail, Phone, MapPin, Send, Upload, 
  CheckCircle2, Settings, Zap, Users, ShieldCheck, 
  ArrowUpRight, Clock, Award, TrendingUp, Search
} from 'lucide-react';

// --- Types ---
type Page = 'home' | 'about' | 'solutions' | 'news' | 'quote';

// --- Components ---

const Navbar = ({ activePage, setActivePage }: { activePage: Page, setActivePage: (p: Page) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { label: string, id: Page }[] = [
    { label: 'About Us', id: 'about' },
    { label: 'Solutions', id: 'solutions' },
    { label: 'News', id: 'news' },
    { label: 'Quote', id: 'quote' },
  ];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary py-3 shadow-lg' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div 
          className="cursor-pointer flex items-center gap-2"
          onClick={() => setActivePage('home')}
        >
          <div className="text-white font-bold text-2xl tracking-tighter flex items-baseline">
            <span className="text-3xl">KOIOSLIN</span>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`text-sm font-medium transition-colors nav-link-hover py-1 ${
                activePage === item.id ? 'text-accent' : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="flex items-center gap-2 text-white/80 text-xs border-l border-white/20 pl-6 ml-2">
            <button className="hover:text-accent transition-colors">EN</button>
            <span className="opacity-30">|</span>
            <button className="hover:text-accent transition-colors">日</button>
            <span className="opacity-30">|</span>
            <button className="hover:text-accent transition-colors">中</button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-white text-left text-lg font-medium py-2 border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex gap-4 mt-4">
                <button className="text-white/60">EN</button>
                <button className="text-white/60">日本語</button>
                <button className="text-white/60">中文</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ onQuoteClick }: { onQuoteClick: () => void }) => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-slate-900">
      {/* Background Image with Blue Tint */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/mechanical-gears/1920/1080" 
          alt="Mechanical Background" 
          className="w-full h-full object-cover opacity-50 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-primary/60 mix-blend-multiply" />
      </div>

      {/* Geometric Overlays (Reference Style) */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 -left-20 w-[60%] h-[80%] bg-primary/20 rotate-12 skew-x-12 rounded-[100px] border border-white/10" />
        <div className="absolute -bottom-40 -right-20 w-[50%] h-[70%] bg-accent/5 -rotate-12 -skew-x-12 rounded-[100px] border border-white/5" />
        
        {/* Decorative Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 L100 0" stroke="white" strokeWidth="0.1" fill="none" />
          <path d="M0 80 L80 0" stroke="white" strokeWidth="0.05" fill="none" />
          <path d="M20 100 L100 20" stroke="white" strokeWidth="0.05" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Subtle Glow Effect */}
          <div className="absolute -inset-10 bg-accent/10 blur-3xl rounded-full -z-10" />
          
          <h1 className="text-white text-6xl md:text-8xl font-bold mb-4 tracking-tighter">
            KOIOSLIN
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-6" />
          <p className="text-white text-xl md:text-2xl font-light mb-10 uppercase tracking-[0.3em] opacity-90">
            Your Best Solutions Partner!
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button 
              onClick={onQuoteClick}
              className="group relative bg-accent text-primary font-black py-5 px-12 rounded-sm transition-all overflow-hidden shadow-[0_0_20px_rgba(249,168,37,0.3)]"
            >
              <span className="relative z-10">INQUIRY NOW!</span>
              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
            
            <button className="text-white font-bold flex items-center gap-2 group">
              <span className="border-b border-white/30 group-hover:border-accent transition-colors pb-1">EXPLORE SOLUTIONS</span>
              <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.5em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};

const CoreValues = () => {
  const values = [
    { title: 'Professional', icon: <ShieldCheck size={32} /> },
    { title: 'Multiple Satisfied Solutions', icon: <Settings size={32} /> },
    { title: 'Flexible and Efficiency', icon: <Zap size={32} /> },
    { title: 'High Add Values', icon: <TrendingUp size={32} /> },
    { title: 'Quick Response', icon: <Clock size={32} /> },
    { title: 'Continue Improve', icon: <Users size={32} /> },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-primary to-slate-900 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">KOIOSLIN's Core Value</h2>
          <div className="w-20 h-1 bg-accent mx-auto" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Center Logo Hexagon (Desktop) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-48 h-48 hexagon bg-white flex flex-col items-center justify-center text-primary shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="font-black text-2xl tracking-tighter">KOIOSLIN</span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] mt-1">VALUE</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 md:gap-x-12 lg:gap-x-24">
            {values.map((val, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className={`flex flex-col items-center text-center group ${
                  idx === 1 ? 'lg:mb-32' : idx === 4 ? 'lg:mt-32' : ''
                }`}
              >
                <div className="w-28 h-28 md:w-36 md:h-36 hexagon border border-white/30 bg-white/5 backdrop-blur-sm flex items-center justify-center text-white mb-6 transition-all group-hover:border-accent group-hover:bg-accent/10 group-hover:shadow-[0_0_30px_rgba(249,168,37,0.2)]">
                  <div className="text-accent group-hover:text-white transition-colors">
                    {val.icon}
                  </div>
                </div>
                <h3 className="font-bold text-sm md:text-base text-white leading-tight px-4 max-w-[180px] group-hover:text-accent transition-colors">
                  {val.title}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionsPreview = () => {
  const [activeTab, setActiveTab] = useState('CNC Machining');
  
  const tabs = ['CNC Machining', '3D Printing', 'Injection Molding', 'Metal Parts'];
  const products = [
    { name: 'Sub-Process: CNC Milling', img: 'https://picsum.photos/seed/metal1/400/400' },
    { name: 'Sub-Process: CNC Turning', img: 'https://picsum.photos/seed/metal2/400/400' },
    { name: 'Sub-Process: 5-Axis Milling', img: 'https://picsum.photos/seed/metal3/400/400' },
    { name: 'Sub-Process: EDM', img: 'https://picsum.photos/seed/metal4/400/400' },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-8 border-b border-neutral-border mb-12 justify-center md:justify-start">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold tracking-wider uppercase transition-all relative ${
                activeTab === tab ? 'text-primary' : 'text-slate-400 hover:text-primary'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-1 bg-primary" />
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((prod, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="aspect-square overflow-hidden bg-neutral-bg mb-4 relative">
                <img 
                  src={prod.img} 
                  alt={prod.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors" />
                <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={20} className="text-primary" />
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">• {prod.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setActivePage }: { setActivePage: (p: Page) => void }) => {
  return (
    <footer className="bg-slate-900 text-white">
      {/* Contact Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="bg-neutral-bg text-slate-900 p-12 md:p-20 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Please feel free to contact us.</h2>
          <p className="text-slate-600 mb-8 max-w-md">
            If you have any questions or support, please don't hesitate to reach out to us.
          </p>
          <a href="mailto:Info@koioslininternational.com" className="flex items-center gap-3 text-primary font-bold hover:underline">
            <Mail size={24} />
            Info@koioslininternational.com
          </a>
        </div>
        <div className="bg-primary p-12 md:p-20 flex flex-col justify-center items-center md:items-start">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Contact Us</h2>
          <button 
            onClick={() => setActivePage('quote')}
            className="bg-accent text-primary font-bold py-4 px-12 rounded-sm hover:scale-105 transition-transform shadow-xl"
          >
            Inquiry Now!
          </button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold mb-6 tracking-tighter">KOIOSLIN</h3>
            <div className="space-y-4 text-slate-400 text-sm">
              <div className="flex gap-3">
                <MapPin size={20} className="shrink-0 text-accent" />
                <p>Room 5.9F.No.1,Keji Rd. Dali Dist., Taichung, 412025.Taiwan</p>
              </div>
              <div className="flex gap-3">
                <Mail size={20} className="shrink-0 text-accent" />
                <a href="mailto:Info@koioslininternational.com" className="hover:text-white transition-colors">Info@koioslininternational.com</a>
              </div>
              <div className="flex gap-3">
                <Phone size={20} className="shrink-0 text-accent" />
                <a href="tel:886437048166" className="hover:text-white transition-colors">886-4-37048166</a>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-xs">Quick Links</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><button onClick={() => setActivePage('about')} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setActivePage('solutions')} className="hover:text-white transition-colors">Solutions</button></li>
              <li><button onClick={() => setActivePage('news')} className="hover:text-white transition-colors">News</button></li>
              <li><button onClick={() => setActivePage('quote')} className="hover:text-white transition-colors">Get a Quote</button></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-xs">Solutions</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><button className="hover:text-white transition-colors">Plastic & Rubber Parts</button></li>
              <li><button className="hover:text-white transition-colors">Metal Parts</button></li>
              <li><button className="hover:text-white transition-colors">Tooling Solutions</button></li>
              <li><button className="hover:text-white transition-colors">Electronic Modules</button></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h4 className="font-bold mb-6 text-accent uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-400 text-sm mb-4">Stay updated with our latest news and solutions.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-white/5 border border-white/10 px-4 py-2 text-sm w-full focus:outline-none focus:border-accent"
              />
              <button className="bg-accent text-primary p-2">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2026 KOIOSLIN INTERNATIONAL CO., LTD. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Page Components ---

const HomePage = ({ setActivePage }: { setActivePage: (p: Page) => void }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Hero onQuoteClick={() => setActivePage('quote')} />
    <CoreValues />
    <SolutionsPreview />
  </motion.div>
);

const AboutPage = () => {
  const [activeSubTab, setActiveSubTab] = useState('Philosophy');
  const subTabs = ['Philosophy', 'Company Overview', 'Business Scope', 'History', 'FAQ'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-12">About Us</h1>
        
        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-4 mb-16">
          {subTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                activeSubTab === tab ? 'bg-primary text-white' : 'bg-neutral-bg text-slate-600 hover:bg-neutral-border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {activeSubTab === 'Philosophy' && (
            <>
              <div>
                <h2 className="text-accent font-bold uppercase tracking-widest text-sm mb-4">Our Philosophy</h2>
                <h3 className="text-3xl font-bold text-primary mb-6">With the professional, and thinking of a new era.</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  We believe Koioslin International can do more for our customers.
                  Koioslin International, based in Dali District, Taichung, is an ISO 9001:2015 
                  certified manufacturing partner, recipient of the 27th Rising Star Award (Taiwan 
                  Small and Medium Enterprise Innovation Award), and boasts over a decade of 
                  exceptional operational experience.
                </p>
                <div className="grid grid-cols-2 gap-6 mt-10">
                  <div className="p-6 bg-neutral-bg rounded-sm">
                    <Award className="text-accent mb-4" size={32} />
                    <h4 className="font-bold text-primary mb-2">Rising Star</h4>
                    <p className="text-xs text-slate-500">27th Rising Star Award Winner</p>
                  </div>
                  <div className="p-6 bg-neutral-bg rounded-sm">
                    <ShieldCheck className="text-accent mb-4" size={32} />
                    <h4 className="font-bold text-primary mb-2">ISO Certified</h4>
                    <p className="text-xs text-slate-500">ISO 9001:2015 Standards</p>
                  </div>
                </div>
              </div>
              <div className="rounded-sm overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/office/800/600" 
                  alt="About Koioslin" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </>
          )}

          {activeSubTab === 'Company Overview' && (
            <div className="col-span-2 max-w-4xl mx-auto w-full">
              <div className="bg-white border border-neutral-border shadow-sm">
                {[
                  { label: 'Company Name', value: 'Koioslin International Co., Ltd.' },
                  { label: 'Established', value: 'July 1995' },
                  { label: 'Location', value: 'Room 5.9F.No.1,Keji Rd. Dali Dist., Taichung, 412025.Taiwan' },
                  { label: 'Capital', value: 'NT$ 50,000,000' },
                  { label: 'Employees', value: '120 (As of 2025)' },
                ].map((row, i) => (
                  <div key={i} className={`grid grid-cols-3 p-6 ${i !== 0 ? 'border-t border-neutral-border' : ''}`}>
                    <div className="col-span-1 font-bold text-primary">{row.label}</div>
                    <div className="col-span-2 text-slate-600">{row.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'History' && (
            <div className="col-span-2">
              <div className="relative border-l-2 border-accent ml-4 space-y-12 py-4">
                {[
                  { year: '1995', event: 'Company established in Taichung.' },
                  { year: '2006', event: 'Expansion of manufacturing facilities.' },
                  { year: '2015', event: 'ISO 9001:2015 Certification achieved.' },
                  { year: '2024', event: 'Recipient of the 27th Rising Star Award.' },
                ].map((item, i) => (
                  <div key={i} className="relative pl-10">
                    <div className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-accent border-4 border-white" />
                    <span className="text-accent font-bold text-xl mb-2 block">{item.year}</span>
                    <p className="text-slate-700 font-medium">{item.event}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSubTab === 'FAQ' && (
            <div className="col-span-2 max-w-3xl mx-auto w-full space-y-4">
              {[
                { q: 'How does Koioslin ensure quality and consistency?', a: 'We are ISO-9001 certified, and our in-house team of engineers oversees the process of making sure that each part meets our high quality standards.' },
                { q: 'What industries do you serve?', a: 'We specialize in automotive, medical, and high-precision industrial sectors.' },
                { q: 'What is your typical lead time?', a: 'Lead times vary by process complexity, typically ranging from 2-6 weeks.' },
              ].map((faq, i) => (
                <details key={i} className="group bg-neutral-bg rounded-sm overflow-hidden">
                  <summary className="p-6 font-bold text-primary cursor-pointer flex justify-between items-center list-none">
                    {faq.q}
                    <ChevronDown className="transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="p-6 pt-0 text-slate-600 border-t border-white/50">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const SolutionsPage = () => {
  const categories = [
    { id: 'plastic', title: 'Plastic & Rubber Parts', items: ['Roto Molding', 'Blow Molding', 'Injection Molding', 'Rubber Parts', 'Extrusion Parts', 'Surface Treatment'] },
    { id: 'metal', title: 'Metal Parts', items: ['Aluminum Extrusion', 'Press/Stamping', 'Casting Parts', 'Metal Processing', 'Surface Treatment'] },
    { id: 'tooling', title: 'Tooling', items: ['Plastic Tooling', 'Casting Tooling'] },
    { id: 'electronic', title: 'Electronic', items: ['LED Module', 'PCB'] },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Our Solutions</h1>
        <p className="text-slate-500 max-w-2xl mb-16">Comprehensive manufacturing and engineering solutions tailored to your specific requirements.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-neutral-bg p-8 rounded-sm border border-neutral-border hover:border-accent transition-colors group">
              <h3 className="text-xl font-bold text-primary mb-6 border-b border-accent/30 pb-4">{cat.title}</h3>
              <ul className="space-y-3">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 text-sm hover:text-primary cursor-pointer transition-colors">
                    <ChevronRight size={14} className="text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 text-xs font-bold uppercase tracking-widest text-accent flex items-center gap-2 group-hover:gap-3 transition-all">
                Learn More <ArrowUpRight size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="mt-32">
          <h2 className="text-3xl font-bold text-primary text-center mb-16">Our Order Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {[
              { step: '01', title: 'Upload CAD file', desc: 'Fill out the form and select required services.' },
              { step: '02', title: 'Get Quote with DFM', desc: 'Instant quote and DFM feedback within 24 hours.' },
              { step: '03', title: 'Production', desc: 'Manufacturing with most suitable partners.' },
              { step: '04', title: 'Quality Control', desc: 'Strict inspection to ensure part quality.' },
              { step: '05', title: 'Delivery', desc: '97% of parts ship on time globally.' },
            ].map((p, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-6 text-xl font-bold shadow-lg">
                  {p.step}
                </div>
                <h4 className="font-bold text-primary mb-2">{p.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{p.desc}</p>
                {i < 4 && <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[1px] bg-neutral-border" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NewsPage = () => {
  const news = [
    { date: '2024.10.15', title: 'Receive 27th Rising Star Awards', desc: 'Honored to be recognized with the prestigious 27th Rising Star Award by the government.', img: 'https://picsum.photos/seed/award/600/400' },
    { date: '2024.08.20', title: 'Achieved ISO 9001:2015 Certification', desc: 'Our commitment to quality management systems has been officially certified.', img: 'https://picsum.photos/seed/iso/600/400' },
    { date: '2024.06.01', title: 'Official website of the new on-line', desc: 'We are excited to launch our updated digital presence to better serve our global clients.', img: 'https://picsum.photos/seed/web/600/400' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-16">Latest News</h1>
        
        <div className="space-y-12">
          {news.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-sm">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:col-span-2">
                <span className="text-accent font-bold text-sm mb-2 block">{item.date}</span>
                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{item.title}</h3>
                <p className="text-slate-600 mb-4">{item.desc}</p>
                <button className="text-primary font-bold text-sm flex items-center gap-2">
                  Read more <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const QuotePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-4">Request a Quote</h1>
          <p className="text-slate-500 mb-12">Tell us about your project and we'll get back to you with a detailed proposal within 24 hours.</p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-bg p-8 md:p-12 rounded-sm border border-neutral-border">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Name*</label>
              <input type="text" className="w-full bg-white border border-neutral-border p-3 focus:outline-none focus:border-primary" placeholder="Full Name" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Company</label>
              <input type="text" className="w-full bg-white border border-neutral-border p-3 focus:outline-none focus:border-primary" placeholder="Company Name" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email*</label>
              <input type="email" className="w-full bg-white border border-neutral-border p-3 focus:outline-none focus:border-primary" placeholder="name@company.com" required />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Phone</label>
              <input type="tel" className="w-full bg-white border border-neutral-border p-3 focus:outline-none focus:border-primary" placeholder="(123) 456-7890" />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Project Details</label>
              <textarea rows={5} className="w-full bg-white border border-neutral-border p-3 focus:outline-none focus:border-primary" placeholder="Share more like material preference, annual quantity, surface finish, testing, or other requirements."></textarea>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Upload Files (CAD, PDF, etc.)</label>
              <div className="border-2 border-dashed border-neutral-border bg-white p-10 text-center cursor-pointer hover:border-accent transition-colors group">
                <Upload className="mx-auto text-slate-300 group-hover:text-accent mb-4" size={40} />
                <p className="text-sm text-slate-500">Drag & Drop Files Here or <span className="text-primary font-bold">Browse</span></p>
                <p className="text-[10px] text-slate-400 mt-2">Maximum file size: 20MB. Supported formats: .step, .stp, .pdf, .zip</p>
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end mt-4">
              <button type="submit" className="bg-accent text-primary font-bold py-4 px-12 rounded-sm flex items-center gap-3 hover:scale-105 transition-transform shadow-lg">
                SUBMIT REQUEST <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activePage={activePage} setActivePage={setActivePage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {activePage === 'home' && <HomePage key="home" setActivePage={setActivePage} />}
          {activePage === 'about' && <AboutPage key="about" />}
          {activePage === 'solutions' && <SolutionsPage key="solutions" />}
          {activePage === 'news' && <NewsPage key="news" />}
          {activePage === 'quote' && <QuotePage key="quote" />}
        </AnimatePresence>
      </main>

      <Footer setActivePage={setActivePage} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setActivePage('quote')}
          className="w-14 h-14 bg-accent text-primary rounded-full shadow-2xl flex items-center justify-center"
        >
          <Mail size={24} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center"
        >
          <ArrowUpRight size={24} className="-rotate-45" />
        </motion.button>
      </div>
    </div>
  );
}
