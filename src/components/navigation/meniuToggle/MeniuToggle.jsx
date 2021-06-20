import React from 'react'
import classes from './MeniuToggle.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'


const MeniuToggle = (props) => {
    const cls = [
        classes.MeniuToggle
    ]
    let iconName
    if (props.isOpen) {
        iconName = faTimes
        cls.push(classes.open)
    } else { iconName = faBars }

    return (
        <FontAwesomeIcon
            icon={iconName}
            onClick={props.onToggle}
            className={cls.join(' ')}
        />
    )
}

export default MeniuToggle