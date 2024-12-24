import React, { useCallback } from 'react';
import { Text, View, StyleSheet, Modal, Pressable } from 'react-native';
import { useCalendarContext } from '../CalendarContext';
import Wheel from './TimePicker/Wheel';
import { CALENDAR_HEIGHT, CalendarViews } from '../enums';
import { getParsedDate, getDate, getFormated } from '../utils';

function createNumberList(num: number) {
  return new Array(num)
    .fill(0)
    .map((_, index) =>
      index < 10 ? `0${index.toString()}` : index.toString()
    );
}

const hours = createNumberList(24);
const minutes = createNumberList(60);

const TimeSelector = () => {
  const { date, onSelectDate, theme , showModalTime,setShowModalTime, confirmText } = useCalendarContext();
  const { hour, minute } = getParsedDate(date);

  const handleChangeHour = useCallback(
    (value: number) => {
      const newDate = getDate(date).hour(value);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const handleChangeMinute = useCallback(
    (value: number) => {
      const newDate = getDate(date).minute(value);
      onSelectDate(getFormated(newDate));
    },
    [date, onSelectDate]
  );

  const onChangeView = useCallback(() => { 
    setShowModalTime(false);
  },[]);

  return (
    <Modal testID="time-selector" transparent
    visible={!!showModalTime}
    onRequestClose={onChangeView}
    >
      <View
      style={styles.container}
      >
      <View style={styles.timePickerContainer}>
        <View style={styles.timePicker}>
          <View style={styles.wheelContainer}>
          <Wheel value={hour} items={hours} setValue={handleChangeHour} />
          </View>
          <Text
          style={{
            marginHorizontal: 5,
            ...styles.timePickerText,
            ...theme?.timePickerTextStyle,
          }}
        >
          :
          </Text>
          <View style={styles.wheelContainer}>
          <Wheel value={minute} items={minutes} setValue={handleChangeMinute} />
          </View>

        </View>
        <Pressable onPress={onChangeView}>
          <Text
            style={{
              color: theme?.selectedItemColor,
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            {confirmText}
          </Text>
        </Pressable>
    
      </View>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  wheelContainer: {
    flex: 1,
  },
  timePickerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 40,
    backgroundColor:"white",
    borderRadius: 10,
    padding: 20,
  },
  timePickerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  timePicker:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default TimeSelector;
