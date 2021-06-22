import React from 'react'
import styles from  './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.footerText}>Author: Vittorio Schiavon</p>
            <p className={styles.footerText}>Copyright: Syncl Lab S.p.A</p>
            <p className={styles.footerText}>Copyright 1999-2021 by Refsnes Data. All Rights Reserved.</p>
        </footer>

    )
}
