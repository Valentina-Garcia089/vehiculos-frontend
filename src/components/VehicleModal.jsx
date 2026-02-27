import axios from "axios"
import styles from "./VehicleModal.module.css"

import { useEffect, useState } from "react";


function VehicleModal ({ isOpen, onClose, onRefresh, vehicleToEdit = null }){
    const [imageUrlInput, setImageUrlInput] = useState(""); //input texto

    //al cargar el modal debe desactivarse el scroll de inventario
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    const [formData, setFormData] = useState({
        marca: "",
        modelo: "",
        color: "",
        year: "",
        precio: "",
        kilometraje: "",
        gasolina: "GASOLINA",
        descripcion: "",
        disponible: true,
        imageUrl: "",
        imagenes: []
    });


    //para editar un vehiculo
    useEffect(() => {
        if(isOpen){
            if(vehicleToEdit){
                setFormData({
                    ...vehicleToEdit,
                    imagenes: vehicleToEdit.imagenes?.map(img => img.imageUrl) || []
                })
            }else{
                setFormData({
                    marca: "",
                    modelo: "",
                    color: "",
                    year: "",
                    precio: "",
                    kilometraje: "",
                    gasolina: "GASOLINA",
                    descripcion: "",
                    disponible: true,
                    imageUrl: "",
                    imagenes: []
                })
            }
        }
    }, [vehicleToEdit, isOpen])



    const addImageUrl = () => {
        if (imageUrlInput.trim() !== "") {
            //copia de todas las img en imagenes más la del input
            const nuevasUrls = [...formData.imagenes, imageUrlInput];
            setFormData({
            ...formData,
            imagenes: nuevasUrls,
            //si es la primera imagen en agregarse queda como portada
            imageUrl: formData.imageUrl === "" || formData.imageUrl.includes("url-de-tu-imagen") 
                    ? imageUrlInput 
                    : formData.imageUrl
        });
            setImageUrlInput("");
        }
    };


    const removeImageUrl = (indexToRemove) => {
        setFormData({
            ...formData,
            imagenes: formData.imagenes.filter((_, index) => index !== indexToRemove)
        });
    };

    const removePrincipalImage = () => {
        //TODO- REVISAR LA PERSISTENCIA PORQUE AL REFRESCAR, LA IMAGEN SIGUE HACIENDO PARTE DE LA GALERIA
        setFormData(prev => {
            const tieneGaleria = prev.imagenes.length > 0;
            
            //si la galería tiene elementos, el primero pasa a ser la imagen principal
            const nuevaPrincipal = tieneGaleria ? prev.imagenes[0] : "";

            //si se sube a principal, hay que quitarla de la galeria para que no quede repetida
            const nuevasSecundarias = tieneGaleria 
                ? prev.imagenes.filter((_, index) => index !== 0) 
                : [];

            return {
                ...prev,
                imageUrl: nuevaPrincipal,
                imagenes: nuevasSecundarias
            };
        });
    };


    //actualizar estado cuando se escribe - todos los input
    const handleChange = (e) =>{
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? (value === '' ? '' : Number(value)) : value
        });
    };


    const handleSubmit = async (e) =>{
        e.preventDefault()

        try{
            const token = localStorage.getItem("token");
            const url = vehicleToEdit ?
                `http://localhost:8080/api/vehicles/${vehicleToEdit.id}`
                :"http://localhost:8080/api/vehicles";

            const metodo = vehicleToEdit ? axios.put : axios.post;

            await metodo(url, formData, {
                headers: {Authorization: `Bearer ${token}`}
            });
            onRefresh();
            onClose();
        }catch (error) {
            if (error.response) {
                console.error("Error del servidor (Data):", error.response.data);
                console.error("Estado del error:", error.response.status);
            } else {
                console.error("Error de red o configuración:", error.message);
            }
        }
    };


    if(!isOpen) return null




    return (
        <div className={styles['modal-overlay']}>
            <div className={styles['modal-content']}>
                <header className={styles['modal-header']}>
                    <h2>Registrar Nuevo Vehículo</h2>
                    <button onClick={onClose} className={styles['btn-close']}>&times;</button>
                </header>

                <form onSubmit={handleSubmit} className={styles['modal-form']}>
                    <div className={styles['form-grid']}>
                        <label className={styles['label-group']}>
                            <span>Marca</span>
                            <input value={formData.marca} type="text" id="marca" name="marca" placeholder="Ej: Toyota" onChange={handleChange} required />
                        </label>
                        
                        <label className={styles['label-group']}>
                            <span>Modelo</span>
                            <input value={formData.modelo} type="text" name="modelo" placeholder="Ej: Corolla" onChange={handleChange} required />
                        </label>

                        <label className={styles['label-group']}>
                            <span>Color</span>
                            <input value={formData.color} type="text" name="color" placeholder="Ej: negro" onChange={handleChange} required/>
                        </label>
                        
                        <label className={styles['label-group']}>
                            <span>Año</span>
                            <input value={formData.year} type="number" name="year" placeholder="Ej: 2010" onChange={handleChange} required />
                        </label>
                        
                        <label className={styles['label-group']}>
                            <span>Precio</span>
                            <input value={formData.precio} type="number" name="precio" placeholder="Ej: precio" onChange={handleChange} required />
                        </label>
                        
                        <label className={styles['label-group']}>
                            <span>Kilometraje</span>
                            <input value={formData.kilometraje} type="number" name="kilometraje" placeholder="Ej: 200" onChange={handleChange} required />
                        </label>
                        
                        <label className={styles['label-group']}>
                            <span>Tipo de combustible</span>
                            <select value={formData.gasolina} name="gasolina" onChange={handleChange}>
                                <option value="GASOLINA">Gasolina</option>
                                <option value="DIESEL">Diesel</option>
                                <option value="ELECTRICO">Eléctrico</option>
                                <option value="HIBRIDO">Híbrido</option>
                            </select>
                        </label>
                    </div>
                    <label className={styles['label-group']}>
                        <span>Descripción</span>
                        <textarea value={formData.descripcion} name="descripcion" placeholder="Descripción del vehículo" onChange={handleChange}></textarea>
                    </label>
                    

                    <div className={styles['gallery-section']}>
                        <h4>Galería de Imágenes</h4>
                        <div className={styles['image-input-group']}>
                            <input 
                                type="text" 
                                placeholder="Pegar URL de la imagen" 
                                value={imageUrlInput}
                                onChange={(e) => setImageUrlInput(e.target.value)}
                            />
                            <button type="button" onClick={addImageUrl} className={styles['btn-add-img']}>
                                Agregar
                            </button>
                        </div>

                        <div className={styles['image-preview-grid']}>
                            {formData.imageUrl && (
                                <div className={`${styles['image-thumb']} ${styles['main-cover']}`}>
                                    <img src={formData.imageUrl} alt="Imagen principal" />
                                    <button 
                                        type="button" 
                                        onClick={removePrincipalImage}
                                        className={styles['btn-remove-principal']}
                                    >
                                        &times;
                                    </button>
                                </div>
                            )}
                            {formData.imagenes.map((url, index) => (
                                <div key={index} className={styles['image-thumb']}>
                                    <img src={url} alt="Imagen del vehiculo" />
                                    <button 
                                        type="button" 
                                        onClick={() => removeImageUrl(index)}
                                        className={styles['btn-remove-img']}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className={styles['form-actions']}>
                        <button type="button" onClick={onClose} className={styles['btn-cancel']}>Descartar</button>
                        <button type="submit" className={styles['btn-save']}>Guardar Vehículo</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default VehicleModal;