import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { FaCrosshairs, FaShoppingBag } from 'react-icons/fa';

import SearchBox from '../SearchBox';
import CartModal from '../CartModal';
import AddressModal from '../AddressModal';

const Header = () => {
  const [cartModalShow, setCartModalShow] = useState(false)
  const [addressModalShow, setAddressModalShow] = useState(false)

  return (
    <Navbar bg="white" expand="lg" className="border-bottom border-custom-gray">
      <Navbar.Brand className="mx-3">
        <Link href="/restaurants">
          <a>
            <Image
              src="/logo.png"
              alt="OneBitFood"
              width={200}
              height={44}
              className="clickable-effect"
            />
          </a>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
        <Nav className="me-lg-4 me-sm-0 py-2 text-center">
          <span className="clickable-effect" onClick={() => setCartModalShow(true)}>
            <FaShoppingBag className='mb-1' /> Carrinho
         </span>
          <CartModal
            show={cartModalShow}
            onHide={() => setCartModalShow(false)}
            onShow={() => setCartModalShow(true)}
          />
        </Nav>
        <Nav className="py-2 text-center">
          <span className="clickable-effect" onClick={() => setAddressModalShow(true)}>
            <FaCrosshairs className='mb-1' /> Endereço
         </span>
          <AddressModal
            show={addressModalShow}
            onHide={() => setAddressModalShow(false)}
            onShow={() => setAddressModalShow(true)}
          />
        </Nav>
        <SearchBox />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;