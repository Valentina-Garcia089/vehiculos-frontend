import styles from "./Navbar.module.css"
import logo from "../assets/icons/logo.png"
import notifications from "../assets/icons/notifications.png"
import profile from "../assets/icons/profile.png"
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";


function Navbar(){
    const [userRole, setUserRole] = useState(null);
    const [userName, setUserName] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                console.log("Token decodificado:", decoded);
                const rawRole = decoded.rol && decoded.rol.length > 0 ? decoded.rol[0] : null;
                const cleanRole = rawRole ? rawRole.replace("ROLE_", "") : null;
                const email = decoded.sub;
                const username = email.charAt(0);
                setUserName(username)
                setUserRole(cleanRole);
            } catch (error) {
                console.error("Error decodificando el token", error);
                localStorage.removeItem("token");
            }
        }
    }, []);

    const toggleMenu = () =>{
        setIsMenuOpen(!isMenuOpen);
    }


    const handleLogout = () => {
        localStorage.removeItem("token");
        setUserRole(null);
        setIsMenuOpen(false);
        navigate("/login");
    };



    return (
        <nav className={styles['navbar']}>
            <div className={styles['nav-left']}>
                <div className={styles['nav-logo']}>
                    <span className={styles['logo-icon']}>
                        <img src={logo} alt="Logo de BuscaTuVehiculo"/>
                    </span>
                    <h3>BuscaTuVehiculo</h3>
                </div>
                <div className={styles['nav-menu']}>
                    {userRole === "ADMIN" ? (
                        <>
                            <NavLink to="/inventory" className={({ isActive }) => isActive ? `${styles['nav-item']} ${styles['active']}` : styles['nav-item']}>
                            Inventario
                            </NavLink>
                            <NavLink to="/inquiries" className={({ isActive }) => isActive ? `${styles['nav-item']} ${styles['active']}` : styles['nav-item']}>
                                Consultas
                            </NavLink>
                        </>
                    ): (
                        ""
                    )}
                </div>
            </div>
            <div className={styles['nav-right']}>
                <div className={styles['nav-menu']}>
                    {(userRole === "USER" || userRole === "ADMIN") ? (
                        <div className={styles['nav-right']}>
                            <button className={styles['nav-notif']}>
                                <img src={notifications} alt="Notificaciones" />
                            </button>
                            <div 
                                className={styles['nav-profile']}
                                onClick={toggleMenu}
                            >
                                <span className={styles['user-role']} >{userRole}</span>
                                <div className={styles['user-avatar']}>
                                    {userName.toUpperCase()}
                                </div>

                                {isMenuOpen && (
                                    <div className={styles['dropdown-menu']}>
                                        <Link to="/profile" className={styles['dropdown-item']} onClick={() => setIsMenuOpen(false)}>
                                            Perfil
                                        </Link>
                                        <button className={styles['dropdown-item']} onClick={handleLogout}>
                                            Cerrar Sesión
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ): (
                        <div className={styles['nav-auth-buttons']}>
                            <Link to="/login" className={styles['btn-login']}>
                                Iniciar Sesión
                            </Link>
                            <Link to="/register" className={styles['btn-register']}>
                                Registrarse
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar