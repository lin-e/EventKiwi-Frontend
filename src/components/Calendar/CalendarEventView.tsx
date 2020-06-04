import React from 'react';
import { IonList, IonItemGroup, IonItemDivider, IonLabel } from '@ionic/react'
import './CalendarEventView.css'
import { CalendarEvent } from '../../constants/types';
import { sameDay, getLongDate } from '../../utils/DateTimeTools';
import CalendarEventItem from './CalendarEventItem';
import { RootState } from '../../data/reducers';
import { connect } from 'react-redux';
import EmptySectionText from '../EmptySectionText';
import { Container } from 'react-grid-system';

interface EventGroupByDate {
  date: Date,
  events: CalendarEvent[]
}
  
function groupByDate(events: CalendarEvent[]) {
  if (events.length == 0) {
    return [];
  }

  let currDate = events[0].datetimeStart
  const groupedItems: EventGroupByDate[] = [{
    date: currDate,
    events: []
  }];

  events.forEach((event) => {
    if (sameDay(currDate, event.datetimeStart)) {
      groupedItems[groupedItems.length - 1].events.push(event);
    } else {
      currDate = event.datetimeStart
      groupedItems.push({
        date: currDate,
        events: [event]
      })
    }
  })

  return groupedItems;
}

type Props = LinkStateProps

const CalendarEventView: React.FC<Props> = ({groupedEvents, loadingUser}) => {
  if (!loadingUser && groupedEvents === []) {
    return (
      <EmptySectionText mainText="No Events Found" subText="Find some events and societies in the Discover tab!" />
    )
  }

  const currDate = new Date(Date.now())
  
  return (
    <Container className="calendarContainer">
      <IonList>
        {groupedEvents.map((eventGroup) => (
          <IonItemGroup key={`date-${eventGroup.date.getDate()}-${eventGroup.date.getMonth() + 1}`}>
          <IonItemDivider sticky color="imperial">
            <IonLabel>
              {(sameDay(eventGroup.date, currDate) ? "Today - " : "") + getLongDate(eventGroup.date)}
            </IonLabel>
          </IonItemDivider>
          {eventGroup.events.map((eventOnDay) => (
            <CalendarEventItem event={eventOnDay} />
          ))}
        </IonItemGroup>
        ))}
      </IonList>
    </Container>
  )
}

interface LinkStateProps {
  groupedEvents: EventGroupByDate[],
  loadingUser: boolean
}


const mapStateToProps = (state: RootState): LinkStateProps => {
  return {
    groupedEvents: groupByDate(state.calEvents.events),
    loadingUser: state.userDetails.loading
  }
}

export default connect(mapStateToProps)(CalendarEventView);