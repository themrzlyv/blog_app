import styles from './styles/Footer.module.scss'

const Footer = () => {
    return (
        <div className={`container-fluid ${styles.container}`}>
            <div className="row d-flex justify-content-end">
                <div className={`col-lg-4 ${styles.logo}`}>
                    <h4>&#169; Copyright by THEMRZLYV</h4>
                </div>
            </div>
        </div>
    )
}

export default Footer;
