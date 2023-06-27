import Image from "next/image"
import loaderIcon from "../../../public/assets/images/loader.svg"
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loaderDiv}>
      <Image src={loaderIcon} alt="loader" width={71} height={71} className={styles.loader}/>
    </div>
  )
}

export default Loader