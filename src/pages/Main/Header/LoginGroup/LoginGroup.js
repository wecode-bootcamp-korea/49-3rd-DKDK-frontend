import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginGroup.scss';

const LoginGroup = ({ isMouseIn, mouseInEvent, mouseOutEvent }) => {
  const [isToken, setIsToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsToken(true);
    } else {
      setIsToken(false);
    }
  }, []);

  useEffect(() => {
    const handleToken = e => {
      if (e.key === 'accessToken') {
        if (e.newValue) {
          setIsToken(true);
        } else {
          setIsToken(false);
        }
      }
    };

    window.addEventListener('storage', handleToken);

    return () => {
      window.removeEventListener('storage', handleToken);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userType');
    localStorage.removeItem('isSubscribed');
    setIsToken(false);
    navigate('/');
  };

  const goMy = () => {
    navigate('/my-page');
  };

  return (
    <div className="loginGroupWrap">
      {isToken ? (
        <>
          <button
            type="button"
            onMouseEnter={mouseInEvent}
            onMouseLeave={mouseOutEvent}
            className="mypageBtn"
            onClick={goMy}
          >
            마이페이지
          </button>
          {isMouseIn && (
            <div
              className="dropdown"
              onMouseEnter={mouseInEvent}
              onMouseLeave={mouseOutEvent}
            >
              <ul className="dropdownList">
                <li className="dropdownItem">
                  <Link to="/record" className="itemPath">
                    운동 기록
                  </Link>
                </li>
                <li className="dropdownItem">
                  <button
                    type="button"
                    className="itemPathBtn"
                    onClick={logout}
                  >
                    로그아웃
                  </button>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <Link to="/login" className="loginPath">
          로그인/회원가입
        </Link>
      )}
    </div>
  );
};

export default LoginGroup;
