import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { LogoIcon, LogoIconLetter, Menu } from 'src/assets/icons';
import { Button } from 'src/atoms';
import { EButtonVariants } from 'src/atoms/Button/Button.types';
import { useLogOut, useWindowWidth, useAppSelector } from 'src/hooks';
import { ListOfUsers } from 'src/molecules';

import styles from './Header.module.scss';

const Header: FC = () => {
  const user = useAppSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const logOut = useLogOut();
  const windowWidth = useWindowWidth();

  const isRoom = location.pathname.includes('/room');
  const menuButton = windowWidth && windowWidth < 1024 && isRoom;
  const logoImage = windowWidth && windowWidth < 1024 ? LogoIconLetter : LogoIcon;

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <img className={styles.logoIcon} src={logoImage} alt="Logo" />
      <p className={styles.username}>{user.username}</p>
      {menuButton ? (
        <>
          <Button variant={EButtonVariants.Transparent} onClick={openMenu} className={styles.menuButton}>
            <Menu />
          </Button>
          {isOpen && (
            <div onClick={closeMenu} className={styles.menu}>
              <ListOfUsers
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <Button onClick={logOut} className={styles.logOutMenu} variant={EButtonVariants.Brand} type="button">
                  Выйти
                </Button>
              </ListOfUsers>
            </div>
          )}
        </>
      ) : (
        <Button onClick={logOut} className={styles.logOut} variant={EButtonVariants.Brand} type="button">
          Выйти
        </Button>
      )}
    </header>
  );
};

export default Header;
