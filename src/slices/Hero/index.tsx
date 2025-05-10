'use client';

import { FC, JSX } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Bounded } from "@/components/Bounded";
import Button from "@/components/Button";
import { TextSplitter } from "@/components/TextSplitter";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import Scene from "./Scene";
import { Bubbles } from "./Bubbles";
import { useStore } from "@/hooks/useStore";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  const ready = useStore((state) => state.ready);
  const isDesktop = useMediaQuery("(min-width: 768px)", true);

  useGSAP(() => {
    if (!ready && isDesktop) return;

    const introTl = gsap.timeline();

    introTl
      .set(".hero", { opacity: 1 })
      .from(".hero-header-word", {
        scale: 3,
        opacity: 0,
        ease: "power4.in",
        delay: 0.3,
        stagger: 1,
      })
      .from(".hero-subheading", {
        opacity: 0,
        y: 30,
      }, "+=.8")
      .from(".hero-body", {
        opacity: 0,
        y: 10,
      })
      .from(".hero-button", {
        opacity: 0,
        y: 10,
        duration: 0.6,
      });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .fromTo(
        "body",
        { backgroundColor: "#FDE047" },
        { backgroundColor: "#D9F99D", overwrite: "auto" },
        1
      )
      .from(".text-side-heading .split-char", {
        scale: 1.3,
        y: 40,
        rotate: -25,
        opacity: 0,
        stagger: 0.1,
        ease: "back.out(1.7)",
        duration: 0.5,
      })
      .from(".text-side-body", {
        y: 20,
        opacity: 0,
      });
  }, { dependencies: [ready, isDesktop] });

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="hero opacity-0"
    >
      {isDesktop && (
        <View className="hero-scene pointer-events-none absolute top-0 z-50 h-screen w-screen">
          <Scene />
          <Bubbles count={300} speed={2} repeat />
        </View>
      )}

      {/* HERO SECTION */}
      <section className="grid min-h-screen place-items-center px-4 py-24 text-center">
        <div className="grid auto-rows-min gap-6">
          <h1 className="hero-header text-7xl font-black uppercase leading-[0.8] text-orange-500 md:text-[9rem] lg:text-[13rem]">
            <TextSplitter
              text={asText(slice.primary.heading)}
              wordDisplayStyle="block"
              className="hero-header-word"
            />
          </h1>
          <div className="hero-subheading text-4xl font-semibold text-sky-950 lg:text-6xl">
            <PrismicRichText field={slice.primary.subheading} />
          </div>
          <div className="hero-body text-xl font-normal text-sky-950">
            <PrismicRichText field={slice.primary.body} />
          </div>
          <Button
            buttonLink={slice.primary.button_link}
            buttonText={slice.primary.button_text}
            className="hero-button mt-6"
          />
        </div>
      </section>

      {/* SECOND SECTION */}
      <section className="text-side relative z-30 grid min-h-screen items-center gap-8 px-4 py-16 md:grid-cols-2">
        <PrismicNextImage
          className="w-full md:hidden"
          field={slice.primary.cans_image}
        />
        <div>
          <h2 className="text-side-heading text-balance text-5xl font-black uppercase text-sky-950 lg:text-8xl">
            <TextSplitter text={asText(slice.primary.second_heading)} />
          </h2>
          <div className="text-side-body mt-4 max-w-xl text-balance text-xl text-sky-900">
            <PrismicRichText field={slice.primary.second_body} />
          </div>
        </div>
      </section>
    </Bounded>
  );
};

export default Hero;
