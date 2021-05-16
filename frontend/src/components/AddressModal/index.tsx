import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal, Row, Col, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { getAvailableCities } from '../../services/getAvailableCities';
import addressState from '../../store/atoms/addressAtom';

interface ModalProps {
  show: boolean;
  onHide: () => void;
  onShow: () => void;
}

const AddressModal = ({ show, onHide, onShow }: ModalProps) => {
  const router = useRouter();
  const [cityChanged, setCityChanged] = useState(false);

  const [address, setAddress] = useRecoilState(addressState);
  const { cities, isLoading, isError } = getAvailableCities();

  useEffect(() => {
    if (router.asPath != '/' && address.city == '') {
      onShow();
    }
  }, [router]);

  const updateAddress = (e) => {
    if (e.target.name == 'city')
      setCityChanged(true);

    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const confirmAddress = (e) => {
    e.preventDefault();
    onHide();

    if (cityChanged)
      router.push('/restaurants');
  }

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <h5 className='fw-bold mt-2'>Endereço de entrega</h5>
      </Modal.Header>
      <Modal.Body>
        { isLoading && <Spinner animation='border' /> }
        { isError && <Alert variant='custom-red'>Erro ao carregar</Alert> }

        {
          cities && (
            <Row>
              <Col md={12}>
                <Form onSubmit={e => confirmAddress(e)}>
                  <Form.Group>
                    <Form.Label>Sua cidade</Form.Label>
                    <Form.Control
                      required as="select"
                      onChange={updateAddress}
                      value={address.city}
                      name="city"
                    >
                      {address.city == '' && <option key={0}>Escolher cidade</option>}
                      {cities.map((state, i) => {
                        return <option key={i} value={state}>{state}</option>
                      })}
                    </Form.Control>
                  </Form.Group>
                  {address.city != '' &&
                    <div>
                      <Form.Group className='mt-3'>
                        <Form.Label>Bairro</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Bairro"
                          onChange={updateAddress}
                          value={address.neighborhood}
                          name="neighborhood"
                        />
                      </Form.Group>
                      <Form.Group className='mt-3'>
                        <Form.Label>Logradouro</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Rua/Avenida/Alameda"
                          onChange={updateAddress}
                          value={address.street}
                          name="street"
                        />
                      </Form.Group>
                      <Form.Group className='mt-3'>
                        <Form.Label>Número</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Nûmero"
                          onChange={updateAddress}
                          value={address.number}
                          name="number"
                        />
                      </Form.Group>
                      <Form.Group className='mt-3'>
                        <Form.Label>Complemento</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Complemento"
                          onChange={updateAddress}
                          value={address.complement}
                          name="complement"
                        />
                      </Form.Group>
                      <div className="text-center pt-4">
                        <Button variant="custom-red" className='text-white' type="submit">
                          Confirmar endereço
                    </Button>
                      </div>
                    </div>
                  }
                </Form>
              </Col>
            </Row>
          )
        }
      </Modal.Body>
    </Modal>
  )
}

export default AddressModal;