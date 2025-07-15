import { useAppSelector } from "../../../app/redux/hooks";
import type { RootState } from "../../../app/redux/store";


export default function HeadingText() {
  const title = useAppSelector((state: RootState) => state.userAuth.headingTitle)
  const subtitle = useAppSelector((state: RootState) => state.userAuth.headingSubtitle)

  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-slate-400 text-lg">{subtitle}</p>
    </div>
  );
}