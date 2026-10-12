import { Link } from "react-router-dom"
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";



export default function Footer(){
    return(
        <footer className="flex gap-5 text-[#FFFF] [text-shadow:0_0_8px_rgba(26,213,255,0.6)] bg-[#020C12] items-center justify-center py-4">
            <p>Copyright &copy; 2026 Jabez Greenan</p>
            <ul className="flex gap-2 *:hover:text-[#1AD5FF] *:text-2xl">
                <li>
                    <Link to={"https://www.linkedin.com/in/jabez-greenan-60b434271/?isSelfProfile=true"}><FaLinkedin /></Link>
                </li>
                <li>
                    <Link to={"https://github.com/Jabezgreenan"}><FaGithub /></Link>
                </li>
                <li>
                    <Link to={"mailto:jabezgreenan@gmail.com"}><MdEmail /></Link>
                </li>
                
            </ul>
        </footer>
    )
}