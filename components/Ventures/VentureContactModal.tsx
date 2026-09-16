"use client";

import { useState, FormEvent } from "react";
import { BH_WHATSAPP_NUMBER, BH_WHATSAPP_DISPLAY } from "@/lib/constants";

interface ServiceContactModalProps {
  serviceTitle: string;
  /** WhatsApp number in international format, digits only, no + or spaces */
  whatsappNumber?: string;
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.031-.967-.273-.1-.472-.148-.672.15-.2.297-.77.967-.944 1.164-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.672-1.612-.92-2.207-.242-.579-.487-.5-.672-.51-.174-.008-.372-.01-.57-.01-.198 0-.521.074-.794.372-.273.297-1.042 1.017-1.042 2.479s1.067 2.876 1.215 3.075c.149.198 2.1 3.205 5.077 4.494.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347Z" />
      <path d="M12.004 2a9.9 9.9 0 0 0-8.48 15.028L2 22l5.116-1.342A9.9 9.9 0 1 0 12.004 2Zm0 17.98a8.08 8.08 0 0 1-4.12-1.13l-.295-.175-3.036.796.81-2.956-.192-.304A8.08 8.08 0 1 1 12.004 19.98Z" />
    </svg>
  );
}

export default function ServiceContactModal({
  serviceTitle,
  whatsappNumber = BH_WHATSAPP_NUMBER,
}: ServiceContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const text = `Hello, I'm ${name}. I'm interested in *${serviceTitle}* at BH Ventures.\n\n${message}${
      phone ? `\n\nMy contact number: ${phone}` : ""
    }`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setIsOpen(false);
    setName("");
    setPhone("");
    setMessage("");
  }

  const directWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hello, I'm interested in *${serviceTitle}* at BH Ventures.`)}`;

  return (
    <>
      <div className="service-detail-cta-group">
        <button type="button" className="service-detail-cta-btn" onClick={() => setIsOpen(true)}>
          Get in touch
        </button>
        <a
          href={directWhatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="service-detail-whatsapp-btn"
          aria-label={`Chat directly about ${serviceTitle} on WhatsApp (${BH_WHATSAPP_DISPLAY})`}
        >
          <WhatsAppIcon className="service-detail-whatsapp-icon" />
          <span>WhatsApp: {BH_WHATSAPP_DISPLAY}</span>
        </a>
      </div>

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

            <div className="service-contact-modal-header">
              <div className="service-contact-modal-badge">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp: {BH_WHATSAPP_DISPLAY}</span>
              </div>
              <h3 className="service-contact-modal-title">Talk to us about {serviceTitle}</h3>
              <p className="service-contact-modal-sub">
                Fill this in and we&apos;ll open WhatsApp with your inquiry ready to send directly to <strong>{BH_WHATSAPP_DISPLAY}</strong>.
              </p>
            </div>

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
                <WhatsAppIcon className="w-4 h-4" />
                <span>Send via WhatsApp</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}