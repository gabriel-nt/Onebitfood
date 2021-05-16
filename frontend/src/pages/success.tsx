import Image from 'next/image'
import { Row, Col, Card } from 'react-bootstrap';

const Success = () => (
  <Row className="mt-4 justify-content-md-center">
    <Col md={{ span: 4 }}>
      <Card className="mt-6 px-4 py-4">
        <h4 className='fw-bold'>Pedido a caminho</h4>
        <p className="mt-2">Em breve você receberá sua comida em casa!</p>

        <Row className="my-4 justify-content-md-center">
          <Col md={{ span: 10 }}>
            <Image
              src='/status-ok.png'
              alt='Sucesso no pedido'
              width={100}
              height={100}
              layout="responsive"
            />
          </Col>
        </Row>
      </Card>
    </Col>
  </Row>
)

export default Success;