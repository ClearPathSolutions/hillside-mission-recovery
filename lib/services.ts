import { IconDetox, IconResidential, IconDual, IconAftercare } from "@/components/Icons";

export const services = [
  {
    slug: "/treatment/detoxification",
    title: "Medical Detox",
    tagline: "Your first step in the right direction.",
    text: "A state-of-the-art, medically supervised drug & alcohol detox program that keeps you safe and comfortable at our Mission Viejo facility.",
    Icon: IconDetox,
  },
  {
    slug: "/treatment/residential-inpatient",
    title: "Residential Inpatient",
    tagline: "Two steps forward. No steps back.",
    text: "Intensive therapy combined with a stable, home-like setting that addresses the behavioral roots of addiction.",
    Icon: IconResidential,
  },
  {
    slug: "/treatment/dual-diagnosis",
    title: "Dual Diagnosis",
    tagline: "Integrated mental health care.",
    text: "We treat addiction and mental health simultaneously to stabilize the underlying triggers for relapse.",
    Icon: IconDual,
  },
  {
    slug: "/treatment/aftercare-beyond",
    title: "Aftercare & Alumni",
    tagline: "Life on life's terms.",
    text: "Thorough aftercare planning and alumni programming that keep you connected to the recovery community long after you leave.",
    Icon: IconAftercare,
  },
] as const;
