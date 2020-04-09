import React from 'react';
import logo from '../../assets/images/logo.svg';
import { Container, Cart } from './styles';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="ShoesShop" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>3 itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  );
};

export default Header;
