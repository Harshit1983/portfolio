'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone, Code2, BookOpen, Trophy } from 'lucide-react';

const CURRENTLY_LEARNING = ['Machine Learning', 'Data Structures', 'C++', 'Python'];

export default function About() {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetch('/api/settings').then((r) => r.json()).then(setSettings).catch(() => { });
    }, []);

    const stats = [
        { icon: Code2, label: 'Projects Built', value: '10+' },
        { icon: Trophy, label: 'Certificates', value: '15+' },
        { icon: BookOpen, label: 'LeetCode Problems', value: '100+' },
    ];

    return (
        <section id="about" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 1.5rem' }}>
                {/* Section heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <p style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Who I Am</p>
                    <h2 className="heading-lg">About <span className="gradient-text">Me</span></h2>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                    {/* Profile card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6 }}
                        style={{ textAlign: 'center' }}
                    >
                        {/* Photo */}
                        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1.5rem' }}>
                            <div style={{
                                width: 200, height: 200, borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-violet))',
                                padding: 3, margin: '0 auto',
                            }}>
                                <div style={{
                                    width: '100%', height: '100%', borderRadius: '50%',
                                    background: settings?.profilePhoto ? 'transparent' : 'var(--bg-tertiary)',
                                    overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '3rem', fontWeight: 800, color: 'var(--accent-cyan)',
                                    fontFamily: 'var(--font-heading)',
                                }}>
                                    {settings?.profilePhoto
                                        ? <img src={settings.profilePhoto} alt="Harshit Pandiyar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                        : 'HP'
                                    }
                                </div>
                            </div>
                            {/* Availability dot */}
                            <div style={{
                                position: 'absolute', bottom: 8, right: 8,
                                width: 20, height: 20, borderRadius: '50%',
                                background: '#22c55e',
                                border: '3px solid var(--bg-secondary)',
                                boxShadow: '0 0 0 3px rgba(34, 197, 94, 0.3)',
                            }} />
                        </div>

                        {/* Quick info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {[
                                { icon: MapPin, text: settings?.location || 'Madhya Pradesh, India' },
                                { icon: Mail, text: settings?.email || 'harshitpandiyar1983@gmail.com' },
                                { icon: Phone, text: settings?.phone || '+91 9009039343' },
                            ].map(({ icon: Icon, text }) => (
                                <div key={text} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                                    <Icon size={15} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
                                    {text}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h3 className="heading-md" style={{ marginBottom: '1rem' }}>Software Engineer</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                            {settings?.bio || `I'm Harshit Pandiyar, a Computer Science Engineering student at Lovely Professional University, Punjab. 
              I build machine learning models and software applications to solve real problems.`}
                        </p>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.95rem' }}>
                            Beyond coding, I'm passionate about DSA, competitive programming, and machine learning.
                        </p>

                        {/* Currently learning */}
                        <div style={{ marginBottom: '2rem' }}>
                            <p style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>Currently Learning</p>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {CURRENTLY_LEARNING.map((tag) => (
                                    <span key={tag} style={{
                                        padding: '0.35rem 0.875rem',
                                        background: 'var(--accent-glow-cyan)',
                                        border: '1px solid rgba(34, 211, 238, 0.2)',
                                        borderRadius: '999px', fontSize: '0.8rem',
                                        color: 'var(--accent-cyan)', fontWeight: 500,
                                    }}>{tag}</span>
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                            {stats.map(({ icon: Icon, label, value }, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                    className="card-base"
                                    style={{ padding: '1rem', textAlign: 'center' }}
                                >
                                    <Icon size={20} style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem' }} />
                                    <p style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-heading)' }}>{value}</p>
                                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>{label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
