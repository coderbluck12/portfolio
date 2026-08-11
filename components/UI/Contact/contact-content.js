"use client";
import Link from "next/link";
import { useState } from "react";
import MsgSentSuccessfully from "./msg-sent-successfully";

const ContactContent = () => {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: false });

  const handleChange = (event) => {
    const targetName = event.target.name;
    setFormData({ ...formData, [targetName]: event.target.value });
  };

  const handleValidation = () => {
    const errors = {};

    if (formData.name === "") {
      errors.name = "Name is required";
    }

    if (formData.email === "") {
      errors.email = "Email is required";
    } else if (formData.email.substring(formData.email.indexOf("@") + 1, formData.email.length) < 1) {
      errors.email = "Invalid email";
    }

    if (formData.content === "") {
      errors.content = "Message content is required";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ ...status, loading: true, success: false });

    const gottenErrors = handleValidation();
    setErrors(gottenErrors);

    if (Object.keys(gottenErrors).length >= 1) setStatus({ ...status, loading: false, success: false });
    if (Object.keys(gottenErrors).length === 0) {
      const body = { name: formData.name, email: formData.email, content: formData.content };

      const res = await fetch("/api/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        setStatus({ ...status, loading: false, success: false });
        console.log("There is a problem...");
        return;
      }

      setStatus({ ...status, loading: false, success: true });
      setErrors({});
      setFormData({ name: "", email: "", content: "" });
      setTimeout(() => setStatus({ ...status, loading: false, success: false }), 3000);
    }
  };

  return (
    <>
      <div className="container mx-auto my-16 section pt-20">
        <div className="mb-12">
          <span className="text-xs uppercase tracking-widest text-primary font-bold">Get In Touch</span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-1">
            Contact Me<span className="text-primary">.</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
              <h2 className="text-xl font-bold text-white mb-3">Dev Handles</h2>
              <ul className="space-y-3">
                <li className="text-base text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="ri-github-fill text-xl text-primary"></i> GitHub
                  </span>
                  <Link target="_blank" href={"https://github.com/coderbluck12"}>
                    <span className="font-semibold text-primary hover:underline">coderbluck12</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
              <h2 className="text-xl font-bold text-white mb-3">Social Connections</h2>
              <ul className="space-y-3">
                <li className="text-base text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="ri-facebook-circle-fill text-xl text-primary"></i> Facebook
                  </span>
                  <Link target="_blank" href={"https://web.facebook.com/oyenolaphilip"}>
                    <span className="font-semibold text-primary hover:underline">Philip Oyenola</span>
                  </Link>
                </li>
                <li className="text-base text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="ri-instagram-fill text-xl text-primary"></i> Instagram
                  </span>
                  <Link target="_blank" href={"https://www.instagram.com/philipoyenola/"}>
                    <span className="font-semibold text-primary hover:underline">@philipoyenola</span>
                  </Link>
                </li>
                <li className="text-base text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="ri-twitter-fill text-xl text-primary"></i> Twitter / X
                  </span>
                  <Link target="_blank" href={"https://twitter.com/oyenolaayomi"}>
                    <span className="font-semibold text-primary hover:underline">@oyenolaayomi</span>
                  </Link>
                </li>
                <li className="text-base text-slate-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <i className="ri-whatsapp-fill text-xl text-primary"></i> WhatsApp
                  </span>
                  <Link target="_blank" href={"https://wa.me/+2349117996123"}>
                    <span className="font-semibold text-primary hover:underline">+234 (91) 1799 6123</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Send Me A Message</h3>
            <form onSubmit={(event) => handleSubmit(event)}>
              <div className="space-y-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-semibold text-slate-300">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className={`block w-full bg-white/[0.04] border outline-none rounded-xl px-4 py-3 text-white transition-all ${
                      errors.name ? "border-red-500" : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                    autoComplete="off"
                    value={formData.name}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.name && <p className="text-xs font-semibold text-red-500">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-300">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className={`block w-full bg-white/[0.04] border outline-none rounded-xl px-4 py-3 text-white transition-all ${
                      errors.email ? "border-red-500" : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                    autoComplete="off"
                    value={formData.email}
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.email && <p className="text-xs font-semibold text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="content" className="text-sm font-semibold text-slate-300">
                    Message
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows="4"
                    className={`block w-full bg-white/[0.04] border outline-none rounded-xl px-4 py-3 text-white transition-all resize-none ${
                      errors.content ? "border-red-500" : "border-white/10 focus:border-primary focus:ring-1 focus:ring-primary"
                    }`}
                    value={formData.content}
                    onChange={(e) => handleChange(e)}
                  ></textarea>
                  {errors.content && <p className="text-xs font-semibold text-red-500">{errors.content}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 font-semibold rounded-xl bg-primary text-black hover:bg-primaryDark transition-all duration-300 shadow-lg shadow-primary/20 disabled:opacity-50"
                  disabled={status.loading}
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {status.success && <MsgSentSuccessfully />}
    </>
  );
};

export default ContactContent;
