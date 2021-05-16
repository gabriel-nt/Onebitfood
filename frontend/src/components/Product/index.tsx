import Image from 'next/image';
import { Col, Row, Card } from 'react-bootstrap';
import { ProductProps } from '../../dtos';

import { formatCurrency } from '../../utils/formatCurrency';
import { formatString } from '../../utils/formatString';

const Product = ({ id, name, description, image_url,price }: ProductProps) => {
  return (
    <Col md={4} sm={12} key={id}>
      <Card className="mb-4 clickable-effect">
        <Row className="my-3 mx-1">
          <Col md={6} xs={{ span: 12, order: 2 }}>
            <p className='fw-bold mb-0'>{name}</p>
            <p><small>{formatString(description, 80)}</small></p>
            <small className='border px-3 border-custom-gray fw-bold'>
              {formatCurrency(price)}
            </small>
          </Col>

          <Col md={6} xs={{ span: 12, order: 1 }} >
            <Image
              src={image_url}
              alt={name}
              width={300}
              height={200}
              layout="responsive"
            />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default Product;