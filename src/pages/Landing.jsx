import { useState, useEffect } from "react";
import styles from "./Landing.module.css"
import bigCard from  "/fotograma-2.png";
import smallCard from  "/fotograma-3.png";
import BrandsCarousel from "../components/BrandsCarousel";
import { useNavigate } from 'react-router-dom';

function Landing (){
    const navigate = useNavigate();

    const [scrolled, setScrolled] = useState(false); //¿El usuario hizo scroll hacia abajo?

    useEffect(() => {
        const handleScroll = () => {
            // Si baja más de 50px, activamos el efecto
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll); //se limpia el listener al desmontar el componente
    }, []);

    return(
        <div className={styles['landing-container']}>

            <div className={styles['landing-overlay']}>

                <div className={styles['landing-content']}>
                    <h1>Encuentra la excelencia en cada kilometro</h1>
                    <p>
                        Tu próximo destino comienza aqui. Selección de primer
                        nivel para que encuentres el vehículo que encaja perfectamente con tu estilo
                        de vida
                    </p>
                    <div className={styles['btn-container']}>
                        <button 
                            className={styles['btn-primary']}
                            onClick={() => navigate("/catalog")}
                        >
                            Compra tu carro
                        </button>
                    </div>
                </div>

                <div className={styles['cards-container']}>
                    {/* clase dinámica */}
                    <div className={`${styles['small-card']} ${scrolled ? styles['is-scrolled'] : ''}`}>
                        <img src={smallCard} alt="Small Card" />
                    </div>
                    <div className={styles['big-card']}>
                        <img src={bigCard} alt="Big Card" />
                    </div>
                </div>

            </div>

            <BrandsCarousel />
        </div>
    )
}

export default Landing;