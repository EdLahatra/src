import PropTypes from 'prop-types';
import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {Text} from 'react-native';
// import '../date.css';
import '../InputDatePicker/date.css';
import {TitleLabel} from '../InputField/TitleLabel';
import styles from '../style';
interface Props {
  value?: any;
  required?: boolean;
  label?: string;
  error?: any;
  name?: any;
  showError?: boolean;
  onChange?: any;
  isEditable?: boolean;
  type?: any;
  todayDate?: any;
}
export const InputDatePicker = ({
  value,
  required,
  label,
  error,
  name,
  showError,
  onChange,
  isEditable,
  type,
  todayDate,
}: Props) => {
  const [startDate, setStartDate] = useState(value);
  const handleChange = (name: string, date: any) => {
    onChange(name, date, true);
  };
  const yesterday = new Date();
  const futurDate = new Date();
  futurDate.setFullYear(futurDate.getFullYear() + 1);
  yesterday.setDate(yesterday.getDate() - 1);
  if (type && type === 'time') {
    return (
      <div
        className={
          required && showError && error !== '' ? 'inputError' : 'datetimeCss '
        }>
        <div className={isEditable ? '' : 'noEditable'}>
          <TitleLabel label={label} required={required} />
          <DatePicker
            dateFormat="HH:mm"
            selected={startDate}
            readOnly={!isEditable}
            onChange={(date: any) => {
              setStartDate(date);
              handleChange(name, date);
            }}
            showTimeSelect
            showTimeSelectOnly
            timeFormat="HH:mm"
            timeIntervals={5}
          />
        </div>

        {required && showError && error !== '' && (
          <Text style={styles.textError}>{error}</Text>
        )}
      </div>
    );
  } else {
    return (
      <div
        className={
          required && showError && error !== '' ? 'inputError' : 'datetimeCss '
        }>
        <div className={isEditable ? '' : 'noEditable'}>
          <TitleLabel label={label} required={required} />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            maxDate={todayDate ? futurDate : yesterday}
            selected={startDate}
            readOnly={!isEditable}
            onChange={(date: any) => {
              setStartDate(date);
              handleChange(name, date);
            }}
          />
        </div>
        {required && showError && error !== '' && (
          <Text style={styles.textError}>{error}</Text>
        )}
      </div>
    );
  }
};

InputDatePicker.propTypes = {
  value: PropTypes.any,
  required: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  showError: PropTypes.bool,
  isEditable: PropTypes.bool,
  type: PropTypes.string,
  todayDate: PropTypes.bool,
};
InputDatePicker.defaultProps = {
  value: new Date(),
  required: false,
  label: '',
  name: '',
  error: '',
  showError: false,
  isEditable: true,
  type: 'date',
  todayDate: false,
};
