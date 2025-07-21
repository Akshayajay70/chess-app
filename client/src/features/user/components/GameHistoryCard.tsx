export function GameHistoryCard({ playerA, playerB }: { playerA: string, playerB: string }) {
    return (
        <div className="flex items-center gap-3 bg-[#4b4bb1] rounded-xl p-4">
            <span className="text-green-400 font-bold">{playerA}</span>
            <span className="text-white">vs</span>
            <span className="text-slate-200 font-bold">{playerB}</span>
        </div>
    )
}