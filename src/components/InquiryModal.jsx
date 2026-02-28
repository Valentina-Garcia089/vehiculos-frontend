import { useState, useEffect } from "react";
import styles from "./InquiryModal.module.css"
import axios from "axios"

function QueryModal ({ isOpen, onClose, onRefresh, vehicleId, vehicleName}){
    const [comments, setComments] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);

        const inquiryData = {
            vehicleId: vehicleId,
            comentarios: comments
        };

        
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios.post("http://localhost:8080/api/inquiries", inquiryData, {
                headers: {Authorization: `Bearer ${token}`}
            })

            alert("El envio fue exitoso");
            setComments("");
            onClose()

        }catch (error) {
            console.error("Error al enviar la consulta", error);
            alert("No se pudo enviar la consulta. Intenta de nuevo");
        } finally {
            setLoading(false);
        }
    }





    if(!isOpen) return null;


    return (
        <div className={styles['mini-overlay']}>
            <div className={styles['mini-content']}>
                <h3>Consultar por: {vehicleName}</h3>
                <form onSubmit={handleSubmit}>
                    <label>Déjanos tus dudas:</label>
                    <textarea 
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Ej: ¿Aceptan peritaje?"
                        required
                    />
                    <div className={styles['actions']}>
                        <button type="button" onClick={onClose} className={styles['btn-cancel']}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles['btn-send']} disabled={loading}>
                            {loading ? "Enviando..." : "Enviar Consulta"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default QueryModal