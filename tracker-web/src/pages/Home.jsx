import kuroma from "./../assets/media/pg-1.png";
import './Home.css';
export default function Home() {
  return (
    <div className="text-5xl font-bold text-kinda-white overflow-hidden">
      <div
        className="relative min-w-screen min-h-screen bg-no-repeat bg-contain"
        style={{backgroundImage: `url(${kuroma})`}}
      >
        <div>
        <div className="absolute bg-kinda-black right-200 top-[23vh] w-xl h-24 bg-semi-border" />
        <div className="absolute bg-kinda-black right-236 top-108 w-36 h-96 bg-semi-border" />
        </div>
        <div className="text-right min-h-screen flex flex-col justify-center pr-24 title">
          <div className="text-[18rem] z-10">
            <div>Kuroma</div>
            <div>
              Web <span className="hover:underline cursor-pointer select-none">V1</span>
            </div>
          </div>
            <div className="font-monospace text-4xl font-medium mt-24 cursor-pointer select-none"
            >
              &gt; Those who seeks the&nbsp;
              <span className="text-kinda-black bg-kinda-white hover:underline ">
                 update
              </span>
            </div>
        </div>
      </div>
      
      <div>
        Jelo
      </div>
    </div>
  );
}
