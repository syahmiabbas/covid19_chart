import React, { Component } from 'react'

import styles from './Footer.module.css';

export class Footer extends Component {
    render() {
        return (
            <footer className={styles.footer}>
                Made by Muhammad Syahmi Bin Abbas <span style={{color: '#e31b6d'}}>&copy;2020</span>
            </footer>
        )
    }
}

export default Footer
