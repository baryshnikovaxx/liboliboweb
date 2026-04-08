export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <h1 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
          Privacy Policy
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-white/85">
          <p>
            We process personal data in accordance with applicable laws and only to reply to
            your request.
          </p>
          <p>
            By submitting a request through this website, you consent to the processing of the
            personal data required for communication and preparing a commercial proposal.
          </p>
          <p>
            For any privacy-related questions, please contact us at{" "}
            <a className="font-bold text-white transition hover:text-[#FF383C]" href="mailto:podcast@libolibo.me">
              podcast@libolibo.me
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
