import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { Row, Col, Button } from 'react-bootstrap';

import { CartRecoilProps } from '../../dtos';
import cartState from '../../store/atoms/cartAtom';
import { formatString } from '../../utils/formatString';
import { formatCurrency } from '../../utils/formatCurrency';

const Cart = () => {
  const [cart, setCart] = useRecoilState<CartRecoilProps>(cartState);

  const subTotal = useMemo(() => cart.products.reduce(
    (a, b) => a + (b.price * parseFloat(b.quantity) || 0), 0
  ), [cart]);

  const total = useMemo(() => 
    cart.restaurant.delivery_tax 
  + subTotal, [subTotal]);

  if (cart.products.length === 0)
    return <p>Carrinho Vazio</p>

  const removeProduct = (product) => {
    const products = cart.products.filter((item) => item.id != product.id);
    setCart({ restaurant: { ...cart.restaurant }, products: products });
  }

  return (
    <>
      <h5 className='fw-bolder'>{cart.restaurant.name}</h5>
      <hr />
      {cart.products.map((product, i) =>
        <div key={i} className="mb-4">
          <Row>
            <Col md={8} xs={8}>
              <small className='fw-bolder'>{product.quantity}x {product.name}</small>
            </Col>
            <Col md={4} xs={4} className="text-right">
              <small >
                {formatCurrency(product.price)}
              </small>
            </Col>
          </Row>
          <Row className="mt-2">
            <Col md={8} xs={8}>
              <p><small>{formatString(product.description, 40)}</small></p>
            </Col>
            <Col md={4} xs={4} className="text-right">
              <Button
                size="sm"
                variant="outline-dark"
                onClick={() => removeProduct(product)}
                className='border px-1 border-custom-gray'
              >
                Remover
           </Button>
            </Col>
          </Row>
        </div>
      )}
      <hr />
      <Row className="mt-4">
        <Col md={8} xs={8}>
          <p>Subototal</p>
        </Col>
        <Col md={4} xs={4} className="text-right">
          <p>{formatCurrency(subTotal)}</p>
        </Col>
      </Row>
      <Row className="mt-n2">
        <Col md={8} xs={8}>
          <p>Taxa de entrega</p>
        </Col>
        <Col md={4} xs={4} className="text-right">
          <p>{formatCurrency(cart.restaurant.delivery_tax)}</p>
        </Col>
        <hr />
      </Row>
      <Row className="mb-4">
        <Col md={8} xs={8}>
          <p className='fw-bolder'>Total</p>
        </Col>
        <Col md={4} xs={4} className="text-right">
          <p className='fw-bolder'>{formatCurrency(total)}</p>
        </Col>
      </Row>
    </>
  )
}

export default Cart;