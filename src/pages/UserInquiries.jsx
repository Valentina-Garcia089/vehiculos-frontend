import Navbar from "../components/Navbar"
import styles from "./Inquiries.module.css"
import axios from "axios"

import { useEffect, useState } from "react";

function UserInquiries (){
    const [inquiries, setInquiries] = useState([]);
    const [selectedInquiry, setSelectedInquiry] = useState(null);
    //paginación
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() =>{
        fetchInquiries();
    },[]);

    const fetchInquiries = async (page = 0) =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`http://localhost:8080/api/inquiries/users/my-inquiries?page=${page}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setInquiries(respuesta.data.content)
            setTotalPages(respuesta.data.totalPages)
            setCurrentPage(page)
        }catch(error){
            console.error("No fue posible obtener la lista de consultas", error);
        }
    }



    return (
        <div className={styles['inquiries-page']}>
            <div className={styles['inquiries-container']}>
                
                <div className={styles['inquiries-list']}>
                    <header className={styles['list-header']}>
                        <h2>Consultas Recibidas</h2>
                        <p>Se cargaron {inquiries.length} consultas</p>
                    </header>

                    <div className={styles['cards-scroll-area']}>
                        {inquiries.map((inquiry) => (
                            <div 
                                key={inquiry.id} 
                                className={`${styles['inquiry-card']} ${selectedInquiry?.id === inquiry.id ? styles['active'] : ''}`}
                                onClick={() => setSelectedInquiry(inquiry)}
                            >
                                <div className={styles['vehicle-interest']}>
                                    <small>INTERESADO EN:</small>
                                    <p>{inquiry.vehicle.marca} {inquiry.vehicle.modelo} ({inquiry.vehicle.year})</p>
                                </div>
                                
                                <button className={styles['btn-view-details']}>Ver Detalles →</button>
                            </div>
                        ))}
                    </div>


                    <div className={styles['pagination']}>
                        <button 
                            disabled={currentPage === 0} 
                            onClick={() => fetchInquiries(currentPage - 1)}
                        > ‹ </button>
                        <span>{currentPage + 1} de {totalPages}</span>
                        <button 
                            disabled={currentPage >= totalPages - 1} 
                            onClick={() => fetchInquiries(currentPage + 1)}
                        > › </button>
                    </div>
                </div>


                <div className={styles['inquiry-detail-view']}>
                    {selectedInquiry ? (
                        <div className={styles['detail-content']}>
                            <section className={styles['info-section']}>
                                <h4>Vehículo de Interés</h4>
                                <div className={styles['vehicle-detail-card']}>
                                    <img src={selectedInquiry.vehicle.imageUrl} alt="Vehículo" />
                                    <div>
                                        <p><strong>{selectedInquiry.vehicle.marca} {selectedInquiry.vehicle.modelo}</strong></p>
                                        <p>${new Intl.NumberFormat().format(selectedInquiry.vehicle.precio)}</p>
                                    </div>
                                </div>
                                <div className={styles['info-vehicle']}>
                                        <p><strong>Año:</strong> {selectedInquiry.vehicle.year}</p>
                                        <p><strong>Combustible:</strong> {selectedInquiry.vehicle.gasolina}</p>
                                        <p><strong>Color:</strong> {selectedInquiry.vehicle.color}</p>
                                        <p><strong>Kilometraje:</strong> {selectedInquiry.vehicle.kilometraje}</p>
                                    </div>
                            </section>
                            <section className={styles['info-section']}>
                                <h4>Mensaje enviado</h4>
                                <div className={styles['comment-box']}>
                                    <p>{selectedInquiry.comentarios || "Sin comentarios adicionales."}</p>
                                </div>
                            </section>
                        </div>
                    ) : (
                        <div className={styles['no-selection-state']}>
                            <h3>Detalle de consulta</h3>
                            <p>Seleccione una consulta de la lista para gestionar la información</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserInquiries;
