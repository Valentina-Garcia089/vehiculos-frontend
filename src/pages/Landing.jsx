import styles from "./Landing.module.css";
import bigCard from  "/fotograma-2.webp";
import smallCard from  "/fotograma-3.webp";
import BrandsCarousel from "../components/BrandsCarousel";
import { useNavigate } from 'react-router-dom';

function Landing (){
    const navigate = useNavigate();

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
                    <div className={styles['big-card']}>
                        <img src={bigCard} alt="Big Card" loading="eager" fetchpriority="high" />
                    </div>
                    <div className={styles['small-card']}>
                        <img src={smallCard} alt="Small Card" loading="eager" fetchpriority="high" />
                    </div>
                </div>

            </div>

            <BrandsCarousel />
        </div>
    )
}

export default Landing;