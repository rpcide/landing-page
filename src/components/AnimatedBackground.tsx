interface AnimatedBackgroundProps {
  particleCount?: number;
  shapeCount?: number;
  orbCount?: number;
  lineCount?: number;
  codeParticleCount?: number;
  className?: string;
}

export default function AnimatedBackground({
  particleCount = 50,
  shapeCount = 8,
  orbCount = 5,
  lineCount = 6,
  codeParticleCount = 30,
  className = "",
}: AnimatedBackgroundProps) {
  const codeSymbols = [
    "{}",
    "[]",
    "()",
    "<>",
    "//",
    "&&",
    "||",
    "==",
    "!=",
    "++",
    "->",
    "::",
    "<<",
    ">>",
    "+=",
  ];

  return (
    <>
      <div className={`absolute top-0 bottom-0 left-0 right-0 inset-0 overflow-hidden z-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-purple-800/5"></div>

        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
              animation: "gridMove 20s linear infinite",
            }}
          ></div>
        </div>

        {[...Array(shapeCount)].map((_, i) => (
          <div
            key={`shape-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float${i % 3} ${
                15 + Math.random() * 10
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            <div
              className="w-16 h-16 border border-purple-500 dark:border-purple-500/30 rotate-45"
              style={{
                background:
                  "linear-gradient(45deg, rgba(147, 51, 234, 0.1), transparent)",
                filter: "blur(1px)",
              }}
            ></div>
          </div>
        ))}

        {[...Array(orbCount)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${100 + Math.random() * 200}px`,
              height: `${100 + Math.random() * 200}px`,
              background: `radial-gradient(circle, rgba(147, 51, 234, ${
                0.1 + Math.random() * 0.1
              }), transparent 70%)`,
              animation: `pulse ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              filter: "blur(40px)",
            }}
          ></div>
        ))}

        {[...Array(codeParticleCount)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute text-purple-400/60 font-mono text-xs"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `codeFloat ${
                10 + Math.random() * 15
              }s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            {codeSymbols[Math.floor(Math.random() * codeSymbols.length)]}
          </div>
        ))}

        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239333ea' fillOpacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              animation: "hexMove 25s linear infinite",
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }

        @keyframes float0 {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes float1 {
          0%,
          100% {
            transform: translateX(0px) rotate(0deg);
          }
          50% {
            transform: translateX(20px) rotate(-180deg);
          }
        }

        @keyframes float2 {
          0%,
          100% {
            transform: translate(0px, 0px) rotate(0deg);
          }
          33% {
            transform: translate(15px, -15px) rotate(120deg);
          }
          66% {
            transform: translate(-15px, 15px) rotate(240deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }

        @keyframes codeFloat {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes lineMove {
          0%,
          100% {
            opacity: 0;
            transform: translateX(-100px);
          }
          50% {
            opacity: 1;
            transform: translateX(100px);
          }
        }

        @keyframes hexMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(60px, 60px);
          }
        }
      `}</style>
    </>
  );
}
