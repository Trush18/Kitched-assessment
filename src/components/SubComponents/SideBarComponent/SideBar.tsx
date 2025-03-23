import React from "react";
import "./SideBar.css"
import { FaCookie, FaEye, FaInstagram, FaSearch, FaTiktok, FaUser, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const SideBar: React.FC = () => {
    return (
        <aside className="sidebar">
            <h2 className="logo">Kitched</h2>
            <nav aria-label="Sidebar main Navigation" className="sidebar-nav main-nav">
                <ul>
                    <li>
                        <Link to="/discover"><span className="sidebar-icons"><FaEye /></span>Discover</Link>
                    </li>
                    <li>
                        <Link to="/search"><span className="sidebar-icons"><FaSearch /></span>Search</Link>
                    </li>
                    <li>
                        <Link to="/creators"><span className="sidebar-icons"><FaUser /></span>Creators</Link>
                    </li>
                    <li>
                        <Link to="/cookbooks"><span className="sidebar-icons"><FaCookie /></span>Cookbooks</Link>
                    </li>
                </ul>
            </nav>
            <nav aria-label="Sidebar social media Navigation" className="sidebar-nav social-media-nav">
                <ul>
                    <li>
                        <a href="https://www.instagram.com/letsgetkitched/"><span className="sidebar-icons"><FaInstagram /></span>Instragram</a>
                    </li>
                    <li>
                        <a href="https://www.tiktok.com/@letsgetkitched"><span className="sidebar-icons"><FaTiktok /></span>TikTok</a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com/@letsgetkitched"><span className="sidebar-icons"><FaYoutube /></span>Youtube</a>
                    </li>
                </ul>
            </nav>
        </aside>
    )

}
export default SideBar;