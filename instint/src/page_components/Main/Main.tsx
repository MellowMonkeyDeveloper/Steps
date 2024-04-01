"use client";

import axios from "axios";
import DashboardCard, {
  DashboardCardProps,
} from "@/components/cards/DashboardCard";
import {
  CalendarMonth,
  NoteAdd,
  Add,
  SportsScore,
  Today,
} from "@mui/icons-material";
import styles from "../../../styles/main.module.scss";
import { useWrapper } from "@/context/WrapperProvider";
interface DopamineApiObjectProps {
  title: string;
  description: string;
  date: string;
  completed: boolean;
  motivation: string;
  strides: any;
}
export default function Main() {
  const { colorMode } = useWrapper();
  const dashboardCard: DashboardCardProps[] = [
    {
      title: "Dopamine Goals",
      icon: (
        <SportsScore
          className={colorMode ? styles.iconDark : styles.iconLight}
        />
      ),
      href: "/dopamine",
      link: "View",
    },
    {
      title: "Calendar",
      icon: (
        <CalendarMonth
          className={colorMode ? styles.iconDark : styles.iconLight}
        />
      ),
      href: "/calendar",
      link: "View",
    },
    {
      title: "Create",
      icon: (
        <NoteAdd className={colorMode ? styles.iconDark : styles.iconLight} />
      ),
      href: "/create",
      link: "Create",
    },
    {
      title: "Today's Steps",
      icon: (
        <Today className={colorMode ? styles.iconDark : styles.iconLight} />
      ),
      href: "/today",
      link: "View",
    },
  ];

  return (
    <div className={colorMode ? styles.containerDark : styles.containerLight}>
      <div className={styles.topContainer}>
        <div className={styles.headerContainer}>
          <h1 className={colorMode ? styles.textDark : styles.textLight}>
            DopamineGoals
          </h1>
        </div>
        <div className={styles.headerContainer}>
          <h3 className={colorMode ? styles.textDark : styles.textLight}>
            The new standard for productivity
          </h3>
        </div>
      </div>
      <article className={styles.howitworksContainer}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.textDark : styles.textLight}>
            How it works?
          </h2>
        </div>
        <div className={styles.pContainer}>
          <p
            className={
              colorMode
                ? `${styles.textDark} ${styles.p}`
                : `${styles.textLight} ${styles.p}`
            }
          >
            DopamineGoals works by allowing you to set major goals for yourself
            which we call Dopamine. Why do we call them Dopamine? Well, because
            of the positive chemical release you'll get after checking completed
            on your goal! In order to complete your Dopamine goal you'll first
            have to create a Stride. A Stride is considered a project or
            something else you are working on that has to be done in order for
            the major dopamine release to take place. After Stride we break it
            down one last time into Steps. Steps are smaller tasks that help you
            track your progress toward completing your Stride.
          </p>
        </div>
        <div className={styles.tldrContainer}>
          <h4 className={colorMode ? styles.textDark : styles.textLight}>
            TLDR
          </h4>
        </div>
        <div>
          <ul>
            <li
              className={
                colorMode
                  ? `${styles.textDark} ${styles.li}`
                  : `${styles.textLight} ${styles.li}`
              }
            >
              DopamineGoals are major goals
            </li>
            <li
              className={
                colorMode
                  ? `${styles.textDark} ${styles.li}`
                  : `${styles.textLight} ${styles.li}`
              }
            >
              Strides are major projects or tasks that must be completed to
              complete the DopamineGoal
            </li>
            <li
              className={
                colorMode
                  ? `${styles.textDark} ${styles.li}`
                  : `${styles.textLight} ${styles.li}`
              }
            >
              Steps are minor projects or tasks that must be completed in order
              to complete a Stride
            </li>
          </ul>
        </div>
      </article>
      <article className={styles.howitworksContainer}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.textDark : styles.textLight}>
            Pricing?
          </h2>
        </div>
        <div className={styles.pContainer}>
          <p
            className={
              colorMode
                ? `${styles.textDark} ${styles.p}`
                : `${styles.textLight} ${styles.p}`
            }
          >
            DopamineGoals is a FREE app and you are encouraged to use this and
            share with your friends.
          </p>
        </div>
      </article>
      <article className={styles.howitworksContainer}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.textDark : styles.textLight}>Is this a finished product?</h2>
        </div>
        <div className={styles.pContainer}>
          <p className={colorMode ? `${styles.textDark} ${styles.p}` : `${styles.textLight} ${styles.p}`}>
            As I'm sure you'll notice this isn't a feature rich app. This is the
            first version of the app and I'll be working on this in my free
            time. In the future I envision integrating this with the Cardano
            blockchain and allowing users to mint a NFT for every DopamineGoal
            they achieve, but it's not required, just a fun way to remember
            you're winning at life.
          </p>
        </div>
      </article>
      <article className={styles.howitworksContainer}>
        <div className={styles.headerContainer}>
          <h2 className={colorMode ? styles.textDark : styles.textLight}>How can I help?</h2>
        </div>
        <div className={styles.pContainer}>
          <p className={colorMode ? `${styles.textDark} ${styles.p}`: `${styles.textLight} ${styles.p}`}>
            If you'd like to donate send me whatever anything Cardano you'd like
            to the address below.
          </p>
        </div>
        <div>
          <span>ADDRESS</span>
        </div>
      </article>
      <article className={styles.howitworksContainer}>
        {dashboardCard.map((item: any) => (
          <DashboardCard
            title={item.title}
            icon={item.icon}
            href={item.href}
            link={item.link}
          />
        ))}
      </article>
    </div>
  );
}
