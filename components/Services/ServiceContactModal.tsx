"use client";

import { useState, FormEvent } from "react";

interface ServiceContactModalProps {
  serviceTitle: string;
  /** WhatsApp number in international format, digits only, no + or spaces */
  whatsappNumber?: string;
}

export default function ServiceContactModal({
  serviceTitle,
  whatsappNumber = "971500000000", // TODO: replace with your real WhatsApp number
}: ServiceContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const text = `Hello, I'm ${name}. I'm interested in *${serviceTitle}*.\n\n${message}${
      phone ? `\n\nMy contact number: ${phone}` : ""
    }`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsOpen(false);
    setName("");
    setPhone("");
    setMessage("");
  }

  return (
    <>
      <button type="button" className="service-detail-cta-btn" onClick={() => setIsOpen(true)}>
        Get in touch
      </button>

      {isOpen && (
        <div className="service-contact-overlay" onClick={() => setIsOpen(false)}>
          <div className="service-contact-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="service-contact-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <h3 className="service-contact-modal-title">Talk to us about {serviceTitle}</h3>
            <p className="service-contact-modal-sub">
              Fill this in and we&apos;ll open WhatsApp with your message ready to send.
            </p>

            <form className="service-contact-form" onSubmit={handleSubmit}>
              <label className="service-contact-field">
                <span>Name</span>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>

              <label className="service-contact-field">
                <span>Phone (optional)</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+971 5X XXX XXXX"
                />
              </label>

              <label className="service-contact-field">
                <span>Message</span>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you need..."
                />
              </label>

              <button type="submit" className="service-contact-submit">
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}