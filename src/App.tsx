import { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowDown01, ArrowDown10, Shuffle, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Tarjeta } from './utils/utils';
import { sortAsc, sortDesc } from './utils/utils';

const tarjetas = [
  { id: 1, numero: 1 },
  { id: 2, numero: 2 },
  { id: 3, numero: 3 },
  { id: 4, numero: 4 },
  { id: 5, numero: 5 },
  { id: 6, numero: 6 },
  { id: 7, numero: 7 },
  { id: 8, numero: 8 },
  { id: 9, numero: 9 },
  { id: 10, numero: 10 },
];

function App() {
  const [cards, setCards] = useState<Tarjeta[]>(tarjetas);
  const [newCard, setNewCard] = useState<string>('');

  useEffect(() => {
    console.log(cards);
  }, [cards]);

  const addCard = () => {
    const cardNumber = parseInt(newCard, 10);
    if (!isNaN(cardNumber)) {

      let newCardId = 1;
      if (cards.length > 0) {
        const maxId = Math.max(...cards.map(t => t.id));
        newCardId = maxId + 1;
      }
      
      const newCard:Tarjeta = {
        id: newCardId,
        numero: cardNumber,
      }

      setCards((cards) => [...cards, newCard]);
      setNewCard('');
    }
  };

  const handleSortAsc = () => {
    const sorted = sortAsc(cards);
    setCards(sorted);
  };

  const handleSortDesc = () => {
    const sorted = sortDesc(cards);
    setCards(sorted);
  };

  const handleShuffle = () => {
    // Algoritmo Fisher-Yates para mezclar el array
    const shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setCards(shuffled);
  };

  const removeCard = (id: number) => {
    setCards((cards) => Array.from(cards).filter((card) => card.id !== id));
  };

  return (
    <div className='w-full h-dvh flex flex-col lg:flex-row p-0 m-0 overflow-hidden bg-background'>
      <Card className='border-0 border-b bg-background lg:border-r border-border lg:py-24 lg:px-8 rounded-none w-full lg:w-1/4 flex flex-col justify-center lg:justify-start shadow-none'>
        <CardContent>
          <div className='flex flex-col gap-2'>
            <Input
              type='text'
              value={newCard}
              onChange={(e) =>
                /^\d*$/.test(e.target.value) && setNewCard(e.target.value)
              }
              maxLength={4}
              placeholder='1'
              className='flex w-full bg-primary-foreground h-16 lg:h-32 text-center md:text-5xl font-bold border-border hover:border-primary transition-all placeholder:text-muted'
            />
            <Button className='text-lg p-8 cursor-pointer bg-gradient-to-bl from-primary to-primary/80 shadow-sm' onClick={addCard}>
              Agregar
            </Button>
          </div>
        </CardContent>

        <CardFooter>
          <div className='flex flex-col w-full gap-2'>
            {/* Boton de ordenar ascendente */}
            <Button
              variant='outline'
              className='w-full font-normal text-base p-4 cursor-pointer overflow-hidden border-border bg-primary-foreground hover:bg-border'
              onClick={handleSortAsc}
            >
              <ArrowDown01 />
              Ordenar ascendente
            </Button>
            {/* Boton de ordenar descendente */}
            <Button
              variant='outline'
              className='w-full font-normal text-base p-4 cursor-pointer overflow-hidden border-border bg-primary-foreground hover:bg-border'
              onClick={handleSortDesc}
            >
              <ArrowDown10 />
              Ordenar descendente
            </Button>
            {/* Boton de mezclar */}
            <Button
              variant='outline'
              className='w-full font-normal text-base p-4 cursor-pointer overflow-hidden border-border bg-primary-foreground hover:bg-border'
              onClick={handleShuffle}
            >
              <Shuffle />
              Mezclar tarjetas
            </Button>
          </div>
        </CardFooter>
      </Card>

      <div className='flex flex-col w-full p-4 lg:p-24 h-full border-0 rounded-none'>
        <div className='grid grid-cols-4 gap-4 w-full h-full text-card-foreground'>
          <AnimatePresence>
            {cards.map((card) => (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ rotate: 180, scale: 0 }}
                layout
                key={card.id}
                className='relative flex justify-center items-center border-border rounded-xl shadow text-3xl text-primary font-bold bg-primary-foreground select-none group max-h-96'
              >
                {card.numero}
                <button
                  onClick={() => removeCard(card.id)}
                  className='absolute w-full h-full bg-primary/50 backdrop-blur-sm text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex justify-center items-center cursor-pointer'
                >
                  <Trash2 size={24} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default App;
