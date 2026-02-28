import React, { useEffect, useState } from 'react';
import axios from "axios"
import styles from './Profile.module.css';

function Profile (){
    const [user, setUser] = useState(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ nombre: "", apellido: "", celular: "" });

    useEffect (() =>{
        fetchProfile();
    }, [])

    const fetchProfile = async () => {
        try{
            const token = localStorage.getItem("token")
            const respuesta = await axios.get("http://localhost:8080/api/users/my-profile", {
                headers: {Authorization: `Bearer ${token}`}
            })
            setUser(respuesta.data);

            setFormData({
                nombre: respuesta.data.nombre,
                apellido: respuesta.data.apellido,
                celular: respuesta.data.celular || ''
            })

        }catch (error) {
            console.error("Error cargando perfil", error);
        }
    };


    const handleSave = async () =>{
        try{
            const token = localStorage.getItem("token");
            const respuesta = await axios.put("http://localhost:8080/api/users/my-profile", formData, {
                headers: {Authorization: `Bearer ${token}`}
            });

            setUser(respuesta.data);
            setIsEditing(false);
            alert("Tu perfil fue actualizado")
        }catch (error) {
            console.error("Error al actualizar", error);
            alert("No se pudo actualizar el perfil");
        }
    };


    const handleChange = (e) =>{
        //props y valores de las props
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }




    return (
        <div className={styles['container']}>
            <div className={styles['profile-card']}>
                <div className={styles['avatar-circle']}>
                    {formData.nombre?.charAt(0)}{formData.apellido?.charAt(0)}
                </div>
                
                <h2>Mi Perfil</h2>
                <p className={styles['subtitle']}>Gestiona tu información personal</p>

                <div className={styles['info-grid']}>
                    <div className={styles['info-item']}>
                        <label>Nombre</label>
                        {isEditing ? (
                            <input name="nombre" value={formData.nombre} onChange={handleChange} className={styles['edit-input']} />
                        ) : (
                            <p>{user?.nombre}</p>
                        )}
                    </div>
                    <div className={styles['info-item']}>
                        <label>Apellido</label>
                        {isEditing ? (
                            <input name="apellido" value={formData.apellido} onChange={handleChange} className={styles['edit-input']} />
                        ) : (
                            <p>{user?.apellido}</p>
                        )}
                    </div>

                    <div className={styles['info-item']}>
                        <label>Correo Electronico</label>
                        <p>{user?.email}</p>
                    </div>

                    <div className={styles['info-item']}>
                        <label>Celular</label>
                        {isEditing ? (
                            <input name="celular" value={formData.celular} onChange={handleChange} className={styles['edit-input']} />
                        ) : (
                            <p>{user?.celular || 'No registrado'}</p>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    <div className={styles['btn-group']}>
                        <button onClick={() => setIsEditing(false)} className={styles['btn-cancel']}>Cancelar</button>
                        <button onClick={handleSave} className={styles['btn-save']}>Guardar Cambios</button>
                    </div>
                ) : (
                    <button onClick={() => setIsEditing(true)} className={styles['btn-edit']}>Editar Datos</button>
                )}
            </div>
        </div>
    );
}

export default Profile