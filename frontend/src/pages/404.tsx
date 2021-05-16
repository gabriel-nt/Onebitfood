import Link from 'next/link';
import { Button } from 'react-bootstrap';
import styles from '../styles/404.module.scss';

const Custom404 = () => (
  <div className={styles.notfound}>
    <div>
      <h1>Oops!</h1>
      <h2>404 - Página não encontrada</h2>
    </div>
    <Link href="/">
      <Button variant="custom-red" className={styles.button}>
        Voltar
      </Button>
    </Link>
  </div>
)

export default Custom404;