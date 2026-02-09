
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { FiActivity, FiAnchor, FiAward, FiRefreshCcw, FiTarget, FiUsers, FiZap } from 'react-icons/fi';
import styles from './styles.module.css';

const TALENTS = [
  { id: 1, name: 'Achiever', icon: FiAward, color: '#FF6B6B' },
  { id: 2, name: 'Empathy', icon: FiUsers, color: '#4ECDC4' },
  { id: 3, name: 'Focus', icon: FiTarget, color: '#FFE66D' },
  { id: 4, name: 'Strategic', icon: FiZap, color: '#1A535C' },
  { id: 5, name: 'Belief', icon: FiAnchor, color: '#FF9F1C' },
  { id: 6, name: 'Activator', icon: FiActivity, color: '#EF476F' },
];

export default function TalentGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  // Initialize Game
  useEffect(() => {
    shuffleCards();
  }, []);

  const shuffleCards = () => {
    const shuffled = [...TALENTS, ...TALENTS]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ ...card, uId: index }));
    setCards(shuffled);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setWon(false);
  };

  const handleClick = (id) => {
    if (flipped.length === 0) {
      setFlipped([id]);
      return;
    }

    if (flipped.length === 1) {
      if (flipped.includes(id)) return; // prevent clicking same card

      setFlipped([...flipped, id]);
      setMoves(moves + 1);

      const firstCard = cards.find(c => c.uId === flipped[0]);
      const secondCard = cards.find(c => c.uId === id);

      if (firstCard.id === secondCard.id) {
        setSolved([...solved, firstCard.id]);
        setFlipped([]);
        if (solved.length + 1 === TALENTS.length) {
            setWon(true);
        }
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 1000);
      }
    }
  };

  return (
    <div className={styles.gameContainer}>
        <div className={styles.header}>
            <h3>Match Your Talents</h3>
            <div className={styles.stats}>
                <span>Moves: {moves}</span>
                <button onClick={shuffleCards} className={styles.resetBtn} title="Reset Game">
                    <FiRefreshCcw />
                </button>
            </div>
        </div>

        {won && <div className={styles.wonMessage}>🎉 Talent Master! You found all pairs!</div>}

        <div className={styles.grid}>
            {cards.map((card) => {
                const isFlipped = flipped.includes(card.uId) || solved.includes(card.id);
                const Icon = card.icon;
                return (
                    <div
                        key={card.uId}
                        className={clsx(styles.card, isFlipped && styles.flipped, solved.includes(card.id) && styles.solved)}
                        onClick={() => !isFlipped && handleClick(card.uId)}
                    >
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>?</div>
                            <div className={styles.cardBack} style={{ borderColor: card.color }}>
                                <Icon size={24} color={card.color} />
                                <span style={{ color: card.color }}>{card.name}</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
  );
}
