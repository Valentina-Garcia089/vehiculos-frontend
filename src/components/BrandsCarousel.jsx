import styles from "./BrandsCarousel.module.css";
import toyota from "../assets/brands/toyota.webp";
import ford from "../assets/brands/ford.svg";
import bmw from "../assets/brands/bmw.svg";
import mazda from "../assets/brands/mazda.png";
import renault from "../assets/brands/renault.png";
import kia from "../assets/brands/kia.webp";
import chevrolet from "../assets/brands/chevrolet.png";
import nissan from "../assets/brands/nissan.svg";
import volkswagen from "../assets/brands/volks.webp";

const BRANDS_DATA = [
    { id: 1, name: "Toyota", icon: toyota },
    { id: 2, name: "Ford", icon: ford },
    { id: 3, name: "BMW", icon: bmw },
    { id: 4, name: "Mazda", icon: mazda },
    { id: 5, name: "Renault", icon: renault },
    { id: 6, name: "Kia", icon: kia },
    { id: 7, name: "Chevrolet", icon: chevrolet },
    { id: 8, name: "Nissan", icon: nissan },
    { id: 9, name: "Volkswagen", icon: volkswagen }
];

function BrandsCarousel() {
    const doubleBrands = [...BRANDS_DATA, ...BRANDS_DATA];

    return (
        <section className={styles['brands-section']}>
            <h2 className={styles['brands-title']}>Explora por marcas líderes</h2>
            
            <div className={styles['carousel-container']}>
                <div className={styles['carousel-track']}>
                    {doubleBrands.map((brand, index) => {
                        const isImage = typeof brand.icon === 'string' && 
                            (brand.icon.includes('.') || brand.icon.startsWith('data:'));

                        return (
                            <div key={`${brand.id}-${index}`} className={styles['brand-card']}>
                                <div className={styles['icon-wrapper']}>
                                    {isImage ? (
                                        <img 
                                            src={brand.icon} 
                                            alt={brand.name} 
                                            className={styles['brand-image']} 
                                        />
                                    ) : (
                                        <span className={styles['brand-icon']}>{brand.icon}</span>
                                    )}
                                </div>
                                <span className={styles['brand-name']}>{brand.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default BrandsCarousel;