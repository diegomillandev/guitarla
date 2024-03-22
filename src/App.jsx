import { useEffect, useState } from 'react';
import { Footer, Guitar, Header } from './components';
import { db } from './db/db';

export const App = () => {
    const [guitars, setGuitars] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        setGuitars(db);
    }, []);

    const addToCart = (id) => {
        const find = cart.find((item) => item.id === id);
        if (find) {
            const newCart = cart.map((item) => {
                if (item.id === id) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
            setCart(newCart);
        } else {
            const guitar = guitars.find((guitar) => guitar.id === id);
            setCart([...cart, { ...guitar, quantity: 1 }]);
        }
    };
    return (
        <>
            <Header />

            <main className="container-xl mt-5">
                <h2 className="text-center">Nuestra Colección</h2>

                <div className="row mt-5">
                    {guitars?.map((guitar) => (
                        <Guitar
                            key={guitar.id}
                            {...guitar}
                            addToCart={addToCart}
                        />
                    ))}
                </div>
            </main>

            <Footer />
        </>
    );
};
