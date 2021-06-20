import React, { Component } from 'react'
import styles from './Layout.module.css'
import MeniuToggle from '../../components/navigation/meniuToggle/MeniuToggle';
import Drawer from '../../components/navigation/drawer/Drawer';
import { connect } from 'react-redux';

class Layout extends Component {

    state = {
        meniu: false
    }

    ToggleMeniuHandler = () => {
        this.setState({
            meniu: !this.state.meniu
        })
    }
    meniuCloseHeandler = () => {
        this.setState({ meniu: false })
    }

    render() {
        return (
            <div className={styles.Layout}>
                <Drawer
                    isOpen={this.state.meniu}
                    onClose={this.meniuCloseHeandler}
                    isAutenticated={this.props.isAutenticated}
                />
                <MeniuToggle
                    onToggle={this.ToggleMeniuHandler}
                    isOpen={this.state.meniu}
                />
                <main>
                    {this.props.children}
                </main>
            </div>
        )

    }
}

function mapStateToProps(state) {
    return {
        isAutenticated: !!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout) 