"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoArrowForwardOutline, IoCheckmarkOutline, IoCloseOutline, IoLogoFacebook, IoLogoInstagram, IoLogoLinkedin } from "react-icons/io5";
import Container from "@/components/shared/Container";
import Reveal from "@/components/shared/Reveal";
import { aboutTeam } from "@/data/about";

const socialPlatforms = [
  { id: "facebook", label: "Facebook", icon: IoLogoFacebook },
  { id: "linkedin", label: "LinkedIn", icon: IoLogoLinkedin },
  { id: "instagram", label: "Instagram", icon: IoLogoInstagram },
];

function TeamSocialLinks({ member }) {
  return (
    <div className="mt-3.75 flex items-center justify-center gap-2.25">
      {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        const href = member.socials?.[platform.id];

        return href ? (
          <a key={platform.id} href={href} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on ${platform.label}`} className="group/social flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#777777] text-[#292929] transition-all duration-300 hover:-translate-y-0.75 hover:border-[#242424] hover:bg-[#242424] hover:text-white active:translate-y-0 dark:border-white/50 dark:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-[#242424]">
            <Icon aria-hidden="true" className="text-[14px] transition-transform duration-300 group-hover/social:scale-110" />
          </a>
        ) : (
          <span key={platform.id} title={`${platform.label} profile coming soon`} aria-label={`${platform.label} profile coming soon`} className="flex h-8.5 w-8.5 items-center justify-center rounded-full border border-[#aaaaaa] text-[#777777] dark:border-white/30 dark:text-[#aaaaaa]">
            <Icon aria-hidden="true" className="text-[14px]" />
          </span>
        );
      })}
    </div>
  );
}

export default function OurTeam() {
  const dialogRef = useRef(null);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selectedMember || !dialog) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    if (!dialog.open) dialog.showModal();

    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedMember]);

  const closeProfile = () => dialogRef.current?.close();

  return (
    <>
      <section id="our-team" aria-labelledby="our-team-heading" className="bg-white pt-21.25 pb-25 transition-colors duration-300 dark:bg-[#101112] sm:pt-25 sm:pb-28.75 lg:pt-28 lg:pb-30">
        <Container>
          <div className="grid min-w-0 items-end gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
            <Reveal>
              <h2 id="our-team-heading" className="font-heading text-[30px] leading-[1.2] font-semibold tracking-[-0.055em] text-[#242424] dark:text-white sm:text-[36px] lg:text-[44px]">
                Meet the Minds
                <br className="hidden sm:block" /> Behind the Journeys
              </h2>
            </Reveal>

            <Reveal delay={120} className="lg:justify-self-end lg:pb-1">
              <p className="max-w-125 text-[14px] leading-[1.75] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[16px]">
                Creative perspectives and a shared passion for discovering the world. These illustrative profiles represent the roles behind the WAYLUME experience.
              </p>
            </Reveal>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-x-4.5 gap-y-11.25 min-[420px]:grid-cols-2 sm:mt-12 sm:gap-x-5 sm:gap-y-12.5 lg:mt-13.75 lg:grid-cols-4 lg:gap-x-5.5 xl:gap-x-6.25">
            {aboutTeam.map((member, index) => (
              <Reveal key={member.id} delay={(index % 4) * 90} className="min-w-0">
                <article className="group flex h-full flex-col items-center text-center">
                  <button type="button" onClick={() => setSelectedMember(member)} aria-label={`View ${member.name}'s sample profile`} className="relative block aspect-[0.91] w-full overflow-hidden rounded-[13px] bg-[#e8e8e8] text-left outline-none focus-visible:ring-2 focus-visible:ring-[#242424] focus-visible:ring-offset-4 dark:bg-[#292c2e] dark:focus-visible:ring-white dark:focus-visible:ring-offset-[#101112]">
                    <Image
                      src={member.image}
                      alt={`Illustrative portrait for ${member.name}`}
                      fill
                      sizes="(max-width: 419px) 100vw, (max-width: 1023px) 50vw, 25vw"
                      className="object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:scale-[1.065]"
                    />

                    <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />

                    <span className="absolute right-4 bottom-4 flex h-9.5 w-9.5 translate-y-2 items-center justify-center rounded-full bg-white text-[#242424] opacity-0 shadow-[0_6px_25px_rgba(0,0,0,0.15)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                      <IoArrowForwardOutline aria-hidden="true" className="text-[18px] -rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </button>

                  <h3 className="font-heading mt-4.5 text-[16px] leading-[1.4] font-semibold tracking-[-0.035em] text-[#242424] dark:text-white sm:text-[17px] lg:text-[18px]">
                    {member.name}
                  </h3>

                  <p className="mt-1.75 text-[12px] leading-[1.6] font-normal text-[#858585] dark:text-[#aaaaaa] sm:text-[13px] lg:text-[14px]">
                    {member.role}
                  </p>

                  <TeamSocialLinks member={member} />
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="team-profile-title"
        onClose={() => setSelectedMember(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeProfile();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-162.5 overflow-y-auto rounded-[17px] bg-white p-0 text-[#242424] shadow-[0_25px_90px_rgba(0,0,0,0.3)] backdrop:bg-black/70 backdrop:backdrop-blur-[5px] dark:bg-[#1e2022] dark:text-white"
      >
        {selectedMember && (
          <div>
            <div className="relative h-60 overflow-hidden bg-[#e8e8e8] sm:h-75">
              <Image src={selectedMember.image} alt={`Illustrative portrait for ${selectedMember.name}`} fill sizes="(max-width: 650px) 100vw, 650px" className="object-cover object-[center_35%]" />

              <div className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-black/10" />

              <button type="button" onClick={closeProfile} aria-label="Close team profile" className="absolute top-4 right-4 flex h-10.25 w-10.25 items-center justify-center rounded-full bg-white text-[#242424] shadow-md transition-all duration-300 hover:rotate-90 hover:bg-[#eeeeee]">
                <IoCloseOutline aria-hidden="true" className="text-[23px]" />
              </button>
            </div>

            <div className="px-6 py-7 sm:px-9 sm:py-8">
              <span className="text-[11px] font-medium tracking-widest text-[#858585] uppercase dark:text-[#aaaaaa]">
                WAYLUME · Illustrative Team Profile
              </span>

              <h2 id="team-profile-title" className="font-heading mt-3 text-[27px] leading-[1.2] font-semibold tracking-tighter sm:text-[32px]">
                {selectedMember.name}
              </h2>

              <p className="mt-1.75 text-[14px] font-medium text-[#858585] dark:text-[#aaaaaa]">
                {selectedMember.role}
              </p>

              <p className="mt-5.5 text-[14px] leading-[1.85] text-[#777777] dark:text-[#bcbcbc] sm:text-[15px]">
                {selectedMember.description}
              </p>

              <div className="mt-7 border-t border-[#ececec] pt-6 dark:border-white/10">
                <h3 className="font-heading text-[16px] font-semibold tracking-tight">Areas of Focus</h3>

                <ul className="mt-4 space-y-3">
                  {selectedMember.expertise.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[14px] text-[#777777] dark:text-[#bcbcbc]">
                      <IoCheckmarkOutline aria-hidden="true" className="shrink-0 text-[18px] text-[#242424] dark:text-white" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button type="button" onClick={closeProfile} className="mt-8 inline-flex h-11 items-center justify-center rounded-lg bg-[#242424] px-6 text-[13px] font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#454545] active:translate-y-0 dark:bg-white dark:text-[#242424] dark:hover:bg-[#e9e9e9]">
                Back to Our Team
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}