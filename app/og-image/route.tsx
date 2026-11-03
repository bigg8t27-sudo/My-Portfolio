import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const revalidate = 86400; // 24 h

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 40%, #0d0d2e 100%)',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow blobs */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            left: '-80px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-140px',
            right: '-100px',
            width: '640px',
            height: '640px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
        />

        {/* N logo mark */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            borderRadius: '18px',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))',
            border: '1px solid rgba(59,130,246,0.4)',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              fontSize: '36px',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #3b82f6, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            N
          </span>
        </div>

        {/* Name */}
        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '12px',
          }}
        >
          <span
            style={{
              fontSize: '72px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            ALFRED
          </span>
          <span
            style={{
              fontSize: '72px',
              fontWeight: 900,
              background: 'linear-gradient(90deg, #3b82f6, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-2px',
              lineHeight: 1,
            }}
          >
            OFORI
          </span>
        </div>

        {/* Role */}
        <div
          style={{
            fontSize: '22px',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            marginBottom: '40px',
          }}
        >
          Data Scientist · Creative Developer
        </div>

        {/* Tag pills */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
          }}
        >
          {['Next.js', 'React', 'Python', 'Figma', 'Three.js'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 20px',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: '15px',
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '1px',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom URL strip */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '15px',
            color: 'rgba(59,130,246,0.7)',
            letterSpacing: '2px',
          }}
        >
          <div
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 8px #22c55e',
            }}
          />
          alfreddev.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
