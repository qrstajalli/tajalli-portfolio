import React from 'react';
import {
  User,
  Code2,
  Trophy,
  Briefcase,
  Sparkles,
  GitPullRequest,
  FileText,
  Mail,
  MessageSquare,
} from 'lucide-react';

interface IconGraphicsProps {
  id: string;
  size?: number;
  className?: string;
}

export const AppIconGraphics: React.FC<IconGraphicsProps> = ({ id, size = 60 }) => {
  const squircleRadius = `${Math.round(size * 0.22)}px`;

  switch (id) {
    case 'finder':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #5ec9f8 0%, #1e70eb 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(30, 112, 235, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Subtle top gloss */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          {/* Finder Face SVG */}
          <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 100 100" fill="none">
            <path
              d="M50 15C30 15 20 28 20 50C20 72 30 85 50 85C70 85 80 72 80 50C80 28 70 15 50 15Z"
              fill="#ffffff"
            />
            {/* Split face divider */}
            <path d="M50 15V85" stroke="#1e70eb" strokeWidth="6" strokeLinecap="round" />
            {/* Smile */}
            <path
              d="M32 60C38 72 62 72 68 60"
              stroke="#1e70eb"
              strokeWidth="6"
              strokeLinecap="round"
            />
            {/* Eyes */}
            <circle cx="36" cy="42" r="5" fill="#1e70eb" />
            <circle cx="64" cy="42" r="5" fill="#1e70eb" />
          </svg>
        </div>
      );

    case 'about-me':
    case 'about':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(255, 126, 95, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <User size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'projects':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(99, 102, 241, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <Code2 size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'hackathons':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(245, 158, 11, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <Trophy size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'experience':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(16, 185, 129, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <Briefcase size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'skills':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(6, 182, 212, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <Sparkles size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'open-source':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(139, 92, 246, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <GitPullRequest size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'resume':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #ffffff 0%, #e2e8f0 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Orange PDF badge top corner */}
          <div
            style={{
              width: size * 0.44,
              height: size * 0.44,
              borderRadius: `${Math.round(size * 0.1)}px`,
              background: 'linear-gradient(135deg, #ff5722 0%, #f4511e 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(244, 81, 30, 0.4)',
            }}
          >
            <FileText size={size * 0.28} color="#ffffff" strokeWidth={2.5} />
          </div>
          <div
            style={{
              width: size * 0.4,
              height: '3px',
              backgroundColor: '#cbd5e1',
              borderRadius: '2px',
              marginTop: '5px',
            }}
          />
        </div>
      );

    case 'contact':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(2, 132, 199, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <MessageSquare size={size * 0.52} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    case 'github':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #24292f 0%, #0f1419 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 24 24" fill="#ffffff">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.58 9.5 21.27 9.5 21V19.31C6.73 19.91 6.14 17.97 6.14 17.97C5.68 16.81 5.03 16.5 5.03 16.5C4.12 15.88 5.1 15.9 5.1 15.9C6.1 15.97 6.63 16.93 6.63 16.93C7.5 18.45 8.97 18 9.54 17.76C9.63 17.11 9.89 16.67 10.17 16.42C7.95 16.17 5.62 15.31 5.62 11.5C5.62 10.41 6.01 9.52 6.66 8.82C6.55 8.57 6.21 7.55 6.76 6.19C6.76 6.19 7.6 5.92 9.5 7.21C10.29 6.99 11.15 6.88 12 6.88C12.85 6.88 13.71 6.99 14.5 7.21C16.4 5.92 17.24 6.19 17.24 6.19C17.79 7.55 17.45 8.57 17.34 8.82C18 9.52 18.38 10.41 18.38 11.5C18.38 15.32 16.04 16.16 13.81 16.41C14.17 16.72 14.5 17.33 14.5 18.26V21C14.5 21.27 14.66 21.59 15.17 21.5C19.14 20.16 22 16.42 22 12C22 6.477 17.52 2 12 2Z"
            />
          </svg>
        </div>
      );

    case 'linkedin':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #0a66c2 0%, #084e96 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(10, 102, 194, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
            <path
              d="M7.5 9.5V17.5M7.5 6.5V6.6M12 17.5V13.5C12 11.5 13.5 11 14.5 11C15.5 11 16.5 11.8 16.5 13.5V17.5M12 17.5H16.5"
              stroke="white"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );

    case 'figma':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #2c2d30 0%, #1a1a1c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width={size * 0.44} height={size * 0.65} viewBox="0 0 38 57" fill="none">
            <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE" />
            <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83" />
            <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262" />
            <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E" />
            <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF" />
          </svg>
        </div>
      );

    case 'leetcode':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #2a2a2e 0%, #18181b 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(0, 0, 0, 0.4)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <svg width={size * 0.54} height={size * 0.54} viewBox="0 0 24 24" fill="none">
            <path d="M13.5 6L8.5 10.5C7.2 11.7 7.2 13.8 8.5 15L13.5 19.5" stroke="#FFA116" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 12.5H19" stroke="#E6A100" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case 'mail':
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 18px rgba(2, 132, 199, 0.35)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 100%)',
            }}
          />
          <Mail size={size * 0.54} color="#ffffff" strokeWidth={2.2} />
        </div>
      );

    default:
      return (
        <div
          style={{
            width: size,
            height: size,
            borderRadius: squircleRadius,
            background: 'linear-gradient(135deg, #64748b 0%, #334155 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Sparkles size={size * 0.5} color="#ffffff" />
        </div>
      );
  }
};
