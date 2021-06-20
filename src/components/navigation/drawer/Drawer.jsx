import React, { Component } from 'react'
import styles from './Drawer.module.css'
import Backdrop from '../../UI/backDrop/Backdrop'
import { NavLink } from 'react-router-dom'

class Drawer extends Component {

    clickHeandler = () => {
        this.props.onClose()
    }
    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={link.active}
                        onClick={this.clickHeandler}
                    >
                        {this.label = link.label}
                    </NavLink>
                </li>

            )
        })
    }
    render() {
        const stl = [styles.Drawer]
        if (!this.props.isOpen) {
            stl.push(styles.close)
        }

        const links = [
            { to: '/', label: 'Sąrašas', exact: true }
        ]

        if (this.props.isAutenticated) {
            links.push({ to: '/quiz-creator', label: 'Sukūrti testą', exact: false })
            links.push({ to: '/logout', label: 'Išeiti', exact: false })
        } else {
            links.push({ to: '/auth', label: 'Autorizacija', exact: false })
        }

        return (
            <React.Fragment>
                <nav className={stl.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClose={this.props.onClose} /> : null}
            </React.Fragment>
        )

    }
}

export default Drawer