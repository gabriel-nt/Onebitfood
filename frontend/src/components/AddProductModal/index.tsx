import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { useCallback, useState } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

import { ProductProps, RestaurantProps, CartRecoilProps } from '../../dtos';
import { formatCurrency } from '../../utils/formatCurrency';
import { formatString } from '../../utils/formatString';
import cartState from '../../store/atoms/cartAtom';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  product: ProductProps;
  restaurant: RestaurantProps;
}

const AddProductModal = ({ onHide, show, product, restaurant }: ModalProps) => {
  const [cart, setCart] = useRecoilState<CartRecoilProps>(cartState);
  const [quantity, setQuantity] = useState('1');

  const handleAddToCart = useCallback((e) => {
    e.preventDefault();
    const addProduct = { ...product, ...{ 'quantity': quantity } }

    if (cart.restaurant.id != restaurant.id) {
      setCart({ restaurant: restaurant, products: [addProduct] });
    } else {
      const findProduct = cart.products.find((item) => item.id === addProduct.id);

      if (findProduct) {
        const updateProducts = cart.products.map((item) => {
          if (item.id === findProduct.id) {
            return {
              ...item,
              quantity: String(Number(item.quantity) + Number(addProduct.quantity))
            }
          }

          return item;
        });

        setCart({ restaurant: restaurant, products: updateProducts })
      } else {
        setCart({ restaurant: restaurant, products: [...cart.products, addProduct] })
      }
    }

    setQuantity('1');
    onHide();
  }, [product, restaurant, quantity]);

  if (!product)
    return null;

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
        <h5 className='fw-bold mt-2'>Adicionar produto</h5>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Image
              src={product.image_url}
              alt={product.name}
              width={300}
              height={200}
            />
          </Col>
        </Row>
        <Row className="pb-0">
          <Col md={8}>
            <p className='fw-bold mb-0'>{product.name}</p>
          </Col>
          <Col>
            <small className='border px-1 border-custom-gray fw-bold'>
              {formatCurrency(product.price)}
            </small>
          </Col>
        </Row>
        <Row>
          <Col>
            <p><small>{formatString(product.description, 60)}</small></p>
          </Col>
        </Row>
        <Form onSubmit={handleAddToCart} className='d-flex'>
          <Form.Group>
            <Form.Control
              required
              type="number"
              placeholder="quantidade"
              min="1"
              step="1"
              name="quantidade"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value)
              }}
            />
          </Form.Group>
          <Button variant="custom-red"
            type="submit"
            className="text-white ms-6">
            Adicionar
         </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddProductModal;