export function RatingCard({ variant, rating }: { variant: string, rating: number }) {
    return (
        <div className="flex-1 bg-[#4b4bb1] rounded-xl p-6 flex flex-col items-center justify-center">
            <span className="text-slate-300 text-base mb-1">{variant}</span>
            <span className="text-yellow-300 text-3xl font-bold">{rating}</span>
        </div>
    )
}