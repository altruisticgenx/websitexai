import React from "react";
import { User, Mail, ArrowRight } from "lucide-react";

export default function Form1() {
  return (
    <form className="flex flex-col items-center text-sm text-foreground">
      <p className="text-xs bg-primary/20 text-primary font-medium px-3 py-1 rounded-full">
        Contact Us
      </p>

      <h1 className="text-4xl font-bold py-4 text-center">Let's Get In Touch.</h1>
      <p className="max-md:text-sm text-muted-foreground pb-10 text-center">
        Or just reach out manually to us at{" "}
        <a href="mailto:altruisticxai@gmail.com" className="text-primary hover:underline">
          altruisticxai@gmail.com
        </a>
      </p>

      <div className="max-w-96 w-full px-4">
        <label htmlFor="name" className="font-medium">
          Full Name
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all overflow-hidden bg-background">
          <User className="w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            id="name"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>

        <label htmlFor="email-address" className="font-medium mt-4">
          Email Address
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-border rounded-full focus-within:ring-2 focus-within:ring-ring transition-all overflow-hidden bg-background">
          <Mail className="w-5 h-5 text-muted-foreground" />
          <input
            type="email"
            id="email-address"
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter your email address"
            required
          />
        </div>

        <label htmlFor="message" className="font-medium mt-4">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          className="w-full mt-2 p-2 bg-background border border-border rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-ring transition-all"
          placeholder="Enter your message"
          required
        ></textarea>

        <button
          type="submit"
          className="flex items-center justify-center gap-1 mt-5 bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 w-full rounded-full transition"
        >
          Submit Form
          <ArrowRight className="w-5 h-5 mt-0.5" />
        </button>
      </div>
    </form>
  );
}
