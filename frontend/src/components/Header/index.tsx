import Link from 'next/link';
import Image from 'next/image';
import { Navbar } from 'react-bootstrap';
import SearchBox from '../SearchBox';

const Header = () => {
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
        <SearchBox />
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Header;