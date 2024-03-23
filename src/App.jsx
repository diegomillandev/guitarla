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
            guitar.quantity = 1;
            setCart([...cart, { ...guitar, quantity: 1 }]);
        }
    };

    const removeItemCart = (id) => {
        const FilterCart = cart.filter((item) => item.id !== id);
        setCart(FilterCart);
    };

    const unoccupyCart = () => {
        if (cart.length == 0) return;
        if (confirm('Are you sure about emptying the cart?')) {
            setCart([]);
        }
    };

    const addDelQuantity = (_id, _option) => {
        const newCart = cart
            .map((item) => {
                if (item.id === _id) {
                    if (_option === 'add') {
                        item.quantity += 1;
                    } else if (_option === 'sub') {
                        if (item.quantity > 0) {
                            item.quantity -= 1;
                        }
                    }
                }
                return item;
            })
            .filter((item) => item.quantity !== 0);
        setCart(newCart);
    };

    return (
        <>
            <Header
                cart={cart}
                removeItemCart={removeItemCart}
                unoccupyCart={unoccupyCart}
                addDelQuantity={addDelQuantity}
            />

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
