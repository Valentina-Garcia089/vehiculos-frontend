import styles from "./Footer.module.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles['footer-container']}>
            <div className={styles['footer-content']}>
                {/* Columna 1: Marca */}
                <div className={styles['footer-brand']}>
                    <span className={styles['footer-logo']}>BuscaTuVehículo</span>
                    <p>La excelencia y transparencia que necesitas en cada kilómetro.</p>
                </div>

                {/* Columna 2: Navegación */}
                <div className={styles['footer-links-column']}>
                    <h3>Explorar</h3>
                    <a href="/catalog">Catálogo</a>
                    <a href="/about">Nosotros</a>
                </div>

                {/* Columna 3: Contacto (Con datos falsos) */}
                <div className={styles['footer-links-column']}>
                    <h3>Contacto</h3>
                    <span className={styles['footer-info-text']}>contacto@buscatuvehiculo.com</span>
                    <span className={styles['footer-info-text']}>+57 (300) 123-4567</span>
                </div>

                {/* Columna 4: Políticas */}
                <div className={styles['footer-links-column']}>
                    <h3>Políticas</h3>
                    <a href="/privacy">Política de Privacidad</a>
                    <a href="/terms">Términos y Condiciones</a>
                </div>
            </div>

            <hr className={styles['footer-divider']} />

            <div className={styles['footer-bottom']}>
                <p>&copy; {currentYear} BuscaTuVehículo. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;