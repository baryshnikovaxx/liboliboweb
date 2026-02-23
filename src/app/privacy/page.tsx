export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#111111] text-white">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <h1 className="text-[clamp(2rem,5vw,3.4rem)] font-bold leading-tight">
          Политика конфиденциальности
        </h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-white/85">
          <p>
            Мы обрабатываем персональные данные пользователей в соответствии с применимым
            законодательством и только для целей обратной связи по вашему запросу.
          </p>
          <p>
            Оставляя заявку на сайте, вы подтверждаете согласие на обработку персональных
            данных, необходимых для коммуникации и подготовки коммерческого предложения.
          </p>
          <p>
            По вопросам обработки персональных данных вы можете написать на{" "}
            <a className="font-bold text-white hover:opacity-90" href="mailto:podcast@libolibo.ru">
              podcast@libolibo.ru
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
