import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaStar } from 'react-icons/fa';
import { Col, Card, Row, Spinner, Alert } from 'react-bootstrap';

import Product from '../../components/Product';
import { getRestaurant } from '../../services/getRestaurant';
import { formatCurrency } from '../../utils/formatCurrency';

const DetailsRestaurant = () => {
  const router = useRouter();
  const { id } = router.query;
  const { restaurant, isError, isLoading } = getRestaurant(id);

  if (isError)
    return <Alert variant='custom-red'>Erro ao carregar</Alert>

  if (isLoading)
    return <Spinner animation='border' />

  return (
    <>
      <h3 className='fw-bold'>{restaurant.name}</h3>
      <Card className="mt-2 mb-4">
        <Row className="my-3 mx-1">
          <Col md={3} >
            <Image
              src={restaurant.image_url}
              alt={restaurant.name}
              width={300}
              height={200}
              layout="responsive"
            />
          </Col>
          <Col md={9}>
            <p><small>{restaurant.description}</small></p>
            <Row className='row-cols-auto'>
              <Col className="pr-0">
                <small className='border px-3 border-custom-gray fw-bold'>
                  entrega {formatCurrency(restaurant.delivery_tax)}
                </small>
              </Col>
              <Col >
                <small className='fw-bold'>{restaurant.category_title}</small>
              </Col>
              <Col >
                <span className='text-custom-orange'>
                  <FaStar /> 5
                </span>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {restaurant.product_categories.map((product_category, i) => (
        <>
          <h5 className='fw-bold'>{product_category.title}</h5>
          <Row>
            {product_category.products.map((product, i) =>
              <Product {...product}/>
            )}
          </Row>
        </>
      ))}
    </>
  )
}

export default DetailsRestaurant;