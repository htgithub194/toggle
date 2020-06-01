import React from 'react';

const NavIcon = (props) => {
    return (
        <div className="my-1 col-4 nav-icon d-flex justify-content-center" onClick={props.onClick}>
            {props.imgSrc}
        </div>
    );
}

const iconEach = <svg className="active" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M4 14h4v-4H4v4zm0 5h4v-4H4v4zM4 9h4V5H4v4zm5 5h12v-4H9v4zm0 5h12v-4H9v4zM9 5v4h12V5H9z" /><path d="M0 0h24v24H0z" fill="none" /></svg>;
const iconList = <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M19 5v14H5V5h14m1.1-2H3.9c-.5 0-.9.4-.9.9v16.2c0 .4.4.9.9.9h16.2c.4 0 .9-.5.9-.9V3.9c0-.5-.5-.9-.9-.9zM11 7h6v2h-6V7zm0 4h6v2h-6v-2zm0 4h6v2h-6zM7 7h2v2H7zm0 4h2v2H7zm0 4h2v2H7z" /><path d="M0 0h24v24H0z" fill="none" /></svg>;
const iconSett = <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24"><g><path d="M0,0h24v24H0V0z" fill="none" /><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" /></g></svg>;

class AppNavBar extends React.Component {

    constructor(props) {
        super(props);
        this.func = props.model.funcs;
    }

    onClick_navIcon = (idx) => {
        let imgs = document.querySelectorAll(".AppNavBar .row svg");
        imgs.forEach(e => {
            e.classList.remove("active")
        });

        imgs[idx].classList.add("active");

        document.navBar_icon_click(idx);
    }

    render() {
        return (
            <div className="AppNavBar container my-2">
                <div className="row">
                    <NavIcon imgSrc={iconEach} onClick={() => this.onClick_navIcon(0)} />
                    <NavIcon imgSrc={iconList} onClick={() => this.onClick_navIcon(1)} />
                    <NavIcon imgSrc={iconSett} onClick={() => this.onClick_navIcon(2)} />
                </div>
            </div>
        );
    }
}

export default AppNavBar;
