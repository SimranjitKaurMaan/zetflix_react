
const Navbar = () => {
   
    return (
        <>
        <nav className="navigation container">
            <a className="nav-brand link" href="/">ZETFLIX</a>
        <ul className="list-non-bullet nav-pills">
            <li className="list-item-inline">
                <a className="link link-active" href="/">Home</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">TV Shows</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">Movies</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">New and Popular</a>
            </li>
            <li className="list-item-inline">
                <a className="link" href="/">My List</a>
            </li>
        </ul>
    </nav>
        </>
    )
}

export default Navbar;