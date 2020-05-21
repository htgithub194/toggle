import React from 'react';

const NavIcon = (props) => {
    return (
        <div className="col-4 nav-icon d-flex justify-content-center" onClick={props.onClick}>
            <img src={props.imgSrc} className="my-1"/>
        </div>
    );
}

class AppNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.func = props.model.funcs;
    }

    render() {
        return (
            <div className="AppNavBar container my-2">
                <div className="row">
                    <NavIcon imgSrc='./view_list-24px.svg' onClick={() => this.func.navBar_icon_click({ idx: 0 })} />
                    <NavIcon imgSrc='./list_alt-24px.svg' onClick={() => this.func.navBar_icon_click({ idx: 1 })} />
                    <NavIcon imgSrc='./settings-24px.svg' onClick={() => this.func.navBar_icon_click({ idx: 2 })} />
                </div>
            </div>
        );
    }
}

export default AppNavBar;
