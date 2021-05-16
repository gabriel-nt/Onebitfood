import { Row, Col, Card } from 'react-bootstrap';

import Cart from '../components/Cart';
import Order from '../components/Order';

const Checkout = () => {
  return (
    <Row className='justify-content-md-center'>
      <Col md={{ span: 4 }}>
        <Card className='p-5 mb-4'>
          <Cart />
        </Card>
      </Col>
      <Col md={{ span: 4 }}>
        <Card className='p-5 mb-4'>
          <Order />
        </Card>
      </Col>
    </Row>
  )
}

export default Checkout;