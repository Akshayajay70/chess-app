import { useState } from "react";

const variants = [
    "bullet(1+0)",
    "bullet(1+2)",
    "blitz(3+0)",
    "blitz(3+2)",
    "rapid(10+0)",
    "rapid(10+5)",
    "classic(60+30)",
    "classic(90+30)"
];

// Custom keyframes for slide-down fade-in
const slideDownFade = `
@keyframes slideDownFade {
  0% { opacity: 0; transform: translateY(-32px); }
  100% { opacity: 1; transform: translateY(0); }
}
`;

export function PlayCard({ type, description }: { type: string, description: string }) {
    const [showVariants, setShowVariants] = useState(false);

    // Helper to split variant string
    function parseVariant(variant: string) {
        const match = variant.match(/([a-zA-Z]+)\(([^)]+)\)/);
        if (!match) return { vType: variant, vTime: "" };
        return { vType: match[1], vTime: match[2] };
    }

    return (
        <>
            <style>{slideDownFade}</style>
            <div
                className="flex-1 bg-[#3456e4] rounded-3xl flex flex-col items-center justify-center p-8 shadow-lg h-full min-h-[280px] transition-all duration-300"
                onClick={() => !showVariants && setShowVariants(true)}
                style={{ cursor: showVariants ? 'default' : 'pointer' }}
            >
                {!showVariants ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="text-white text-6xl mb-6 select-none">+</div>
                        <div className="text-white text-2xl font-bold italic mb-2">{type}</div>
                        <div className="text-slate-300 text-base">{description}</div>
                    </div>
                ) : (
                    <div
                        className="w-full h-full flex flex-col items-center justify-center px-2 py-4"
                        style={{
                            animation: 'slideDownFade 0.5s cubic-bezier(0.4,0,0.2,1)',
                        }}
                    >
                        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full max-w-md">
                            {variants.map((variant, idx) => {
                                const { vType, vTime } = parseVariant(variant);
                                return (
                                    <button
                                        key={idx}
                                        className="h-20 rounded-2xl bg-[#3d5adf] text-white font-bold flex flex-col items-center justify-center shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30 hover:scale-105 hover:bg-[#4666f6] hover:brightness-110"
                                        style={{
                                            boxShadow: '0 2px 12px 0 rgba(52,86,228,0.10)',
                                            animation: `slideDownFade 0.5s cubic-bezier(0.4,0,0.2,1) ${(0.08 * idx + 0.1).toFixed(2)}s both`,
                                        }}
                                        onClick={e => { e.stopPropagation(); /* handle variant selection here */ }}
                                    >
                                        <span className="text-xs uppercase tracking-widest text-blue-200 font-semibold mb-1">{vType}</span>
                                        <span className="text-2xl font-extrabold text-white tracking-tight">{vTime}</span>
                                    </button>
                                );
                            })}
                            <button
                                className="h-20 rounded-2xl bg-[#25336a] text-slate-300 font-semibold text-base flex flex-col items-center justify-center shadow-md transition-all duration-200 hover:bg-[#2d3e7a] hover:text-white hover:scale-105"
                                style={{
                                    boxShadow: '0 2px 12px 0 rgba(37,51,106,0.10)',
                                    animation: `slideDownFade 0.5s cubic-bezier(0.4,0,0.2,1) 0.78s both`,
                                }}
                                onClick={e => { e.stopPropagation(); setShowVariants(false); }}
                            >
                                <span className="text-2xl mb-1">&#8592;</span>
                                Go Back
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
