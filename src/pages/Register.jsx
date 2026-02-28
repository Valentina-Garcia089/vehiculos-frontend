import styles from "./Login.module.css"
import background from "../assets/background/haikei.png"

import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"

function Register (){
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        celular: ""
    })


    const handleChange = (e) =>{
        setFormData({
            ...formData, [e.target.name] : e.target.value
        });
    }


    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrorMsg("");

        try{
            const respuesta = await axios.post("http://localhost:8080/api/auth/register", formData);
            navigate("/login");

        }catch (error){
            setErrorMsg("Error al registrarse. Revise los datos");
            console.error("Error: ", error);
        }
    }




    return (
        <div className={styles['login-window']}>
            <div className={`${styles['login-container']} ${styles['reversed-container']}`}>
                <div className={styles['img-container']}>
                    <img 
                        src={background}
                        alt="Imagen de fondo para el Register"
                        className={styles['background-img']}
                    />
                </div>

                <form onSubmit={handleSubmit} className={styles['login-card']}>
                    <h2>BuscaTuVehiculo</h2>
                    <p className={styles['description']}>Crea una cuenta</p>

                    {errorMsg && <p className={styles['error-message']}>{errorMsg}</p>}

                    <input 
                        className={styles['login-input']}
                        type="text"
                        name="nombre"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className={styles['login-input']}
                        type="text"
                        name="apellido"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className={styles['login-input']}
                        type="email"
                        name="email"
                        placeholder="Correo electrónico"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className={styles['login-input']}
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <input 
                        className={styles['login-input']}
                        type="tel"
                        name="celular"
                        placeholder="Celular"
                        value={formData.celular}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className={styles['login-button']}>
                        Registrarse
                    </button>

                    <p className={styles['description']}>
                        ¿Ya tiene cuenta? <Link style={{color: 'var(--main-btn-color)'}} to="/login">Inicia sesión</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;