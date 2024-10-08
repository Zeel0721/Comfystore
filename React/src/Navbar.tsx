import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { clearToken } from "./Features/tokenSlice";
import { setTheme } from "./Features/themeSlice";

export default function Navbar() {
  const mode = useSelector((state: RootState) => state.theme);
  const user = useSelector((state: RootState) => state.user.username);
  const accessToken = useSelector(
    (state: RootState) => state.token.accessToken
  );
  const dispatch = useDispatch();
  const changeTheme = () => {
    const themeSvg = document.querySelector(".theme-svg") as HTMLElement;
    themeSvg.classList.toggle("animate-theme-spin");
    setTimeout(() => dispatch(setTheme()), 100);
  };

  const logOut = (e: any) => {
    e.preventDefault();
    localStorage.removeItem("refreshToken");
    sessionStorage.removeItem("accessToken");
    dispatch(clearToken());
  };
  return (
    <>
      <header className="login-nav">
        <div className="mx-52">
          <div className="w-full flex justify-end header-item">
            {accessToken ? (
              <span className="user-name">Hello {user}</span>
            ) : (
              <Link to="/login">Sign in/Guest</Link>
            )}
            {accessToken ? (
              <Link to="" onClick={logOut}>
                Logout
              </Link>
            ) : (
              <Link to="signup">Create Account</Link>
            )}
          </div>
        </div>
      </header>
      <nav className="w-screen nav">
        <div className="flex justify-between items-center py-3 mx-52 nav-container">
          <div className="rounded-xl py-1.5 px-4 logo">
            <Link to="/" className="text-3xl cursor-pointer nav-item" id="logo">
              C
            </Link>
          </div>
          <div className="flex nav-links">
            <Link to="/" className="nav-item active" id="home">
              Home
            </Link>
            <Link to="/about" className="nav-item" id="about">
              About
            </Link>
            <Link to="/products" className="nav-item" id="products">
              Products
            </Link>
            <Link to="/cart" className="nav-item" id="cart">
              Cart
            </Link>
            <Link to="/checkout" className="nav-item" id="cart">
              Checkout
            </Link>
            <Link to="/order" className="nav-item" id="cart">
              Order
            </Link>
          </div>
          <div className="flex items-center overflow-hidden ui-links">
            <div className="theme-switch">
              <button
                className="nav-btn"
                id="toggle-theme"
                onClick={changeTheme}
              >
                {mode === "light" && (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="theme-svg moon swap-off h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"></path>
                  </svg>
                )}
                {mode === "dark" && (
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="theme-svg light swap-on h-4 w-4"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"></path>
                  </svg>
                )}
              </button>
            </div>
            <button className="nav-btn" id="cart">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 16 16"
                className="h-6 w-6"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l.84 4.479 9.144-.459L13.89 4H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <section className="h-full store-section">
        <Outlet />
      </section>
    </>
  );
}
