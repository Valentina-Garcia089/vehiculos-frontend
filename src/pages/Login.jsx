import styles from "./Login.module.css"
import background from "../assets/background/haikei.png"

import { useNavigate } from 'react-router-dom';
import { useState } from "react"
import axios from "axios"

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(""); //solo en caso de que se tenga un error

    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setErrorMsg("");

        try{
            //envio a la api en java
            const respuesta = await axios.post("http://localhost:8080/api/auth/login",{
                email : email,
                password : password
            });

            //verificación del token recibido:
            console.log("token: ", respuesta.data.token);
            localStorage.setItem("token", respuesta.data.token);

            navigate("/inventory"); //después del submit ya lleva a la pagina de inventario
        } catch (error){
            setErrorMsg("Tus datos no son correctos");
            console.error("Error: ", error);
        }
    };


    
    return (
        <>
            <div className={styles['login-window']}>
                <div className={styles['login-container']}>
                    <div className={styles['img-container']}>
                        <img 
                            src={background}
                            alt="Imagen de fondo para el Login"
                            className={styles['background-img']}
                        />
                    </div>

                    <form onSubmit={handleSubmit} className={styles['login-card']}>
                        <h2>BuscaTuVehiculo</h2>
                        <p className={styles['description']}>Ingresa a tu cuenta</p>

                        {errorMsg && <p className={styles['error-message']}>{errorMsg}</p>}

                        <input 
                            className={styles['login-input']}
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} //cualquier cambio al presionar una letra o borrar 
                        />

                        <input 
                            className={styles['login-input']}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button type="submit" className={styles['login-button']}>
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login