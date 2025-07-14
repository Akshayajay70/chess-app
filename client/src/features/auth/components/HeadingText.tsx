import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";


export default function HeadingText() {
  const title = useSelector((state: RootState) => state.userAuth.headingTitle)
  const subtitle = useSelector((state: RootState) => state.userAuth.headingSubtitle)
  
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-4" dangerouslySetInnerHTML={{ __html: title }} />
      <p className="text-slate-400 text-lg">{subtitle}</p>
    </div>
  );
}