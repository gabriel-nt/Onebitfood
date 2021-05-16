import { Row, Card, Col, Spinner, Alert } from 'react-bootstrap';
import Category from '../../components/Category';

import Restaurant from '../../components/Restaurant';
import { getCategories } from '../../services/getCategories';
import { getRestaurants } from '../../services/getRestaurants';

const Restaurants = () => {
  const { restaurants, isLoading, isError } = getRestaurants();
  const { categories, isLoadingCategories, isErrorCategories } = getCategories();

  function renderRestaurants() {
    if (isError)
      return <Col><Alert variant='custom-red'>Erro ao carregar</Alert></Col>

    if (isLoading)
      return <Col><Spinner animation='border' /></Col>

    if (restaurants.length === 0)
      return <Col>Nenhum restaurante disponível ainda...</Col>

    return restaurants.map((restaurant, index) => (
      <Restaurant {...restaurant} key={index} />
    ))
  }

  function renderCategories() {
    if (isErrorCategories)
      return <Col><Alert variant='custom-red'>Erro ao carregar</Alert></Col>

    if (isLoadingCategories)
      return <Col><Spinner animation='border' /></Col>

    if (categories.length === 0)
      return <Col>Nenhuma categoria disponível ainda...</Col>

    return <Category data={categories}/>
  }

  return (
    <>
      <div className="mt-5">
        <h3 className='fw-bold'>Categorias</h3>
        <Card className="mt-2">
          {renderCategories()}
        </Card>
      </div>

      <div className="mt-5">
        <h3 className="fw-bold">Restaurantes</h3>
        <Row>
          {renderRestaurants()}
        </Row>
      </div>
    </>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { restaurants, isError, isLoading } = getRestaurants();

//   return {
//     props: {
//       restaurants,
//       isError,
//       isLoading
//     }
//   }
// }

export default Restaurants;