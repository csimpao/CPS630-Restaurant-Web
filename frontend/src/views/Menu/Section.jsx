import { Fragment } from 'react';

function Section({ title, items, onChange, order }) {
  return (
    <section>
      <h3>{title}</h3>
      <ul>
        {items.map((item) => {
          return (
            <Fragment key={item.id}>
              <li>
                <label>
                  <span>{`${item.name} - $${item.price.toFixed(2)}`}</span>
                </label>
                <input
                  type="number"
                  min={0}
                  step={1}
                  id={`qty-${item.id}`}
                  onChange={(e) => onChange(item, e.target.value)}
                  value={(order[item.id] ?? { quantity: 0 }).quantity}
                />
              </li>
            </Fragment>
          );
        })}
      </ul>
    </section>
  );
}

export default Section;
