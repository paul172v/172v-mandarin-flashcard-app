import { useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SingleWordFlashCards.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { HSK1 } from "../dev/mandarin-hsk1-list";

interface IReducer {
  english: string | null;
  hanzi: string | null;
  pinyin: string | null;
  triggered: boolean;
  showEnglish: boolean;
  showHanzi: boolean;
  showPinyin: boolean;
  currentCardNumber: number;
}

interface IAction {
  type:
    | "setMandarinObj"
    | "toggleEnglish"
    | "toggleHanzi"
    | "togglePinyin"
    | "nextCard"
    | "prevCard"
    | "randomCard"
    | "firstCard";
  payload?: Partial<IReducer>;
}

const initState: IReducer = {
  english: null,
  hanzi: null,
  pinyin: null,
  triggered: false,
  showEnglish: true,
  showHanzi: true,
  showPinyin: true,
  currentCardNumber: 0,
};

function reducer(state: IReducer, action: IAction): IReducer {
  switch (action.type) {
    case "setMandarinObj":
      return { ...state, ...action.payload, triggered: true };
    case "toggleEnglish":
      return { ...state, showEnglish: !state.showEnglish };
    case "toggleHanzi":
      return { ...state, showHanzi: !state.showHanzi };
    case "togglePinyin":
      return { ...state, showPinyin: !state.showPinyin };
    case "nextCard": {
      const nextCardNumber = (state.currentCardNumber + 1) % HSK1.length;
      return {
        ...state,
        ...HSK1[nextCardNumber],
        currentCardNumber: nextCardNumber,
        triggered: true,
      };
    }
    case "prevCard": {
      const prevCardNumber =
        (state.currentCardNumber - 1 + HSK1.length) % HSK1.length;
      return {
        ...state,
        ...HSK1[prevCardNumber],
        currentCardNumber: prevCardNumber,
        triggered: true,
      };
    }
    case "randomCard": {
      const randomIndex = Math.floor(Math.random() * HSK1.length);
      return {
        ...state,
        ...HSK1[randomIndex],
        currentCardNumber: randomIndex,
        triggered: true,
      };
    }
    case "firstCard": {
      return {
        ...state,
        ...HSK1[0],
        currentCardNumber: 0,
        triggered: true,
      };
    }
    default:
      return state;
  }
}

function SingleWordFlashCards() {
  const [state, dispatch] = useReducer(reducer, initState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.triggered) {
      dispatch({ type: "randomCard" });
    }
  }, [state.triggered]);

  const toggleEnglish = () => dispatch({ type: "toggleEnglish" });
  const toggleHanzi = () => dispatch({ type: "toggleHanzi" });
  const togglePinyin = () => dispatch({ type: "togglePinyin" });

  const setNextCard = () => dispatch({ type: "nextCard" });
  const setPrevCard = () => dispatch({ type: "prevCard" });
  const setRandomCard = () => dispatch({ type: "randomCard" });
  const setFirstCard = () => dispatch({ type: "firstCard" });
  const goToHome = () => navigate("/");

  const { english, hanzi, pinyin, showEnglish, showHanzi, showPinyin } = state;

  return (
    <div className="container-sm mt-4 p-4 bg-dark text-light">
      <h1 className="display-4">172v Mandarin Flashcard App</h1>
      <div className="bd-example">
        <button className="m-4 btn btn-primary btn-lg" onClick={setPrevCard}>
          Previous Card
        </button>
        <button className="m-4 btn btn-primary btn-lg" onClick={setNextCard}>
          Next Card
        </button>
        <button className="m-4 btn btn-primary btn-lg" onClick={setFirstCard}>
          First Card
        </button>
        <button className="m-4 btn btn-primary btn-lg" onClick={setRandomCard}>
          Random Card
        </button>
        <button className="m-4 btn btn-danger btn-lg" onClick={toggleEnglish}>
          Toggle English
        </button>
        <button className="m-4 btn btn-danger btn-lg" onClick={toggleHanzi}>
          Toggle Hanzi
        </button>
        <button className="m-4 btn btn-danger btn-lg" onClick={togglePinyin}>
          Toggle Pinyin
        </button>
        <button className="m-4 btn btn-secondary btn-lg" onClick={goToHome}>
          Back to Home
        </button>
      </div>
      <div className="container-sm bg-dark mt-4">
        {showEnglish && english && (
          <p className="display-1" aria-label="english-output">
            <span className={classes.bold}>English:</span> {english}
          </p>
        )}
        {showHanzi && hanzi && (
          <p className="display-1" aria-label="hanzi-output">
            <span className={classes.bold}>Hanzi:</span> {hanzi}
          </p>
        )}
        {showPinyin && pinyin && (
          <p className="display-1" aria-label="pinyin-output">
            <span className={classes.bold}>Pinyin:</span> {pinyin}
          </p>
        )}
      </div>
    </div>
  );
}

export default SingleWordFlashCards;
