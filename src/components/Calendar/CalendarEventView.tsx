import React from 'react';
import { IonList, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react'
import './CalendarEventView.css'
import { CalendarEvent } from '../../constants/types';
import { sameDay, getLongDate } from '../../utils/DateTimeTools';
import CalendarEventItem from './CalendarEventItem';
import { RootState } from '../../data/reducers';
import { connect, ConnectedProps } from 'react-redux';
import EmptySectionText from '../EmptySectionText';
import { Container } from 'react-grid-system';
import { groupByDate } from '../../utils/EventFilterTootls';

interface OwnProps {
  hide: boolean
}

const mapStateToProps = (state: RootState) => ({
  groupedEvents: groupByDate(state.calEvents.events),
  loadingUser: state.userDetails.loading
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>;
type CalendarEventViewProps = OwnProps & PropsFromRedux;

const CalendarEventView: React.FC<CalendarEventViewProps> = ({hide, groupedEvents, loadingUser}) => {
  if (!loadingUser && groupedEvents === []) {
    return (
      <EmptySectionText mainText="No Events Found" subText="Find some events and societies in the Discover tab!" />
    )
  }

  const currDate = new Date(Date.now())
  
  return (
    <Container className="calendarContainer" hidden={hide}>
      <IonList>
        {groupedEvents.map((eventGroup) => (
          <IonItemGroup key={`date-${eventGroup.date.getDate()}-${eventGroup.date.getMonth() + 1}`}>
          <IonItemDivider sticky color="imperial">
            <IonLabel>
              {(sameDay(eventGroup.date, currDate) ? "Today - " : "") + getLongDate(eventGroup.date)}
            </IonLabel>
          </IonItemDivider>
          {eventGroup.events.map((eventOnDay) => (
            <CalendarEventItem key={eventOnDay.id} event={eventOnDay} />
          ))}
        </IonItemGroup>
        ))}
      </IonList>
    </Container>
  )
}


export default connector(CalendarEventView);