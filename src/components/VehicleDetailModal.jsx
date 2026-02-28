import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import InquiryModal from "../components/InquiryModal"
import styles from "./VehicleDetailModal.module.css"

function VehicleDetailModal ({ isModalOpen, selectedVehicle, onClose, onRefresh }){
    const [selectedImage, setSelectedImage] = useState(null);
    const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    useEffect(() => {
        if (selectedVehicle) {
            setSelectedImage(selectedVehicle.imageUrl);
        }
    }, [selectedVehicle]);


    const handleInterestClick = () =>{
        const token = localStorage.getItem("token");
        if(!token){
            alert("Debe iniciar sesión para realizar una consulta sobre este vehiculo");
            onClose();
            navigate("/login");
        }else {
            setIsQueryModalOpen(true);
        }
    }



    if(!isModalOpen || !selectedVehicle) return null;


    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <div className={styles['modal-left']}>
                    <div className={styles['main-image-container']}>
                        <img src={selectedImage} alt="Imagen principal del vehiculo" />
                    </div>
                    <div className={styles['grid-image-container']}>
                        <div 
                            className={`${styles['image-thumb']} ${selectedImage === selectedVehicle.imageUrl ? styles['active'] : ''}`}
                            onClick={() => setSelectedImage(selectedVehicle.imageUrl)}
                        >
                            <img src={selectedVehicle.imageUrl} alt="Imagen principal minimizada" />
                        </div>

                        {selectedVehicle.imagenes && selectedVehicle.imagenes.map((url, index) => (
                            <div 
                                key={index} 
                                className={`${styles['image-thumb']} ${selectedImage === url.imageUrl ? styles['active'] : ''}`}
                                onClick={() => setSelectedImage(url.imageUrl)}
                            >
                                <img src={url.imageUrl} alt={`Imagen ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles['modal-right']}>
                    <div className={styles['modal-header']}>
                        <h2>{selectedVehicle.marca} {selectedVehicle.modelo}</h2>
                        <button onClick={onClose} className={styles['btn-close']}>&times;</button>
                    </div>

                    <h2 className={styles['modal-vehicle-price']}>${new Intl.NumberFormat().format(selectedVehicle.precio)} COP</h2>

                    <div className={styles['grid-cards-container']}>
                        <div className={styles['card-info-container']}>
                            <h4>Kilometraje</h4>
                            <p>{selectedVehicle.kilometraje} km</p>
                        </div>
                        <div className={styles['card-info-container']}>
                            <h4>Combustible</h4>
                            <p>{selectedVehicle.gasolina}</p>
                        </div>
                        <div className={styles['card-info-container']}>
                            <h4>Color</h4>
                            <p>{selectedVehicle.color}</p>
                        </div>
                        <div className={styles['card-info-container']}>
                            <h4>Año</h4>
                            <p>{selectedVehicle.year}</p>
                        </div>
                    </div>
                    <div className={styles['modal-description']}>
                        <h4>Descripción</h4>
                        <p>{selectedVehicle.descripcion}</p>
                    </div>
                    <button 
                        className={styles['btn-interest']} 
                        onClick={handleInterestClick}
                    >
                        Estoy interesado
                    </button>
                </div>
            </div>
            <InquiryModal
                isOpen={isQueryModalOpen} 
                onClose={() => setIsQueryModalOpen(false)}
                onRefresh={onRefresh}
                vehicleName={`${selectedVehicle.marca} ${selectedVehicle.modelo}`}
                vehicleId={selectedVehicle.id}
            />
        </div>
    );
}

export default VehicleDetailModal;