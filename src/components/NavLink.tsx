import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const NavLink = ({to,children}: {to: string, children: string}) => {
    return (
    <motion.div
        whileHover={{scale: 1.05}}
        className="text-zinc-600 hover:text=[#FF5A44] hover:font-semibold transition-colors"
    >
        <Link to={to}>{children}</Link>
    </motion.div>
    )
}
