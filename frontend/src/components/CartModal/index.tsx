import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { Modal, Button } from 'react-bootstrap';

import Cart from '../Cart';
import { CartRecoilProps } from '../../dtos';
import cartState from '../../store/atoms/cartAtom';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  onShow: () => void;
}

const CartModal = ({ onHide, show, onShow }: ModalProps) => {
  const [cart, setCart] = useRecoilState<CartRecoilProps>(cartState);

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      keyboard={false}
      onHide={() => onHide()}
    >
      <Modal.Header>
        <h5 className='fw-bold mt-2'>Carrinho</h5>
      </Modal.Header>
      <Modal.Body>
        <Cart />
        {
          cart.products.length > 0 && (
            <div className="text-center pt-2">
              <Link href="/checkout">
                <Button variant="custom-red" className="text-white" onClick={() => onHide()}>
                  Finalizar pedido
                </Button>
              </Link>
            </div>
          )
        }
      </Modal.Body>
    </Modal>
  )
}

export default CartModal;