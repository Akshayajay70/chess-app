import { Link } from "react-router-dom";

export function PlayCard({ type, description }: { type: string, description: string }) {
    return (
        <Link to={'/spinner'}
            className="flex-1 bg-[#3456e4] rounded-3xl flex flex-col items-center justify-center p-8 shadow-lg h-full"
        >
            <div className="flex gap-2 mb-4">
                <span
                    className="w-8 h-8 bg-blue-300 rounded-full inline-block opacity-60"
                ></span>
                <span
                    className="w-8 h-8 bg-blue-300 rounded-full inline-block opacity-60"
                ></span>
            </div>
            <div className="text-white text-2xl font-bold italic mb-2">
                {type}
            </div>
            <div className="text-slate-300 text-base">{description}</div>
        </Link>

    )
}