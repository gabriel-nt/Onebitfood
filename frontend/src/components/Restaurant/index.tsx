import Link from 'next/link'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa';
import { Row, Col, Card } from 'react-bootstrap';

import { formatString } from '../../utils/formatString';
import { formatCurrency } from '../../utils/formatCurrency';
import { RestaurantProps } from '../../dtos';

const Restaurant = ({ id, name, description, category_title, delivery_tax, image_url }: RestaurantProps) => (
  <Col lg={6} sm={6} xs={12} className="mb-4">
    <Link href={`restaurants/${id}`}>
      <Card body className='clickable-effect'>
        <Row>
          <Col md={5} xs={12}>
            <Image
              src={image_url}
              alt={name}
              width={300}
              height={200}
              layout="responsive"
            />
          </Col>
          <Col md={5} xs={10}>
            <h5>{formatString(name, 25)}</h5>
            <p className='mb-1'>
              <small> {formatString(description, 60)} </small>
            </p>
            <p>
              <small className='fw-bold'>{category_title}</small>
            </p>
            <small className='border px-3 border-custom-gray fw-bold'>
              Entrega {formatCurrency(delivery_tax)}
            </small>
          </Col>
          <Col md={2} xs={2} className="text-center">
            <span className='text-custom-orange'>
              <FaStar />
            </span>
          </Col>
        </Row>
      </Card>
    </Link>
  </Col>
)

export default Restaurant;