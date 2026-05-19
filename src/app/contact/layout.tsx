import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact The Purple Dragon | Lawton Medical Dispensary Curbside Handoff",
  description: "Get in touch with The Purple Dragon at 1314 W Gore Blvd in Lawton, OK. Choose email or optional text alerts, request menu updates, and send intake questions to the store team.",
  keywords: [
    "Contact Lawton dispensary",
    "Lawton dispensary deal alerts",
    "Gore Blvd dispensary contact",
    "The Purple Dragon phone number",
    "Lawton dispensary directions"
  ]
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
