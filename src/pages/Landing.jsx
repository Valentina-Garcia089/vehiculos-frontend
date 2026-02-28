import styles from "./Landing.module.css"
import videoBg from "../assets/videos/landing-video.mp4";
import { useNavigate } from 'react-router-dom';

function Landing (){
    const navigate = useNavigate();

    return(
        <div className={styles['landing-container']}>
            <video 
                src={videoBg} 
                autoPlay
                loop
                muted
                playsInline
                className={styles['video-bg']} 
            />

            <div className={styles['landing-overlay']}></div>

            <div className={styles['landing-content']}>
                <h1>Encuentra la excelencia en cada kilometro</h1>
                <p>
                    Tu próximo destino comienza aqui. Transparencia total y una selección de primer
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
        </div>
    )
}

export default Landing;