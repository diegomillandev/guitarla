export const CartItem = ({
    image,
    name,
    price,
    quantity,
    id,
    removeItemCart,
    addDelQuantity,
}) => {
    return (
        <tr>
            <td>
                <img
                    className="img-fluid"
                    src={`/img/${image}.jpg`}
                    alt="imagen guitarra"
                />
            </td>
            <td>{name}</td>
            <td className="fw-bold">${price}</td>
            <td className="flex align-items-start gap-4">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => addDelQuantity(id, 'sub')}
                >
                    -
                </button>
                {quantity}
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => addDelQuantity(id, 'add')}
                >
                    +
                </button>
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    type="button"
                    onClick={() => removeItemCart(id)}
                >
                    X
                </button>
            </td>
        </tr>
    );
};
