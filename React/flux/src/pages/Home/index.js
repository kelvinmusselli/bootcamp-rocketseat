import React from 'react';
import Tenis from '../../assets/images/tenis.jpg';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

const Home = () => {
  return (
    <ProductList>
      <li>
        <img src={Tenis} alt="Tênis" />
        <strong>Tênis</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src={Tenis} alt="Tênis" />
        <strong>Tênis</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src={Tenis} alt="Tênis" />
        <strong>Tênis</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src={Tenis} alt="Tênis" />
        <strong>Tênis</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
      <li>
        <img src={Tenis} alt="Tênis" />
        <strong>Tênis</strong>
        <span>R$ 129,90</span>
        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" />
          </div>
          <span>ADICIONAR AO CARRINHO</span>
        </button>
      </li>
    </ProductList>
  );
};

export default Home;
