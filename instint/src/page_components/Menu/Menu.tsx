'use client'
import Link from "next/link";
import styles from '../../../styles/menu.module.scss'
import { useWrapper } from "@/context/WrapperProvider";
export default function Menu(){
    const {colorMode} = useWrapper()
    interface LinkMenuProps{
        label: 'Create Dopamine'| 'View Dopamine' | 'Calendar' | 'Today';
        href: '/create' | '/dopamine' | '/calendar' | '/today';
    }
    const linkArray: LinkMenuProps[] = [
        {label: 'Create Dopamine', href: '/create'},
        {label: 'View Dopamine', href: '/dopamine'},
        {label: 'Calendar', href: '/calendar'},
        {label: 'Today', href: '/today'}
    ]
    return(
        <section className={styles.section}>
            <div className={colorMode ? styles.containerDark : styles.containerLight}>
                <div className={styles.headerContainer}>
                    <h2 className={colorMode ? styles.textDark : styles.textLight}>Dopamine Goals</h2>
                </div>
                <div className={styles.linksContainer}>
                    {linkArray.map((value: any) => (
                        <div className={styles.linkContainer}>
                            <Link className={colorMode ? styles.textDark : styles.textLight} href={value.href} prefetch={false}>
                                {value.label}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}