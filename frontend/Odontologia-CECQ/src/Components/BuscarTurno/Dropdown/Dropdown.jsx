import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="btn btn-outline-secondary ms-2 w-100"
    href=""
    ref={ref} // <a> se comporta como un dropdown.toggle que es pasado como ref
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children} &#x25bc;
  </a> // children contiene al texto que muestra dropdown.toggle
));

export const CustomMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Buscar..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export const CustomCalendarMenu = React.forwardRef(
    ({ className, 'aria-labelledby': labeledBy }, ref) => {
      const today = new Date();
      const maxRangeEndDate = new Date();
      maxRangeEndDate.setMonth(today.getMonth() + 2);
  
      const [state, setState] = useState([
        {
          startDate: today,
          endDate: maxRangeEndDate,
          key: 'selection',
        },
      ]);
      const handleSelect = (ranges) => {
        const { startDate, endDate } = ranges.selection;
        const maxAllowedEndDate = new Date(startDate);
        
        maxAllowedEndDate.setMonth(startDate.getMonth() + 2);
        
        if (endDate > maxAllowedEndDate) {
          setState([{ ...ranges.selection, endDate: maxAllowedEndDate }]);
        } else {
          setState([ranges.selection]);
        }
      };
  
      return (
        <div
          ref={ref}
          className={className}
          aria-labelledby={labeledBy}
        >
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        </div>
      );
    }
  );
  
export const CustomOnlyMenu = React.forwardRef(
  ({ children, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={{ width: '90%', marginLeft: '3%' }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) => !value || child.props.children.startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);