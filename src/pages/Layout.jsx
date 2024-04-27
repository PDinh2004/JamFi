import { Outlet, Link } from "react-router-dom";
import './Layout.css';

const Layout = () => {
  return (
    <div>
      <nav>
        <div className="titleLogo">
            <Link id="title" to="/">
              <h1>JamFi</h1>
            </Link>
            <img src='https://static.vecteezy.com/system/resources/thumbnails/001/200/758/small/music-note.png' alt='music note' type='image/webp' id='musicLogo' style={{width: "45px", height: "45px"}}/>
        </div>
        
        <div className="post-button" key="post-button">
          <Link id='post-text' to="/share">
            <h3>Share Your Jam</h3>
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Layout;