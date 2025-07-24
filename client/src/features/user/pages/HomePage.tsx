import { useEffect } from "react";
import { SideBar } from "../../../shared/components/Sidebar";
import { GameHistoryCard } from "../components/GameHistoryCard";
import { PlayCard } from "../components/PlayCards";
import { RatingCard } from "../components/RatingCards";
import { useAppDispatch, useAppSelector } from "../../../app/redux/hooks";
import { fetchRating } from "../../../app/redux/slices/rating.slice";
import { GameSpinner } from "../components/GameSpinner";

export function HomePage() {
    const dispatch = useAppDispatch();
    const matchStatus = useAppSelector(state => state.matchMaking.status)
    const ratings = Object.entries(useAppSelector(state => state.rating.ratings)!)
    useEffect(() => {
        dispatch(fetchRating())
    }, [dispatch])

    if (matchStatus === 'finding') return <GameSpinner />
    if (matchStatus === 'matched') return <div>Match is playing</div>

    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 grid grid-cols-12 gap-4 overflow-hidden">
            {/* Sidebar */}
            <div className="col-span-2 h-full">
                <SideBar />
            </div>
            <div className="col-span-10 h-full grid grid-cols-11">
                {/* <!-- Main section left --> */}
                <div className="col-span-8 grid grid-rows-11 gap-4 p-3 h-full mt-5">
                    {/* <!-- Play Buttons (top) --> */}
                    <div className="row-span-6 flex gap-8 h-full items-center justify-center">
                        <PlayCard type="Play Online" description="Find a match instantly" />
                        <PlayCard type="Play a Friend" description="Challenge your friends" />
                    </div>

                    <div className="row-span-4 bg-[#39398c] rounded-3xl p-6 flex flex-col justify-between shadow-lg">
                        <div className="flex flex-col h-full min-h">
                            <div className="text-white text-2xl font-semibold mb-6">
                                Rating
                            </div>
                            <div className="flex gap-6 mb-8">
                                {ratings.map((item, key) => (
                                    <RatingCard key={key} variant={item[0]} rating={item[1]} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col p-3 mt-5 mb-12">
                    <div
                        className="bg-[#39398c] rounded-3xl p-8 shadow-lg flex-1 flex flex-col overflow-y-auto"
                    >
                        <div className="text-white text-2xl font-semibold mb-6">Game History</div>
                        <div className="flex flex-col gap-4">
                            <GameHistoryCard playerA="Magnus" playerB="You" />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}