import { format, addDays, differenceInDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import { es } from 'date-fns/locale'
import './calendario.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { TextField } from '@mui/material';
import { useRef } from 'react';
import {IconButton} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';


export function CustomDateRangePicker({range, setRange}) {
  const defaultRange = [{
    startDate: new Date(),
    endDate: addDays(new Date(), 7),
    key: 'selection'
  }]


  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [dateIsDefault, setDateIsDefault] = useState(true);

  const refOne = useRef(null);
  const refButton = useRef(null);
  
  useEffect(() => {
    document.addEventListener('click', hideOnClickOutside, true);
    document.addEventListener('keydown', hideOnEscape, true);
    setRange(defaultRange);
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
    setRange([item.selection]);
    setDateIsDefault(false);
    if (item.selection.startDate > item.selection.endDate) setError(true);
    else if (addDays(item.selection.startDate,30) < item.selection.endDate) setError(true);
    else setError(false);
  }

  const getHelperText = () => {
    if (differenceInDays(range[0].endDate, range[0].startDate) > 30) return 'Máximo 31 días';
    if (error) return 'Rango no válido';
    return '';
  }
  
  const renderClearButton = () => {
    if (range == defaultRange) return null;
    return (
      <IconButton onClick={() => {
        setRange(defaultRange);
        setOpen(false);
        setError(false);
        setDateIsDefault(true);
      }}
      ref={refButton}
      >
        <ClearIcon/>
      </IconButton>
    );
  }

  const toggleOpen = (e) => {
    if (refButton.current && refButton.current.contains(e.target)) setOpen(false);
    else setOpen(!open);
  }

  return (
    <>
      <TextField 
        sx={{width: '100%'}}
        variant='standard'
        slotProps={
          { input: { readOnly: true ,
            endAdornment: (dateIsDefault ? null : renderClearButton()),

          } }} 
        label="Seleccionar rango de fechas"
        value={`${format(range[0].startDate, 'dd/MM/yyyy')} - ${format(range[0].endDate, 'dd/MM/yyyy')}`}
        onClick={toggleOpen}
        helperText={getHelperText()}
        error={error}
      />

      <div ref={refOne}>
        {open &&         
          <DateRange 
          className="calendarElement"
          direction='vertical'
          months={1}
          ranges={range}
          onChange={handleChange}
          moveRangeOnFirstSelection={false}
          locale={es}
          disabledDay={(day) => day.getDay() === 0 || day.getDay() === 6}
          
          />}
      </div>
    </>
  );

}