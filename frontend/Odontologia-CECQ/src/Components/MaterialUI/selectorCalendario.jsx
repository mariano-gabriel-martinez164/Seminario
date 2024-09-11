import { format, addDays, differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { es } from 'date-fns/locale';
import './calendario.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TextField } from '@mui/material';
import { useRef } from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export function SelectorCalendario({ range, setRange, isWeek, defaultRange }) { 
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [dateIsDefault, setDateIsDefault] = useState(true);

  const refOne = useRef(null);
  const refButton = useRef(null);
  
  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    document.addEventListener('keydown', hideOnEscape, true);
    return () => {
      document.removeEventListener('click', hideOnClickOutside, true);
      document.removeEventListener('keydown', hideOnEscape, true);
    }
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === 'Escape') setOpen(false);
  }

  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) setOpen(false);
  }

  const handleChange = (item) => {
    if (isWeek) {
      const newStartDate = addDays(
        item.selection.startDate,
        1 - item.selection.startDate.getDay()
      );
      const newEndDate = addDays(
        item.selection.endDate,
        7 - item.selection.endDate.getDay()
      );
      setRange([
        {
          startDate: newStartDate,
          endDate: newEndDate,
          key: "selection",
        }
      ]);
    }
    else setRange([item.selection]);
    setDateIsDefault(false);
    if (item.selection.startDate > item.selection.endDate) setError(true);
    else if (addDays(item.selection.startDate, 30) < item.selection.endDate)
      setError(true);
    else setError(false);
  };

  const getHelperText = () => {
    if (differenceInDays(range[0].endDate, range[0].startDate) > 30 && !isWeek) return 'Máximo 31 días';
    if (error) return 'Rango no válido';
    return '';
  }
  
  const renderClearButton = () => {
    if (range == defaultRange) return null;
    return (
      <IconButton
        onClick={() => {
          setRange(defaultRange);
          setOpen(false);
          setError(false);
          setDateIsDefault(true);
        }}
        ref={refButton}
      >
        <ClearIcon />
      </IconButton>
    );
  };

  const toggleOpen = (e) => {
    if (refButton.current && refButton.current.contains(e.target))
      setOpen(false);
    else setOpen(!open);
  }

  return (
    <>
      <TextField
        sx={{ width: "100%" }}
        variant="standard"
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: dateIsDefault ? null : renderClearButton(),
          },
        }}
        label={isWeek ? "Seleccionar semana" : "Seleccionar rango de fechas"}
        value={`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(range[0].endDate,"dd/MM/yyyy")}`}
        onClick={toggleOpen}
        helperText={getHelperText()}
        error={error}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            className="calendarElement"
            direction="vertical"
            months={1}
            ranges={range}
            onChange={handleChange}
            moveRangeOnFirstSelection={false}
            locale={es}
            disabledDay={(day) => day.getDay() === 0 || day.getDay() === 6}
            focusedRange={isWeek ? [0, 0] : undefined}
          />
        )}
      </div>
    </>
  );
}

function Test (){
  /**
   * Ejemplo de uso de SelectorCalendario, tanto en formato de semana como de rango de fechas
   * Requiere de un useState para manejar el rango de fechas, y debe estar inicializado con un objeto de la forma:
   * { startDate, endDate, key: 'selection' }
   */

  const defaultRange = [
    {
      startDate: addDays(new Date(), 1 - new Date().getDay()),
      endDate: addDays(new Date(), 7 - new Date().getDay()),
      key: "selection",
    },
  ];
  const [range, setRange] = useState(defaultRange);

  return (
    <div>
      <SelectorCalendario
        range={range}
        setRange={setRange}
        defaultRange={defaultRange}
      />
      <SelectorCalendario
        range={range}
        setRange={setRange}
        isWeek
        defaultRange={defaultRange}
      />
      <br />
      <p>{`Inicio: ${format(range[0].startDate, 'dd/MM/yyyy')}`}</p>
      <p>{`Fin: ${format(range[0].endDate, 'dd/MM/yyyy')}`}</p>
    </div>
  );
}

export default Test;