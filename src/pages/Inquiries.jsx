import Navbar from "../components/Navbar"
import styles from "./Inquiries.module.css"
import axios from "axios"

import { useEffect, useState } from "react";

function Inquiries (){
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
            const respuesta = await axios.get(`http://localhost:8080/api/inquiries/admin?page=${page}`, {
                headers: {Authorization: `Bearer ${token}`}
            })
            setInquiries(respuesta.data.content)
            setTotalPages(respuesta.data.totalPages)
            setCurrentPage(page)
        }catch(error){
            console.error("No fue posible obtener la lista de consultas", error);
        }
    }


    const handleUpdateStatus = async (newStatus) =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios
            .put(`http://localhost:8080/api/inquiries/admin/${selectedInquiry.id}/status`, 
                {estado: newStatus},
                {headers: { Authorization: `Bearer ${token}` }}
            );

            await fetchInquiries(currentPage);
        
            setSelectedInquiry(prev => ({ ...prev, estado: newStatus }));
            alert(`Consulta marcada como ${newStatus}`);
        }catch (error) {
            console.error("Error al actualizar el estado", error);
            alert("No se pudo actualizar el estado de la consulta");
        }
    }




    return (
        <div className={styles['inquiries-page']}>
            <Navbar />
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
                                <div className={styles['card-main-info']}>
                                    <div className={styles['user-avatar-mini']}>
                                        {inquiry.user.nombre.charAt(0)}{inquiry.user.apellido.charAt(0)}
                                    </div>
                                    <div className={styles['text-content']}>
                                        <h4>{inquiry.user.nombre} {inquiry.user.apellido}</h4>
                                        <span className={styles['status-badge']} data-status={inquiry.estado}>
                                            {inquiry.estado}
                                        </span>
                                    </div>
                                </div>

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
                            <section className={styles['detail-header']}>
                                <div className={styles['profile-large']}>
                                    {selectedInquiry.user.nombre.charAt(0)}
                                </div>
                                <div>
                                    <h3>{selectedInquiry.user.nombre} {selectedInquiry.user.apellido}</h3>
                                </div>
                            </section>

                            <section className={styles['info-section']}>
                                <h4>Contacto</h4>
                                <div className={styles['info-grid']}>
                                    <p><strong>Email:</strong> {selectedInquiry.user.email}</p>
                                    <p><strong>Celular:</strong> {selectedInquiry.user.celular}</p>
                                </div>
                            </section>

                            <section className={styles['info-section']}>
                                <h4>Mensaje del Cliente</h4>
                                <div className={styles['comment-box']}>
                                    <p>{selectedInquiry.comentarios || "Sin comentarios adicionales."}</p>
                                </div>
                            </section>

                            <hr />

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

                            <div className={styles['actions-footer']}>
                                {selectedInquiry.estado === "PENDIENTE" && (
                                    <button 
                                        className={styles['contact-btn']}
                                        onClick={() => handleUpdateStatus("CONTACTADO")}
                                    >
                                        Marcar como contactado
                                    </button>
                                )}
                                {selectedInquiry.estado === "CONTACTADO" &&(
                                    <div className={styles['btns-container']}>
                                        <button 
                                            className={styles['rejected-btn']}
                                            onClick={() => handleUpdateStatus("RECHAZADO")}
                                        >
                                            Marcar como Rechazado
                                        </button>
                                        <button 
                                            className={styles['closed-btn']}
                                            onClick={() => handleUpdateStatus("CERRADO")}
                                        >
                                            Marcar como cerrado
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className={styles['no-selection-state']}>
                            <h3>Detalle de consulta</h3>
                            <p>Selecciona una consulta de la lista para gestionar la información del cliente</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Inquiries;
