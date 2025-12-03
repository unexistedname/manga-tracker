import { Link } from "react-router-dom";
import { useState, useEffect} from "react";


export default function Nav() {
    const [blink, setBlink] = useState(true);
    const [del, setDelete] = useState(false);
    const [caret, toggleCaret] = useState(true);
    const [navMenu, toggleMenu] = useState(false)
    
    const menu = [
        { id: 3, text: "List", link: "/", delay: 400 },
        { id: 2, text: "Progress", link: "/", delay: 200 },
        { id: 1, text: "Main", link: "/", delay: 0 }
    ];

    const deleteEffect = () => {
        setDelete(true);
        setTimeout(() => {
            setDelete(false);
        }, 200)
    }
    useEffect(() => {
        
    })
    useEffect(() => { // Cursor blink
        const interval = setInterval(() => {
            setBlink(!blink);
        }, 500);
    
        return () => clearInterval(interval);
    }, [blink]);

    return (
        <nav className="text-4xl absolute top-5 right-5 flex flex-row-reverse text-kinda-white">
            <div className="font-title select-none cursor-pointer" onClick={() => toggleMenu(!navMenu)}>&lt;</div>
            <div className={`overflow-hidden ${navMenu ? "w-full" : "w-0 delay-200"}`}>
                <div className={`${!navMenu && 'bg-kinda-white text-kinda-black'}`}>
                    {menu.map((item) => (
                        <Link
                            id={item.id}
                            to={item.link}
                            className={`font-monospace px-6 hover:underline ${navMenu ? "opacity-100" : "opacity-0"}`}
                            style={{transitionDelay: `${navMenu ? item.delay : 200}ms`}}
                        >{item.text}</Link>
                    ))}
                </div>

            </div>
            <div className={`font-title tick-tock ${blink ? 'opacity-100' : 'opacity-0'} ${caret ? 'inline' : 'hidden'}`}>_</div>
        </nav>
    )
}