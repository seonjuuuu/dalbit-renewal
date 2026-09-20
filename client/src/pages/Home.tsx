import { FormEvent, useEffect, useState } from "react";

const CHARACTER_VIDEO = "/dalbit-character-working-loop.mp4";
const CHARACTER_POSTER = "/manus-storage/dalbit-video-keyframe_f9e1ec36.png";
const DALBIT_LOGO = "/dalbit-work-logo.png";

function Spark({ className }: { className: string }) {
  return <span aria-hidden="true" className={`spark ${className}`} />;
}

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultation, setConsultation] = useState({
    name: "",
    contact: "",
    service: "홈페이지 제작 · 리뉴얼",
    message: "",
  });

  useEffect(() => {
    if (!isConsultationOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsConsultationOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isConsultationOpen]);

  const submitConsultation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`[상담 신청] ${consultation.name}님`);
    const body = encodeURIComponent(
      [
        "DALBIT WORK 상담 신청",
        "",
        `이름: ${consultation.name}`,
        `연락처: ${consultation.contact}`,
        `상담 분야: ${consultation.service}`,
        "",
        "문의 내용",
        consultation.message || "내용 미입력",
      ].join("\n"),
    );

    window.location.href = `mailto:dalbit.work@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="renewal-page">
      <div className="paper-grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="DALBIT WORK 홈">
          <img className="brand-logo" src={DALBIT_LOGO} alt="DALBIT WORK" />
        </a>
        <span className="header-status"><i /> RENEWAL IN PROGRESS</span>
      </header>

      <section className="hero" id="top" aria-labelledby="renewal-title">
        <div className="hero-copy">
          <p className="eyebrow">홈페이지 제작 · 웹디자인 스튜디오</p>
          <h1 id="renewal-title">
            홈페이지를<br />
            <em>새롭게</em> 준비하고<br />
            있어요<span className="smile">:)</span>
          </h1>
          <p className="intro">
            달빛워크는 브랜드에 어울리는 홈페이지와 랜딩페이지를 만듭니다.<br />
            더 나은 모습으로 만나기 위해 현재 리뉴얼 중이에요.
          </p>
          <div className="service-list" aria-label="제공 서비스">
            <span>홈페이지 제작</span>
            <span>랜딩페이지</span>
            <span>웹디자인</span>
          </div>
          <div className="contact-block">
            <button
              className="contact-link"
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              aria-haspopup="dialog"
            >
              <span className="contact-label">홈페이지 제작 상담</span>
              <strong>무료 상담 신청하기</strong>
              <span className="arrow" aria-hidden="true">↗</span>
            </button>
            <a className="direct-email" href="mailto:dalbit.work@gmail.com">
              <span>이메일로 바로 문의</span>
              <strong>dalbit.work@gmail.com</strong>
            </a>
            <a
              className="portfolio-link"
              href="https://imweb.me/expert/profile/i9vo0jnh"
              target="_blank"
              rel="noreferrer"
            >
              <span>아임웹 전문가 프로필</span>
              <strong>포트폴리오 보러가기</strong>
              <span className="arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="character-area" aria-label="노트북으로 작업 중인 달빛워크 캐릭터">
          <Spark className="spark-one" />
          <Spark className="spark-two" />
          <Spark className="spark-three" />

          <div className="character-frame" aria-label="노트북으로 작업하는 달빛워크 캐릭터 애니메이션">
            <img
              className="character-poster"
              src={CHARACTER_POSTER}
              alt=""
              aria-hidden="true"
            />
            <video
              className="character-video"
              src={CHARACTER_VIDEO}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              poster={CHARACTER_POSTER}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {isConsultationOpen && (
        <section className="consultation-layer" aria-labelledby="consultation-title">
          <button
            className="consultation-backdrop"
            type="button"
            onClick={() => setIsConsultationOpen(false)}
            aria-label="상담폼 닫기"
          />
          <div className="consultation-modal" role="dialog" aria-modal="true">
            <button
              className="modal-close"
              type="button"
              onClick={() => setIsConsultationOpen(false)}
              aria-label="상담폼 닫기"
            >
              ×
            </button>
            <p className="modal-kicker">TELL US A LITTLE</p>
            <h2 id="consultation-title">상담을<br />남겨주세요.</h2>
            <p className="modal-description">
              내용을 작성해 주시면 메일 작성 창으로 연결됩니다.<br />
              확인 후 빠르게 답변드릴게요.
            </p>
            <form className="consultation-form" onSubmit={submitConsultation}>
              <label>
                <span>이름 <b>*</b></span>
                <input
                  required
                  autoComplete="name"
                  value={consultation.name}
                  onChange={(event) => setConsultation({ ...consultation, name: event.target.value })}
                  placeholder="성함을 입력해 주세요"
                />
              </label>
              <label>
                <span>연락처 <b>*</b></span>
                <input
                  required
                  autoComplete="tel"
                  inputMode="tel"
                  value={consultation.contact}
                  onChange={(event) => setConsultation({ ...consultation, contact: event.target.value })}
                  placeholder="010-0000-0000"
                />
              </label>
              <label>
                <span>상담 분야</span>
                <select
                  value={consultation.service}
                  onChange={(event) => setConsultation({ ...consultation, service: event.target.value })}
                >
                  <option>홈페이지 제작 · 리뉴얼</option>
                  <option>랜딩페이지 제작</option>
                  <option>쇼핑몰 제작</option>
                  <option>기타 문의</option>
                </select>
              </label>
              <label>
                <span>문의 내용</span>
                <textarea
                  rows={4}
                  value={consultation.message}
                  onChange={(event) => setConsultation({ ...consultation, message: event.target.value })}
                  placeholder="원하시는 홈페이지의 방향이나 궁금한 점을 자유롭게 적어주세요."
                />
              </label>
              <button className="consultation-submit" type="submit">
                메일로 상담 신청 보내기 <span aria-hidden="true">↗</span>
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <p>© DALBIT WORK</p>
        <p>WEB DESIGN · BRAND EXPERIENCE</p>
      </footer>
    </main>
  );
}
