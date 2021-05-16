import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { useRecoilState, useResetRecoilState } from 'recoil';

import { AddressProps, CartRecoilProps } from '../../dtos';
import cartState from '../../store/atoms/cartAtom';
import addressState from '../../store/atoms/addressAtom';
import createOrder from '../../services/createOrder';

interface OrderProps extends AddressProps {
  name: string;
  phone_number: string;
  restaurant_id: number;
  order_products_attrubutes: Array<{
    product_id: number;
    quantity: string | number;
  }>;
}

const Order = () => {
  const router = useRouter();
  const [error, setError] = useState(null);

  const resetCart = useResetRecoilState(cartState);
  const [cart] = useRecoilState<CartRecoilProps>(cartState);
  const [address] = useRecoilState<AddressProps>(addressState);

  const [order, setOrder] = useState<OrderProps>({
    name: "",
    ...address,
    phone_number: "",
    order_products_attrubutes: cart.products.map(p => (
      { 'product_id': p.id, 'quantity': p.quantity }
    )),
    restaurant_id: cart.restaurant.id
  });

  const updateOrderState = (e: ChangeEvent<HTMLInputElement>) => {
    setOrder({ ...order, [e.target.name]: e.target.value })
  }

  const submitOrder = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await createOrder(order);
      router.push('/success');
      resetCart();
    } catch (error) {
      setError(true);
    }
  }

  return (
    <Form onSubmit={e => submitOrder(e)}>
      <h4 className='fw-bold mb-5'>Detalhes finais</h4>
      <Form.Group>
        <Form.Label>Nome completo</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Dennis Ritchie..."
          onChange={updateOrderState}
          value={order.name}
          name="name"
        />
      </Form.Group>
      <Form.Group className='mt-3'>
        <Form.Label>Número de telefone</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="(00) 00000-0000"
          onChange={updateOrderState}
          value={order.phone_number}
          name="phone_number"
        />
      </Form.Group>

      <div className="mt-5">
        <p className='fw-bolder'>Entregar em:</p>
        <p><small>{address.street} {address.number} {address.neighborhood}, {address.city}</small></p>
      </div>
      {cart.products.length > 0 &&
        <div className="text-center">
          <Button variant="custom-red" type="submit" size="lg" className="mt-4 text-white">
            Finalizar Pedido
         </Button>
        </div>
      }

      {error && <Alert variant='custom-red' className="mt-4"> Erro no pedido! </Alert>}
    </Form>
  )
}

export default Order;