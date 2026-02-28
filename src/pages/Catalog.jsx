import axios from "axios";
import styles from "./Catalog.module.css";
import Navbar from "../components/Navbar";
import { useEffect, useState, useMemo } from "react";
import VehicleDetailModal from "../components/VehicleDetailModal";

function Catalog (){
    const [vehicles, setVehicles] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [maxPrice, setMaxPrice] = useState(500000000);
    const [sortBy, setSortBy] = useState("default");
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const brands = ['BMW', 'TESLA', 'PORSCHE', 'TOYOTA', 'KIA', 'RENAULT', 'AUDI', 'JEEP', 'CARRITO'];


    useEffect (() =>{
        fetchVehicles();
    },[]);

    const fetchVehicles = async () =>{
        try{
            const respuesta = await axios.get("http://localhost:8080/api/vehicles");
            setVehicles(respuesta.data.content)

            const prices = respuesta.data.content.map(v => v.precio);
            if (prices.length > 0) setMaxPrice(Math.max(...prices));
        }catch(error){
            console.error("No fue posible obtener el catalogo de carros", error);
        }
    };


    const filteredVehicles = useMemo(() => {
        let result = [...vehicles];

        if (selectedBrands.length > 0) {
            result = result.filter(v => selectedBrands.includes(v.marca.toUpperCase()));
        }

        result = result.filter(v => v.precio <= maxPrice);

        if (sortBy === "low") result.sort((a, b) => a.precio - b.precio);
        if (sortBy === "high") result.sort((a, b) => b.precio - a.precio);

        return result;
    }, [vehicles, selectedBrands, maxPrice, sortBy]);


    const handleCloseClick = () =>{
        setSelectedVehicle(null);
        setIsModalOpen(false);
    }


    const handleSelectClick = async (vehicle) =>{
        try{
            const respuesta = await axios.get(`http://localhost:8080/api/vehicles/${vehicle.id}`);
            setSelectedVehicle(respuesta.data);
            setIsModalOpen(true);
        }catch(error){
            console.error("Error al obtener detalle del vehículo", error);
        }
    }


    const handleBrandChange = (brand) => {
        //revisar si la marca ya está en la lista para eliminarla o agregarla si no está
        setSelectedBrands(prev => 
            prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
        );
    };




    return (
        <div className={styles['catalog-page']}>
            {/* <Navbar /> */}
            
            <main className={styles['main-content']}>
                <aside className={styles['filter-sidebar']}>
                    <div className={styles['sidebar-header']}>
                        <h3>Filtros</h3>
                        <button 
                            className={styles['clear-btn']}
                            onClick={() => {setSelectedBrands([]); setSortBy("default")}}
                        >
                            Limpiar Filtros
                        </button>
                    </div>

                    <div className={styles['filter-section']}>
                        <h4>MARCA</h4>
                        <div className={styles['checkbox-group']}>
                            {brands.map(brand => (
                                <label key={brand} className={styles['checkbox-label']}>
                                    <input 
                                        type="checkbox" 
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => handleBrandChange(brand)}
                                    />
                                    {brand}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className={styles['filter-section']}>
                        <h4>RANGO DE PRECIOS</h4>
                        <div className={styles['price-display']}>
                            Hasta <span>${new Intl.NumberFormat().format(maxPrice)}</span>
                        </div>
                        <input 
                            type="range" 
                            min="0" 
                            max="500000000" 
                            step="1000000"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                            className={styles['price-slider']} 
                        />
                    </div>
                </aside>

                <section className={styles['inventory-container']}>
                    <header className={styles['inventory-header']}>
                        <div className={styles['header-text']}>
                            <h1>Catálogo de Vehiculos</h1>
                            <p>Se encontraron {filteredVehicles.length} resultados</p>
                        </div>
                        <div className={styles['header-actions']}>
                            <select 
                                className={styles['sort-select']}
                                onChange={(e) => setSortBy(e.target.value)}
                                value={sortBy}
                            >
                                <option value="default">Sin orden</option>
                                <option value="low">Precio: Menor a mayor</option>
                                <option value="high">Precio: Mayor a menor</option>
                            </select>
                        </div>
                    </header>

                    <div className={styles['vehicle-grid']}>
                        {filteredVehicles.map((v) => (
                            <div 
                                key={v.id} 
                                className={styles['vehicle-card']}
                                onClick={() => handleSelectClick(v)}
                            >
                                <div className={styles['image-container']}>
                                    <img src={v.imageUrl} alt={v.modelo} />
                                </div>
                                
                                <div className={styles['card-body']}>
                                    <div className={styles['card-header-info']}>
                                        <h4 className={styles['v-title']}>{v.year} {v.marca} {v.modelo}</h4>
                                        <p className={styles['v-price']}>
                                            ${new Intl.NumberFormat().format(v.precio)} COP
                                        </p>
                                    </div>

                                    <div className={styles['spec-row']}>
                                        <div className={styles['spec-item']}>
                                            <span className={styles['spec-title']}>Kilometraje</span>
                                            <span className={styles['spec-value']}>{v.kilometraje.toLocaleString()} km</span>
                                        </div>
                                        <div className={styles['spec-item']}>
                                            <span className={styles['spec-title']}>Color</span>
                                            <span className={styles['spec-value']}>{v.color}</span>
                                        </div>
                                        <div className={styles['spec-item']}>
                                            <span className={styles['spec-title']}>Combustible</span>
                                            <span className={styles['spec-value']}>{v.gasolina}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <VehicleDetailModal 
                isModalOpen={isModalOpen}
                selectedVehicle={selectedVehicle}
                onClose={handleCloseClick}
                onRefresh={fetchVehicles}
            />
        </div>
    );
}

export default Catalog;