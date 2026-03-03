import { Fragment } from 'react';

function Section({ title, items, onChange, order }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => {
          const qty = (order[item.id] ?? { quantity: 0 }).quantity;
          return (
            <Fragment key={item.id}>
              <li className="menu-item">
                <span className="item-info">{`${item.name} - $${item.price.toFixed(2)}`}</span>
                <div className="qty-controls">
                  <button
                    className="qty-btn"
                    onClick={() => onChange(item, Math.max(0, qty - 1))}
                  >
                    &minus;
                  </button>
                  <span className="qty-value">{qty}</span>
                  <button
                    className="qty-btn"
                    onClick={() => onChange(item, qty + 1)}
                  >
                    +
                  </button>
                </div>
              </li>
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}

export default Section;
