import { Footer, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routing />
      </main>
      <Footer />
      <ToastContainer theme="light" />
    </div>
  )
}

export default App
