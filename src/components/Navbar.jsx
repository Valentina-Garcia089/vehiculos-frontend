import styles from "./Navbar.module.css"
import logo from "../assets/icons/logo.png"
import notifications from "../assets/icons/notifications.png"
import profile from "../assets/icons/profile.png"
import { NavLink } from 'react-router-dom';


function Navbar(){
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
                    <NavLink to="/inventory" className={({ isActive }) => isActive ? `${styles['nav-item']} ${styles['active']}` : styles['nav-item']}>
                        Inventario
                    </NavLink>
                    <NavLink to="/inquiries" className={({ isActive }) => isActive ? `${styles['nav-item']} ${styles['active']}` : styles['nav-item']}>
                        Consultas
                    </NavLink>
                </div>
            </div>

            <div className={styles['nav-right']}>
                <button className={styles['nav-notif']}>
                    <img src={notifications} alt="Notificaciones" />
                </button>
                <div className={styles['nav-profile']}>
                    <div className={styles['user-text']}>
                        <span className={styles['user-name']}>Admin Usuario</span>
                        <span className={styles['user-role']}>Super Admin</span>
                    </div>
                    <div className={styles['user-avatar']}>
                        <img src={profile} alt="Icono del perfil de usuario"/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar