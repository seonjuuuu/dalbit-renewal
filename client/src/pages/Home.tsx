import { FormEvent, useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { toast } from "sonner";

const CHARACTER_VIDEO = "/dalbit-character-working-loop.mp4";
const CHARACTER_POSTER = "/manus-storage/dalbit-video-keyframe_f9e1ec36.png";
const DALBIT_LOGO = "/dalbit-work-logo.png";
const CONSULTATION_API_URL =
  import.meta.env.VITE_CONSULTATION_API_URL ||
  "https://dalbitwork-estimate-5zcu.vercel.app/api/public/consultations";

function Spark({ className }: { className: string }) {
  return <span aria-hidden="true" className={`spark ${className}`} />;
}

export default function Home() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consultation, setConsultation] = useState({
    name: "",
    company: "",
    contact: "",
    service: "홈페이지 제작 · 리뉴얼",
    budget: "협의 후 결정",
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

  const submitConsultation = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(CONSULTATION_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consultation),
      });

      if (!response.ok) throw new Error("submit failed");

      toast.success("상담 신청이 접수되었습니다. 빠르게 연락드릴게요!");
      setConsultation({
        name: "",
        company: "",
        contact: "",
        service: "홈페이지 제작 · 리뉴얼",
        budget: "협의 후 결정",
        message: "",
      });
      setIsConsultationOpen(false);
    } catch (error) {
      toast.error("신청 접수에 실패했어요. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="renewal-page">
      <div className="paper-grain" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#top" aria-label="DALBIT WORK 홈">
          <img className="brand-logo" src={DALBIT_LOGO} alt="DALBIT WORK" />
        </a>
        <div className="header-right">
          <span className="header-status"><i /> RENEWAL IN PROGRESS</span>
          <a className="call-button" href="tel:01027579116" aria-label="전화로 문의하기">
            <Phone size={16} strokeWidth={2.4} aria-hidden="true" />
          </a>
        </div>
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
            달빛워크는 당신의 브랜드가 환하게 빛날 수 있도록<br />
            홈페이지와 랜딩페이지를 만드는 제작 스튜디오입니다.
          </p>
          <div className="service-list" aria-label="제공 서비스">
            <span>홈페이지 제작</span>
            <span>랜딩페이지</span>
            <span>웹디자인</span>
          </div>

          <a
            className="renewal-notice"
            href="https://imweb.me/expert/profile/i9vo0jnh"
            target="_blank"
            rel="noreferrer"
          >
            <span className="renewal-notice-text">
              지금 홈페이지는 새 모습으로 리뉴얼 중이에요.<br />
              그동안 진행한 작업물이 궁금하시다면 포트폴리오에서 만나보세요.
            </span>
            <span className="renewal-notice-cta">
              포트폴리오 보러가기 <span className="arrow" aria-hidden="true">↗</span>
            </span>
          </a>

          <div className="contact-block">
            <div className="primary-actions">
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
              <a className="call-cta" href="tel:01027579116" aria-label="전화로 바로 문의하기 010-2757-9116">
                <Phone size={18} strokeWidth={2.4} aria-hidden="true" />
                <span>바로 통화하기</span>
              </a>
            </div>
            <p className="consultation-hours">
              상담 가능 시간 · 오전 10시 ~ 오후 7시<br />
              공휴일 · 주말 휴무
            </p>
            <a className="direct-email" href="mailto:dalbit.work@gmail.com">
              <span>이메일로 바로 문의</span>
              <strong>dalbit.work@gmail.com</strong>
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
            <div className="modal-header">
              <p className="modal-kicker">TELL US A LITTLE</p>
              <h2 id="consultation-title">상담을<br />남겨주세요.</h2>
              <p className="modal-description">
                작성해 주신 내용은 바로 접수돼요.<br />
                확인 후 빠르게 연락드릴게요.
              </p>
            </div>
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
                <span>회사명</span>
                <input
                  autoComplete="organization"
                  value={consultation.company}
                  onChange={(event) => setConsultation({ ...consultation, company: event.target.value })}
                  placeholder="회사명 또는 상호명을 입력해 주세요"
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
                <span>예산</span>
                <select
                  value={consultation.budget}
                  onChange={(event) => setConsultation({ ...consultation, budget: event.target.value })}
                >
                  <option>협의 후 결정</option>
                  <option>100만원 미만</option>
                  <option>100 ~ 200만원</option>
                  <option>200 ~ 300만원</option>
                  <option>300만원 이상</option>
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
              <button className="consultation-submit" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "접수 중..." : "상담 신청 보내기"} <span aria-hidden="true">↗</span>
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
