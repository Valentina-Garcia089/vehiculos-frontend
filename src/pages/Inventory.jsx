import Navbar from "../components/Navbar"
import deleteIcon from "../assets/icons/delete-icon.png"
import editIcon from "../assets/icons/edit-icon.png"
import axios from "axios"
import styles from "./Inventory.module.css"
import VehicleModal from "../components/VehicleCreateModal";

import { useEffect, useState } from "react";

function Inventory() {
    const [vehicles, setVehicles] = useState([]); //lista de vehiculos
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);


    //guardar el vehiculo para poderlo editar
    const handleEditClick = async (vehicle) =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios.get(`http://localhost:8080/api/vehicles/${vehicle.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setSelectedVehicle(respuesta.data);
            setIsModalOpen(true);
        }catch (error) {
            console.error("Error al obtener detalle del vehículo", error);
        }
    }

    const handleCreateClick = () =>{
        setSelectedVehicle(null);
        setIsModalOpen(true);
    }


    const handleDeleteClick = async (id) =>{
        const confirmar = window.confirm("¿Está seguro de eliminar este vehículo? Esta acción no se puede deshacer");
        
        if (!confirmar) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/vehicles/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            fetchVehicles(); 
            alert("Vehículo eliminado con éxito");
        } catch (error) {
            console.error("Error al eliminar:", error);
            alert("No se pudo eliminar el vehículo. Verifica los permisos.");
        }
    }

    const fetchVehicles = async () =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios.get("http://localhost:8080/api/vehicles/inventory", {
                headers: { Authorization: `Bearer ${token}` }
            });

            setVehicles(respuesta.data.content);
        }catch(error){
            console.error("No fue posible obtener la lista de carros", error);
        }
    };

    useEffect(() => {
        //a penas cargue la pagina
        fetchVehicles();
    },[])



    return (
        <div className={styles['inventory-page']}>
            <Navbar />
            
            <main className={styles['inventory-content']}>
                <header className={styles['inventory-header']}>
                    <div>
                        <h1>Gestión de Inventario</h1>
                        <p className={styles['description']}>Panel de control administrativo</p>
                    </div>
                    <button 
                        className={styles['btn-add']}
                        onClick={handleCreateClick}
                    >
                        + NUEVO VEHÍCULO</button>
                </header>

                <section className={styles['card-container']}>
                    <div className={styles['card']}>
                        <span>TOTAL UNIDADES</span>
                        <h2>{vehicles.length}</h2>
                    </div>
                </section>

                <div className={styles['table-container']}>
                    <table className={styles['inventory-table']}>
                        <thead>
                            <tr>
                                <th>VEHÍCULO</th>
                                <th>DETALLES</th>
                                <th>PRECIO</th>
                                <th>ACCIONES</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((v) => (
                                <tr key={v.id}>
                                    <td>
                                        <div className={styles['vehicle-info']}>
                                            <div className={styles['img-container']}>
                                                <img src={v.imageUrl} alt="imagen principal del vehiculo" />
                                            </div>
                                            <div className={styles['info-container']}>
                                                <strong>{v.marca} {v.modelo}</strong>
                                                <span>ID: ADM-{v.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles['vehicle-details']}>
                                            <div className={styles['details-top-container']}>
                                                {v.gasolina}
                                            </div>
                                            {v.year} - {v.kilometraje} km
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles['vehicle-price']}>
                                            ${new Intl.NumberFormat().format(v.precio)}
                                        </div>
                                    </td>
                                    <td>
                                        <div className={styles['actions']}>
                                            <button 
                                                onClick={() => handleEditClick(v)} 
                                                className={styles['btn-edit']} 
                                                title="Editar"
                                            >
                                                <img src={editIcon} alt="editar vehiculo" />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(v.id)}
                                                className={styles['btn-delete']} 
                                                title="Eliminar"
                                            >
                                                <img src={deleteIcon} alt="eliminar vehiculo" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <VehicleModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onRefresh={fetchVehicles} //muestra nuevamente el inventario
                vehicleToEdit={selectedVehicle}
            />
        </div>
    );
}

export default Inventory