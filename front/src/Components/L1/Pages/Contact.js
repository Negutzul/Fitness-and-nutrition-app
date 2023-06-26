import styles from './ContactPage.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
    <div className={styles["contact-section"]}>
      <h2>Contact Us</h2>
        <div className={styles.section}>
          <h3>Technical Problem</h3>
          <p>Phone: +40761644303</p>
          <p>Email: andrei.neagu1612@stud.acs.upb.ro</p>
        </div>

        <div className={styles.section}>
          <h3>Content Problem</h3>
          <p>Phone: +40761644303</p>
          <p>Email: neaguandrei47@yahoo.com</p>
        </div>
    </div>
  </div>
  );
  };
  
  export default Contact;