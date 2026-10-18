import { Footer, Header, LinearProgress } from '@/common/components'
import { useGlobalLoading } from '@/common/hooks/useGlobalLoading'
import { Routing } from '@/common/routing'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.css'

const App = () => {
  const isGlobalLoading = useGlobalLoading()

  return (
    <div className={styles.app}>
      <Header />
      <div className={styles.progressSlot}>
        {isGlobalLoading && <LinearProgress />}
      </div>
      <main className={styles.main}>
        <Routing />
      </main>
      <Footer />
      <ToastContainer theme="light" />
    </div>
  )
}

export default App
