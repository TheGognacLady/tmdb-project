import { Footer, Header } from '@/common/components'
import { Routing } from '@/common/routing'
import styles from './App.module.css'

const App = () => {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <Routing />
      </main>
      <Footer />
    </div>
  )
}

export default App
