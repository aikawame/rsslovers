import Image from 'next/image'
import styles from '../styles/Logo.module.scss'

export default function Logo() {
  return (
    <>
      <Image src={"/images/icon.svg"} width="28" height="28" alt="RSS愛好会アイコン" aria-hidden="true"/>
      <span className={styles.space}>&nbsp;</span>
      <Image src={"/images/logo.svg"} width="140" height="28" alt="RSS愛好会" />
    </>
  )
}
