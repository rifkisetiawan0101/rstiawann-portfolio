'use client';

import React, { useState, FormEvent } from 'react';
import axios from 'axios';
import SectionTitle from '@/components/ui/SectionTitle';
import { Contact } from 'lucide-react';

const Contacts = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: null as string | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: null });

        try {
            await axios.post('/api/contact', formData);
            setStatus({ loading: false, success: true, error: null });
            setFormData({ name: '', email: '', message: '' });
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || 'Failed to send message. Please try again.';
            setStatus({ loading: false, success: false, error: errorMessage });
        }
    };

    return (
        <section id="contact" className="py-20 bg-slate-900/30">
            <SectionTitle 
                title="Contact Me" 
                subtitle={
                    <>
                        I am currently looking for internship opportunities and am open to new challenges.
                        <br />
                        If you have any questions or just want to say hello, my inbox is always open.
                    </>
                } 
            />
            
            <div className="max-w-2xl mx-auto px-4">
                <form onSubmit={handleSubmit} className="text-left space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-slate-300">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            rows={4}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Yes, your message will be handled by my custom API and delivered to my inbox..."
                            className="mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder:text-slate-500"
                        ></textarea>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            disabled={status.loading}
                            className="w-full md:w-auto bg-indigo-600 text-white font-semibold px-8 py-3 rounded-md hover:bg-indigo-700 transition-all transform hover:scale-105 inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status.loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>

                <div className="text-center mt-4 h-6">
                    {status.success && <p className="text-green-400">Your message has been sent successfully!</p>}
                    {status.error && <p className="text-red-400">{status.error}</p>}
                </div>
            </div>
        </section>
    );
};

export default Contacts;
