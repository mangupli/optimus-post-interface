import './header.scss'

const Header = () => {
    return(
        <header>
            <div className="container">
                <div className="header__wrapper">
                    <a href="#" className="logo header__logo">
                        <div className="logo__img"></div>
                        <h1 className="logo__title">Московский постамат</h1>                    
                    </a>
                </div>
            </div>      
        </header>
    );
}

export default Header;